# MetaRadio 部署文档

本文档适用于将 MetaRadio 部署到阿里云 ECS，使用 Nginx 代理域名，PM2 守护服务，MySQL 作为 Strapi CMS 数据库。

服务器部署路径统一为：

```bash
/home/qianjing-www/website_metaradio
```

建议目录结构：

```text
/home/qianjing-www/website_metaradio/
  web/
  cms/
```

数据读取链路：

```text
metaradio-web 前端
  -> 通过 STRAPI_URL 请求 metaradio-cms API
    -> metaradio-cms 读取 MySQL
      -> 返回 JSON 给前端页面渲染
```

前端不直接连接 MySQL。前端只需要在启动时配置：

```bash
STRAPI_URL=http://127.0.0.1:1337
```

CMS 通过 `.env` 中的数据库配置连接 MySQL：

```env
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=metaradio_cms
DATABASE_USERNAME=metaradio
DATABASE_PASSWORD=你的数据库密码
```

## 1. 服务器准备

登录服务器：

```bash
ssh 用户名@服务器IP
```

安装基础软件：

```bash
sudo apt update
sudo apt install nginx curl unzip mysql-client -y
```

安装 Node.js 20：

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install nodejs -y
```

安装 PM2：

```bash
sudo npm install -g pm2
```

创建部署目录：

```bash
mkdir -p /home/qianjing-www/website_metaradio/web
mkdir -p /home/qianjing-www/website_metaradio/cms
```

## 2. MySQL 创建数据库

登录 MySQL：

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

执行：

```sql
CREATE DATABASE metaradio_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'metaradio'@'%' IDENTIFIED BY '你的数据库密码';

GRANT ALL PRIVILEGES ON metaradio_cms.* TO 'metaradio'@'%';

FLUSH PRIVILEGES;
```

测试连接：

```bash
mysql -h 127.0.0.1 -P 3306 -u metaradio -p metaradio_cms
```

如果使用阿里云 RDS，`DATABASE_HOST` 使用 RDS 内网地址，并确认 RDS 白名单允许 ECS 内网 IP。

## 3. 本地构建前端

确认 `next.config.mjs` 中包含：

```js
output: 'standalone',
```

在项目根目录执行：

```bash
npm install
npm run build
```

打包前端：

```bash
rm -rf deploy-web metaradio-web.tar.gz
mkdir -p deploy-web

cp -a .next/standalone/. deploy-web/
mkdir -p deploy-web/.next
cp -a .next/static deploy-web/.next/static
cp -a public deploy-web/public

tar -czf metaradio-web.tar.gz -C deploy-web .
```

上传到服务器：

```bash
scp metaradio-web.tar.gz 用户名@服务器IP:/home/qianjing-www/website_metaradio/web/
```

## 4. 服务器部署前端

服务器执行：

```bash
cd /home/qianjing-www/website_metaradio/web
tar -xzf metaradio-web.tar.gz
```

启动前端：

```bash
STRAPI_URL=http://127.0.0.1:1337 PORT=3000 pm2 start server.js --name metaradio-web
pm2 save
```

测试前端：

```bash
curl -I http://127.0.0.1:3000
```

## 5. 本地构建 CMS

本地执行：

```bash
cd metaradio-cms
npm install
npm install mysql2
npm run build
cd ..
```

打包 CMS：

```bash
tar -czf metaradio-cms.tar.gz \
  metaradio-cms/config \
  metaradio-cms/dist \
  metaradio-cms/src \
  metaradio-cms/public \
  metaradio-cms/package.json \
  metaradio-cms/package-lock.json \
  metaradio-cms/scripts \
  metaradio-cms/seed-data
