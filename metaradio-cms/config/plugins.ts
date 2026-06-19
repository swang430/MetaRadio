export default ({ env }) => ({
  // 上传 provider：默认本地（dev，存 public/uploads/，云端 serverless 上易丢）。
  // 设了 AWS_BUCKET 等环境变量则切到 S3（生产持久化）。启用 S3 还需：
  //   1) npm i @strapi/provider-upload-aws-s3
  //   2) 在前端 next.config.mjs 的 images.remotePatterns 加上桶/CDN 域名
  ...(env('AWS_BUCKET')
    ? {
        upload: {
          config: {
            provider: 'aws-s3',
            providerOptions: {
              baseUrl: env('AWS_CDN_URL'),
              s3Options: {
                credentials: {
                  accessKeyId: env('AWS_ACCESS_KEY_ID'),
                  secretAccessKey: env('AWS_ACCESS_SECRET'),
                },
                region: env('AWS_REGION'),
                params: { Bucket: env('AWS_BUCKET') },
              },
            },
          },
        },
      }
    : {}),
});
