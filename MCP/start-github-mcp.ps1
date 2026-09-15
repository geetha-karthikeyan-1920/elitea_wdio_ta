param()

$ErrorActionPreference = 'Stop'

$githubToken = $env:GITHUB_TOKEN
$githubOwner = $env:GITHUB_OWNER
$githubRepo = $env:GITHUB_REPO

if ([string]::IsNullOrWhiteSpace($githubToken) -or [string]::IsNullOrWhiteSpace($githubOwner) -or [string]::IsNullOrWhiteSpace($githubRepo)) {
    Write-Warning 'GitHub MCP is running in placeholder mode because GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO are not all configured.'
    Write-Host 'Set those environment variables before enabling the real GitHub MCP bridge.'
} else {
    Write-Host 'GitHub MCP server placeholder started with environment variables configured.'
}

Write-Host 'This environment expects a real GitHub MCP bridge to be configured for production execution.'

while ($true) {
    Start-Sleep -Seconds 30
}
