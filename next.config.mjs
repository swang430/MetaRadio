import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/zh-CN',
                permanent: true,
            },
        ];
    },
};

export default withNextIntlConfig(nextConfig);
