#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const spawnOptions = { stdio: 'inherit', cwd: path.resolve(__dirname, '..'), shell: true };

const copyProcess = spawn('node', ['scripts/copy-static.js', '--watch'], spawnOptions);

const strapiProcess = spawn('strapi', ['develop'], spawnOptions);

const exit = (code) => {
  if (!copyProcess.killed) copyProcess.kill('SIGTERM');
  process.exit(code ?? 0);
};

strapiProcess.on('exit', (code) => {
  exit(code);
});

process.on('SIGINT', () => {
  strapiProcess.kill('SIGINT');
  exit(0);
});

process.on('SIGTERM', () => {
  strapiProcess.kill('SIGTERM');
  exit(0);
});
