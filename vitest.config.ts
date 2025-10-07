import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    env: {
      STRAPI_API_URL: '',
      STRAPI_API_TOKEN: '',
      NEXT_PUBLIC_STRAPI_URL: '',
    },
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
