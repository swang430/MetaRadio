import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // You can add other Next.js config here if needed
};

export default withNextIntlConfig(nextConfig);