```

上传到服务器：

```bash
scp metaradio-cms.tar.gz 用户名@服务器IP:/home/qianjing-www/website_metaradio/cms/
```

## 6. 服务器部署 CMS

服务器执行：

```bash
cd /home/qianjing-www/website_metaradio/cms
tar -xzf metaradio-cms.tar.gz --strip-components=1
npm install --omit=dev
```

复制生产环境 JS 文件：

```bash
cp -a dist/config/*.js config/
cp -a dist/src/. src/
```

创建 `.env`：

```bash
vim .env
```

写入：

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

APP_KEYS=随机字符串1,随机字符串2,随机字符串3,随机字符串4
API_TOKEN_SALT=随机字符串5
ADMIN_JWT_SECRET=随机字符串6
TRANSFER_TOKEN_SALT=随机字符串7
JWT_SECRET=随机字符串8
ENCRYPTION_KEY=随机字符串9

DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=metaradio_cms
DATABASE_USERNAME=metaradio
DATABASE_PASSWORD=你的数据库密码
DATABASE_SSL=false
```

生成随机字符串：

```bash
openssl rand -base64 32
```

启动 CMS：

```bash
NODE_ENV=production pm2 start npm --name metaradio-cms -- run start
pm2 save
```

测试 CMS 后台：

```bash
curl -I http://127.0.0.1:1337/admin
```

## 7. 初始化 CMS

浏览器打开后台：

```text
http://服务器IP:1337/admin
```

第一次进入时创建管理员账号。

服务器执行初始化：

```bash
cd /home/qianjing-www/website_metaradio/cms
npm run seed
npm run import:pages
npm run import:datasheets
```

测试 CMS API：

```bash
curl -i "http://127.0.0.1:1337/api/pages?locale=zh-CN"
curl -i "http://127.0.0.1:1337/api/datasheets?locale=zh-CN"
curl -i "http://127.0.0.1:1337/api/resources?locale=zh-CN"
```

如果返回 `403 Forbidden`，进入后台打开 Public 只读权限：

```text
Settings
-> Users & Permissions plugin
-> Roles
-> Public
```

勾选：

```text
Page: find、findOne
Datasheet: find、findOne
Resource: find、findOne
```

保存后重新测试接口，直到返回：

```text
HTTP/1.1 200 OK
```

如果后台没有 `Public` 角色，使用脚本创建并授权：

```bash
cd /home/qianjing-www/website_metaradio/cms
mkdir -p scripts
vim scripts/create-public-role.js
```

写入：

```js
'use strict';

require('dotenv').config();

async function run() {
  const { compileStrapi, createStrapi } = require('@strapi/strapi');
  const app = await createStrapi(await compileStrapi()).load();

  let role = await app.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!role) {
    role = await app.db.query('plugin::users-permissions.role').create({
      data: {
        name: 'Public',
        description: 'Default role given to unauthenticated users.',
        type: 'public',
      },
    });

    console.log('created public role:', role.id);
  } else {
    console.log('public role exists:', role.id);
  }

  const actions = [
    'api::page.page.find',
    'api::page.page.findOne',
    'api::datasheet.datasheet.find',
    'api::datasheet.datasheet.findOne',
    'api::resource.resource.find',
    'api::resource.resource.findOne',
  ];

  for (const action of actions) {
    const exists = await app.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: role.id } });

    if (!exists) {
      await app.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: role.id,
        },
      });

      console.log('granted:', action);
    } else {
      console.log('exists:', action);
    }
  }

  await app.destroy();
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
```

执行：

```bash
node scripts/create-public-role.js
pm2 restart metaradio-cms
```

再次测试接口：

```bash
curl -i "http://127.0.0.1:1337/api/pages?locale=zh-CN"
curl -i "http://127.0.0.1:1337/api/datasheets?locale=zh-CN"
curl -i "http://127.0.0.1:1337/api/resources?locale=zh-CN"
```

## 8. 重启前端读取 CMS

```bash
pm2 restart metaradio-web
```

查看前端日志：

```bash
pm2 logs metaradio-web --lines 80
```

如果没有以下错误，说明前端已经正常读取 CMS：

```text
[strapi] 403
[strapi] 404
[strapi] fetch failed
```

## 9. 配置 PM2 开机自启

如果服务是用 root 用户启动的 PM2，开机自启也要按 root 用户配置。部署目录放在 `/home/qianjing-www/website_metaradio` 不影响自启，关键看启动 PM2 的用户是谁。

先确认服务列表：

```bash
pm2 list
```

保存当前进程列表：

```bash
pm2 save
```

生成开机自启命令：

```bash
pm2 startup
```

执行 `pm2 startup` 输出的那条命令。root 用户通常类似：

```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
```

如果当前已经是 root，也可以按输出内容直接执行。

再次保存：

```bash
pm2 save
```

检查 systemd 服务：

```bash
systemctl status pm2-root
```

如果状态是 `active`，服务器重启后会自动拉起：

```text
metaradio-web
metaradio-cms
```

重启后验证：

```bash
pm2 list
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1:1337/admin
```

## 10. 配置 Nginx

创建 Nginx 配置：

```bash
sudo vim /etc/nginx/conf.d/metaradio.conf
```

写入以下内容，将域名替换为实际域名：

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name cms.example.com;

    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:1337;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

检查配置：

```bash
sudo nginx -t
```

重载 Nginx：

```bash
sudo systemctl reload nginx
```

## 11. 配置域名解析

在阿里云 DNS 添加：

```text
A 记录：@
记录值：服务器公网 IP
```

```text
A 记录：www
记录值：服务器公网 IP
```

```text
A 记录：cms
记录值：服务器公网 IP
```

访问：

```text
http://example.com
http://www.example.com
http://cms.example.com/admin
```

## 12. 配置 HTTPS

安装 Certbot：

```bash
sudo apt install certbot python3-certbot-nginx -y
```

申请证书：

```bash
sudo certbot --nginx -d example.com -d www.example.com -d cms.example.com
```

测试续期：

```bash
sudo certbot renew --dry-run
```

## 13. 日常更新前端

本地执行：

```bash
npm run build

rm -rf deploy-web metaradio-web.tar.gz
mkdir -p deploy-web

cp -a .next/standalone/. deploy-web/
mkdir -p deploy-web/.next
cp -a .next/static deploy-web/.next/static
cp -a public deploy-web/public

tar -czf metaradio-web.tar.gz -C deploy-web .
scp metaradio-web.tar.gz 用户名@服务器IP:/home/qianjing-www/website_metaradio/web/
```

服务器执行：

```bash
cd /home/qianjing-www/website_metaradio/web
tar -xzf metaradio-web.tar.gz
pm2 restart metaradio-web
```

## 14. 日常更新 CMS

本地执行：

```bash
cd metaradio-cms
npm install
npm install mysql2
npm run build
cd ..

tar -czf metaradio-cms.tar.gz \
  metaradio-cms/config \
  metaradio-cms/dist \
  metaradio-cms/src \
  metaradio-cms/public \
  metaradio-cms/package.json \
  metaradio-cms/package-lock.json \
  metaradio-cms/scripts \
  metaradio-cms/seed-data
```

上传：

```bash
scp metaradio-cms.tar.gz 用户名@服务器IP:/home/qianjing-www/website_metaradio/cms/
```

服务器执行：

```bash
cd /home/qianjing-www/website_metaradio/cms
tar -xzf metaradio-cms.tar.gz --strip-components=1
npm install --omit=dev

cp -a dist/config/*.js config/
cp -a dist/src/. src/

pm2 restart metaradio-cms
pm2 restart metaradio-web
```

如果更新了初始化内容：

```bash
npm run seed
npm run import:pages
npm run import:datasheets
pm2 restart metaradio-web
```

## 15. 常用检查命令

查看服务：

```bash
pm2 list
```

检查 PM2 开机自启服务：

```bash
systemctl status pm2-root
```

查看前端日志：

```bash
pm2 logs metaradio-web --lines 80
```

查看 CMS 日志：

```bash
pm2 logs metaradio-cms --lines 80
```

查看端口：

```bash
ss -lntp
```

测试前端：

```bash
curl -I http://127.0.0.1:3000
```

测试 CMS 后台：

```bash
curl -I http://127.0.0.1:1337/admin
```

测试 CMS API：

```bash
curl -i "http://127.0.0.1:1337/api/pages?locale=zh-CN"
```

## 注意事项

1. Next.js 前端必须用 `server.js` 启动：

```bash
pm2 start server.js --name metaradio-web
```

不要用：

```bash
npm start
```

否则容易出现：

```text
Could not find a production build in the './.next' directory
```

2. 前端打包必须使用：

```bash
cp -a .next/standalone/. deploy-web/
```

不要使用：

```bash
cp -r .next/standalone/* deploy-web/
```

因为 `*` 不会复制隐藏的 `.next` 目录。

3. `metaradio-web` 读取 CMS 必须设置：

```bash
STRAPI_URL=http://127.0.0.1:1337
```

4. Strapi 生产环境只加载 `.js/.json` 配置，部署后必须执行：

```bash
cp -a dist/config/*.js config/
cp -a dist/src/. src/
```

5. 如果 CMS API 返回 `404`，说明 API 路由没有加载，重点检查 `dist/src` 是否复制到 `src`，并重启 CMS。

6. 如果 CMS API 返回 `403`，说明 Public 权限没有开启，需要给 `Page`、`Datasheet`、`Resource` 开启 `find` 和 `findOne`。

如果后台没有 `Public` 角色，可以使用第 7 步中的 `scripts/create-public-role.js` 创建 Public 角色并授权。

7. 如果 CMS API 返回 `200` 但 `data` 为空，说明内容没有导入，或内容还是 Draft，没有 Published。

8. `mysql2` 必须在 `metaradio-cms/package.json` 中，否则会报：

```text
Cannot find module 'mysql2'
```

9. `.env` 中的密钥上线后不要随意修改，否则后台登录、token、session 可能失效。

10. Strapi 上传文件默认在：

```text
/home/qianjing-www/website_metaradio/cms/public/uploads
```

更新 CMS 时不要删除该目录。
