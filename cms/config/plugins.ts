export default ({ env }: { env: any }) => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'zh',
      locales: ['zh', 'en'],
    },
  },
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'local'),
      providerOptions: {
        sizeLimit: env.int('UPLOAD_MAX_SIZE', 50 * 1024 * 1024),
      },
    },
  },
  graphql: {
    enabled: env.bool('GRAPHQL_ENABLED', false),
  },
});
