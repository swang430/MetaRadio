'use strict';
/**
 * 确保 better-sqlite3 原生模块与当前 Node 的 ABI 匹配；不匹配则自动 `npm rebuild`。
 *
 * 背景：better-sqlite3 是带 C++ 扩展的库，必须针对运行时的 Node 版本编译。当
 * "安装依赖时的 Node 版本" ≠ "运行时的 Node 版本"（如切换了 nvm/conda 环境）时，
 * 会报 `NODE_MODULE_VERSION ... was compiled against a different Node.js version`。
 * 这里在启动 Strapi 前预检：能 require 就放行；ABI 不匹配则自动重建一次。
 *
 * 供根目录 `dev:cms` / `seed:cms` 在 `strapi develop|seed` 之前调用。
 */
const path = require('path');
const { execSync } = require('child_process');

try {
  require('better-sqlite3');
} catch (err) {
  const msg = err && err.message ? String(err.message) : String(err);
  const abiMismatch =
    /NODE_MODULE_VERSION|different Node\.js version|was compiled against|invalid ELF header|better_sqlite3\.node/i.test(
      msg,
    );
  if (!abiMismatch) throw err;

  console.log('[ensure-native] better-sqlite3 与当前 Node ABI 不匹配，正在重建…');
  execSync('npm rebuild better-sqlite3', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
  delete require.cache[require.resolve('better-sqlite3')];
  require('better-sqlite3'); // 重建后复验，失败则抛出
  console.log('[ensure-native] better-sqlite3 重建完成 ✓');
}
