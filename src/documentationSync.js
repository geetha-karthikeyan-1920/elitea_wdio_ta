import { access, constants, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function collectMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function syncDocumentation({ sourceDir, targetDir }) {
  let sourceStats;

  try {
    sourceStats = await stat(sourceDir);
  } catch {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }

  if (!sourceStats.isDirectory()) {
    throw new Error(`Source directory is not a directory: ${sourceDir}`);
  }

  await mkdir(targetDir, { recursive: true });

  const markdownFiles = await collectMarkdownFiles(sourceDir);

  let copiedFiles = 0;
  let skippedFiles = 0;
  let updatedFiles = 0;

  for (const sourceFile of markdownFiles) {
    const relativePath = path.relative(sourceDir, sourceFile);
    const targetFile = path.join(targetDir, relativePath);

    await mkdir(path.dirname(targetFile), { recursive: true });
    const content = await readFile(sourceFile, 'utf8');

    try {
      await access(targetFile, constants.F_OK);
      const existingContent = await readFile(targetFile, 'utf8');

      if (existingContent === content) {
        skippedFiles += 1;
      } else {
        await writeFile(targetFile, content);
        updatedFiles += 1;
      }
    } catch {
      await writeFile(targetFile, content);
      copiedFiles += 1;
    }
  }

  const manifestPath = path.join(targetDir, 'sync-manifest.json');
  const manifest = {
    sourceDir,
    targetDir,
    copiedFiles,
    skippedFiles,
    updatedFiles,
    generatedAt: new Date().toISOString(),
  };

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  return { copiedFiles, skippedFiles, updatedFiles, manifestPath };
}
