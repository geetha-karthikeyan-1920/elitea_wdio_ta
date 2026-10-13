import fs from 'node:fs';

const raw = fs.readFileSync(0, 'utf8');

let command = '';
try {
  const input = JSON.parse(raw || '{}');
  command = String(input.command ?? '');
} catch {
  process.stdout.write(JSON.stringify({ permission: 'allow' }));
  process.exit(0);
}

const revealsSecret = /\$env:(JIRA_API_TOKEN|GITHUB_TOKEN)|process\.env\.(JIRA_API_TOKEN|GITHUB_TOKEN)|Authorization:\s*Basic/i;

if (revealsSecret.test(command)) {
  process.stdout.write(JSON.stringify({
    permission: 'deny',
    user_message: 'Blocked a command that may print a Jira or GitHub credential.',
    agent_message: 'The secret-guard hook denied this command because it references a credential variable.',
  }));
  process.exit(0);
}

process.stdout.write(JSON.stringify({ permission: 'allow' }));
