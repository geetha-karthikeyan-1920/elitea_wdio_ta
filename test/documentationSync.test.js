import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
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
