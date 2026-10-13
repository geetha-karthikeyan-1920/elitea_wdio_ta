param(
    [string]$JiraLink = '',
    [string]$AttachmentPath = '',
    [string]$StartFromStage = '',
    [switch]$Resume
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$stateFile = Join-Path $PSScriptRoot 'pipeline-state.json'
$runFile = Join-Path $PSScriptRoot 'pipeline-run.json'
$summaryFile = Join-Path $PSScriptRoot 'pipeline-summary.md'
$demoFile = Join-Path $PSScriptRoot 'pipeline-demo.html'

$pipeline = @(
    'Requirement Analysis Agent',
    'Architecture Agent',
    'Design Review Agent',
    'Implementation Planning Agent',
    'Implementation Agent',
    'Code Review Agent',
    'Verification Agent',
    'PR Agent'
)

Write-Host 'Agentic SDLC orchestration scaffold started.'
Write-Host "Repository root: $repoRoot"
Write-Host "JiraLink: $JiraLink"
Write-Host "AttachmentPath: $AttachmentPath"
Write-Host "Resume: $Resume"
Write-Host "StartFromStage: $StartFromStage"

function Write-PipelineFile {
    param(
        [string]$Path,
        [object[]]$Lines
    )

    $flat = foreach ($line in $Lines) {
        if ($null -eq $line) {
            ''
        } else {
            [string]$line
        }
    }

    $text = ($flat -join "`r`n") + "`r`n"
    $utf8 = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($Path, $text, $utf8)
}

$state = [ordered]@{
    jiraLink = $JiraLink
    attachmentPath = $AttachmentPath
    resumed = [bool]$Resume
    startFromStage = $StartFromStage
    completedStages = @()
    nextStage = if ($StartFromStage) { $StartFromStage } else { $pipeline[0] }
    history = @()
}
Write-PipelineFile -Path $stateFile -Lines @(($state | ConvertTo-Json -Depth 10))

$run = [ordered]@{
    jiraLink = $JiraLink
    startedAt = (Get-Date).ToString('o')
    stages = @()
}
Write-PipelineFile -Path $runFile -Lines @(($run | ConvertTo-Json -Depth 10))

$stageLines = @()
foreach ($stage in $pipeline) {
    $stageLines += "- $stage"
}
$stageItems = @()
foreach ($stage in $pipeline) {
    $stageItems += "    <li>$stage</li>"
}

Write-PipelineFile -Path $summaryFile -Lines @(
    '# Agentic SDLC Pipeline Summary',
    '',
    "- Jira Link: $JiraLink",
    "- Attachment: $AttachmentPath",
    "- Start Stage: $StartFromStage",
    "- Resume: $Resume",
    '',
    '## Stage Sequence',
    $stageLines,
    ''
)

Write-PipelineFile -Path $demoFile -Lines @(
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8" />',
    '  <title>Pipeline Demo</title>',
    '</head>',
    '<body>',
    '  <h1>Agentic SDLC Pipeline Summary</h1>',
    "  <p>Jira Link: $JiraLink</p>",
    '  <ul>',
    $stageItems,
    '  </ul>',
    '</body>',
    '</html>'
)

Write-Host 'Pipeline files created successfully.'
Write-Host "State file: $stateFile"
Write-Host "Run file: $runFile"
Write-Host "Summary file: $summaryFile"
Write-Host "Demo file: $demoFile"

# --- Automated PR creation (safe, only when configured) ---
function New-AutoPR {
    param(
        [string]$JiraId,
        [string]$BranchPrefix = 'agentic'
    )

    if (-not $env:GITHUB_TOKEN -or -not $env:GITHUB_OWNER -or -not $env:GITHUB_REPO) {
        Write-Host 'GitHub environment not fully configured; skipping auto-PR.'
        return
    }

    try {
        $isGit = (& git rev-parse --is-inside-work-tree 2>$null) -eq 'true'
    } catch {
        $isGit = $false
    }

    if (-not $isGit) {
        Write-Host 'Not a git repository; skipping auto-PR.'
        return
    }

    $timestamp = (Get-Date).ToString('yyyyMMddHHmmss')
    $branch = "$BranchPrefix/$JiraId-$timestamp"

    Write-Host "Creating branch $branch and committing artifacts for $JiraId"
    try {
        & git checkout -b $branch
        & git add -A "outputs/$JiraId" "orchestration" 2>$null
        if ($LASTEXITCODE -ne 0) {
            & git add -A "outputs/$JiraId" 2>$null
        }
        & git commit -m "Agentic SDLC: add orchestration artifacts for $JiraId" 2>$null
    } catch {
        Write-Host "Git commit skipped or failed: $($_.Exception.Message)"
    }

    try {
        & git push -u origin $branch
    } catch {
        Write-Host "Git push failed: $($_.Exception.Message)"
        return
    }

    $token = $env:GITHUB_TOKEN
    $headers = @{ Authorization = "Bearer $token"; Accept = 'application/vnd.github+json' }

    # prefer env vars, but fall back to parsing the git remote origin
    $owner = $env:GITHUB_OWNER
    $repo = $env:GITHUB_REPO
    # if owner looks like an email, ignore it and parse remote
    if ($owner -and $owner -match '@') {
        Write-Host "GITHUB_OWNER appears to be an email; ignoring env value and attempting to parse git remote."
        $owner = $null; $repo = $null
    }
    if (-not $owner -or -not $repo) {
        try {
            $remoteUrl = (& git config --get remote.origin.url) 2>$null
            if ($remoteUrl -match '[:/]([^/]+)/([^/]+?)(?:\.git)?$') {
                $owner = $matches[1]
                $repo = $matches[2]
                Write-Host "Detected GitHub repo from remote: $owner/$repo"
            }
        } catch {
            Write-Host "Unable to detect git remote: $($_.Exception.Message)"
        }
    }

    if (-not $owner -or -not $repo) {
        Write-Host "No GitHub owner/repo available; cannot create PR."
        return
    }

    $title = "Agentic SDLC: changes for $JiraId"
    $body = "Automated artifacts and pipeline output for $JiraId generated by the Agentic SDLC orchestration. Please review and merge."

    # read repo info to get default branch
    try {
        $repoInfo = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo" -Headers $headers -Method Get
        $base = $repoInfo.default_branch
    } catch {
        Write-Host ('Failed to read repo info with owner=' + $owner + ' repo=' + $repo + ': ' + $_.Exception.Message)
        $base = 'main'
    }

    $payload = @{ title = $title; head = $branch; base = $base; body = $body } | ConvertTo-Json
    try {
        $pr = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/pulls" -Headers $headers -Method Post -Body $payload -ContentType 'application/json'
        Write-Host "Pull request created: $($pr.html_url)"
    } catch {
        Write-Host ('Failed to create PR (owner=' + $owner + ' repo=' + $repo + '): ' + $_.Exception.Message)
        Write-Host 'If the push succeeded, you can open the PR manually via the repo URL shown in git push output.'
    }
}

# Parse Jira ID and attempt PR creation
if ($JiraLink) {
    if ($JiraLink -match '/browse/([^/?#]+)') { $jid = $matches[1] } else { $jid = $JiraLink }
    New-AutoPR -JiraId $jid
} else {
    Write-Host 'No Jira link provided; skipping auto-PR.'
}
