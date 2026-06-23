export default ({ env }) => ({
  // 上传 provider：默认本地（dev，存 public/uploads/，云端 serverless 上易丢）。
  // 设了 OSS_BUCKET 则切到阿里云 OSS（生产持久化）。启用 OSS 三步：
  //   1) npm i strapi-provider-upload-oss
  //   2) 设环境变量 OSS_ACCESS_KEY_ID / OSS_ACCESS_KEY_SECRET / OSS_REGION / OSS_BUCKET / OSS_BASE_URL
  //   3) 前端 next.config.mjs 的 images.remotePatterns 加 OSS/CDN 域名
  ...(env('OSS_BUCKET')
    ? {
        upload: {
          config: {
            provider: 'oss', // 解析到 strapi-provider-upload-oss
            providerOptions: {
              accessKeyId: env('OSS_ACCESS_KEY_ID'),
              accessKeySecret: env('OSS_ACCESS_KEY_SECRET'),
              region: env('OSS_REGION'), // 如 oss-cn-hangzhou
              bucket: env('OSS_BUCKET'),
              baseUrl: env('OSS_BASE_URL'), // 桶/CDN 访问域名
              uploadPath: env('OSS_UPLOAD_PATH', 'metaradio'),
              secure: true,
            },
          },
        },
      }
    : {}),
});
