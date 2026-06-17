import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Next 15 与已装的 eslint-config-next 14.2.5 的构建期 lint 调用不兼容；
    // 暂在构建时跳过 lint（待对齐 eslint-config-next 版本后恢复）。
    eslint: { ignoreDuringBuilds: true },
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
