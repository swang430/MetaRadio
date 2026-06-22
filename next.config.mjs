import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',

    async redirects() {
        return [
            {
                source: '/',
                destination: '/zh-CN',
                permanent: true,
            },
            // 命名迁移：旧 平台/解决方案 URL（HyperRT/RaySense/CSI/Horizon One）→ 新 datasheet/Foundations。
            // 具体映射在前，通配兜底在后（Next 按顺序取首个命中）。
            { source: '/:locale/platform/hyperrt', destination: '/:locale/datasheets/l1-ray-tracing', permanent: true },
            { source: '/:locale/platform/csi-sensing', destination: '/:locale/datasheets/v3-isac', permanent: true },
            { source: '/:locale/platform/mvs-workflow', destination: '/:locale/foundations', permanent: true },
            { source: '/:locale/platform/:path*', destination: '/:locale/datasheets', permanent: true },
            { source: '/:locale/platform', destination: '/:locale/datasheets', permanent: true },
            { source: '/:locale/solutions/mimo-ota', destination: '/:locale/datasheets/l2-virtual-drive-test', permanent: true },
            { source: '/:locale/solutions/virtual-drive-testing', destination: '/:locale/datasheets/l2-virtual-drive-test', permanent: true },
            { source: '/:locale/solutions/:path*', destination: '/:locale/datasheets', permanent: true },
            { source: '/:locale/solutions', destination: '/:locale/datasheets', permanent: true },
        ];
    },
};

export default withNextIntlConfig(nextConfig);
