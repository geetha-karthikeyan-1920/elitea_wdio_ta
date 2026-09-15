param()

$ErrorActionPreference = 'Stop'

$jiraUrl = $env:JIRA_URL
$jiraEmail = $env:JIRA_EMAIL
$jiraApiToken = $env:JIRA_API_TOKEN
$jiraProject = $env:JIRA_PROJECT

if ([string]::IsNullOrWhiteSpace($jiraUrl) -or [string]::IsNullOrWhiteSpace($jiraEmail) -or [string]::IsNullOrWhiteSpace($jiraApiToken) -or [string]::IsNullOrWhiteSpace($jiraProject)) {
    Write-Warning 'Jira MCP is running in placeholder mode because JIRA_URL, JIRA_EMAIL, JIRA_API_TOKEN, and JIRA_PROJECT are not all configured.'
    Write-Host 'Set those environment variables before enabling the real Jira MCP bridge.'
} else {
    Write-Host 'Jira MCP server placeholder started with environment variables configured.'
}

Write-Host 'This environment expects a real Jira MCP bridge to be configured for production execution.'

while ($true) {
    Start-Sleep -Seconds 30
}
