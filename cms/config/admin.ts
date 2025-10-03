export default ({ env }: { env: any }) => ({
  autoOpen: false,
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dev-admin-jwt-secret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'dev-api-token-salt'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'dev-transfer-token-salt'),
    },
  },
});
