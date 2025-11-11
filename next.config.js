/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local Strapi development server
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },

      // Add your production Strapi domain here
      // Example: { protocol: 'https', hostname: 'strapi.yourdomain.com' },

      // Add your CDN domain here if using one
      // Example: { protocol: 'https', hostname: 'cdn.yourdomain.com' },

      // Placeholder images (remove if not needed)
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  experimental: { typedRoutes: true },
};
module.exports = nextConfig;
