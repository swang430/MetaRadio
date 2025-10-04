#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const chokidar = require('chokidar');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');
const WATCH_INTERVAL = 1500;

async function copyContentTypes() {
  const apisDir = path.join(srcDir, 'api');
  let copied = false;
  if (!(await fs.pathExists(apisDir))) return copied;
  const apiNames = await fs.readdir(apisDir);
  for (const apiName of apiNames) {
    const contentTypesDir = path.join(apisDir, apiName, 'content-types');
    if (!(await fs.pathExists(contentTypesDir))) continue;
    const targetDir = path.join(distDir, 'src', 'api', apiName, 'content-types');
    await fs.copy(contentTypesDir, targetDir, { overwrite: true });
    copied = true;
  }
  return copied;
}

async function copyComponents() {
  const componentsDir = path.join(srcDir, 'components');
  if (!(await fs.pathExists(componentsDir))) return false;
  const targetDir = path.join(distDir, 'src', 'components');
  await fs.copy(componentsDir, targetDir, { overwrite: true });
  return true;
}

async function syncOnce() {
  await fs.ensureDir(path.join(distDir, 'src'));
  const [copiedContentTypes, copiedComponents] = await Promise.all([
    copyContentTypes(),
    copyComponents(),
  ]);
  return copiedContentTypes || copiedComponents;
}

async function main() {
  const watch = process.argv.includes('--watch');
  const initial = await syncOnce();
  if (initial) {
    console.log('[copy-static] Synced content-types and components to dist');
  }
  if (!watch) {
    return;
  }

  let scheduled = false;
  const scheduleSync = () => {
    if (scheduled) return;
    scheduled = true;
    setTimeout(async () => {
      scheduled = false;
      try {
        const didSync = await syncOnce();
        if (didSync) {
          console.log('[copy-static] Synced content-types and components to dist');
        }
      } catch (error) {
        console.error('[copy-static] Failed during sync:', error);
      }
    }, WATCH_INTERVAL);
  };

  chokidar
    .watch([
      path.join(srcDir, 'api'),
      path.join(srcDir, 'components'),
      path.join(distDir, 'src'),
    ], { ignoreInitial: true })
    .on('add', scheduleSync)
    .on('addDir', scheduleSync)
    .on('unlink', scheduleSync)
    .on('unlinkDir', scheduleSync)
    .on('change', scheduleSync);
}

main();
