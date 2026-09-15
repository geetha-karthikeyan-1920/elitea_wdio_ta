import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { readFile as readPackageJson } from 'node:fs/promises';
import { syncDocumentation } from '../src/documentationSync.js';

test('syncDocumentation copies markdown files and writes a manifest', async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'docs-sync-'));
  const sourceDir = path.join(tempRoot, 'source');
  const targetDir = path.join(tempRoot, 'target');

  try {
    await mkdir(path.join(sourceDir, 'guides'), { recursive: true });
    await writeFile(path.join(sourceDir, 'README.md'), '# Project\n\nHello world.\n');
    await writeFile(path.join(sourceDir, 'guides', 'setup.md'), '# Setup\n\nInstall dependencies.\n');

    const result = await syncDocumentation({ sourceDir, targetDir });

    assert.equal(result.copiedFiles, 2);
    assert.equal(result.skippedFiles, 0);
    assert.equal(result.updatedFiles, 0);

    const copiedReadme = await readFile(path.join(targetDir, 'README.md'), 'utf8');
    const copiedGuide = await readFile(path.join(targetDir, 'guides', 'setup.md'), 'utf8');

    assert.equal(copiedReadme, '# Project\n\nHello world.\n');
    assert.equal(copiedGuide, '# Setup\n\nInstall dependencies.\n');
    assert.equal(result.manifestPath, path.join(targetDir, 'sync-manifest.json'));

    const manifest = JSON.parse(await readFile(path.join(targetDir, 'sync-manifest.json'), 'utf8'));
    assert.equal(manifest.copiedFiles, 2);
    assert.equal(manifest.updatedFiles, 0);
    assert.equal(manifest.skippedFiles, 0);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test('syncDocumentation updates nested markdown files while preserving relative paths', async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'docs-sync-update-'));
  const sourceDir = path.join(tempRoot, 'source');
  const targetDir = path.join(tempRoot, 'target');

  try {
    await mkdir(path.join(sourceDir, 'docs', 'api'), { recursive: true });
    await mkdir(path.join(targetDir, 'docs', 'api'), { recursive: true });

    await writeFile(path.join(sourceDir, 'README.md'), '# Project\n\nLatest docs.\n');
    await writeFile(path.join(sourceDir, 'docs', 'api', 'overview.md'), '# API\n\nOverview version 2.\n');

    await writeFile(path.join(targetDir, 'README.md'), '# Project\n\nOld docs.\n');
    await writeFile(path.join(targetDir, 'docs', 'api', 'overview.md'), '# API\n\nOverview version 1.\n');

    const result = await syncDocumentation({ sourceDir, targetDir });

    assert.equal(result.copiedFiles, 0);
    assert.equal(result.skippedFiles, 0);
    assert.equal(result.updatedFiles, 2);

    const syncedReadme = await readFile(path.join(targetDir, 'README.md'), 'utf8');
    const syncedOverview = await readFile(path.join(targetDir, 'docs', 'api', 'overview.md'), 'utf8');

    assert.equal(syncedReadme, '# Project\n\nLatest docs.\n');
    assert.equal(syncedOverview, '# API\n\nOverview version 2.\n');

    const manifest = JSON.parse(await readFile(path.join(targetDir, 'sync-manifest.json'), 'utf8'));
    assert.equal(manifest.updatedFiles, 2);
    assert.equal(manifest.copiedFiles, 0);
    assert.equal(manifest.skippedFiles, 0);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test('syncDocumentation throws a clear error when the source directory is missing', async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'docs-sync-missing-'));
  const sourceDir = path.join(tempRoot, 'missing-source');
  const targetDir = path.join(tempRoot, 'target');

  try {
    await assert.rejects(
      () => syncDocumentation({ sourceDir, targetDir }),
      /Source directory does not exist/
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test('package scripts expose the documented SDLC workflow commands', async () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonText = await readPackageJson(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonText);

  assert.equal(packageJson.scripts['agentic:jira'], 'node ./scripts/run-agentic-sdlc.js jira-mcp');
  assert.equal(packageJson.scripts['agentic:sdlc'], 'node ./scripts/run-agentic-sdlc.js');
  assert.equal(packageJson.scripts['bootstrap:story'], 'node ./scripts/bootstrap-story.js');
});
