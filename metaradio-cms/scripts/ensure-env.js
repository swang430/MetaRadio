'use strict';
/**
 * 若 metaradio-cms/.env 不存在，则用随机密钥生成一份（仅本地开发用；.env 已被 gitignore）。
 * 幂等：已存在则跳过。供根目录 `npm run dev:all` / `npm run seed:cms` 调用，
 * 让首次克隆也能一键起 Strapi。
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.resolve(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  console.log('[ensure-env] .env 已存在，跳过生成');
  process.exit(0);
}

const k = () => crypto.randomBytes(16).toString('base64');
const env =
  [
    'HOST=0.0.0.0',
    'PORT=1337',
    `APP_KEYS=${[k(), k(), k(), k()].join(',')}`,
    `API_TOKEN_SALT=${k()}`,
    `ADMIN_JWT_SECRET=${k()}`,
    `TRANSFER_TOKEN_SALT=${k()}`,
    `JWT_SECRET=${k()}`,
    `ENCRYPTION_KEY=${k()}`,
    'DATABASE_CLIENT=sqlite',
    'DATABASE_FILENAME=.tmp/data.db',
  ].join('\n') + '\n';

fs.writeFileSync(envPath, env);
console.log('[ensure-env] 已生成 metaradio-cms/.env（随机密钥，sqlite）');
