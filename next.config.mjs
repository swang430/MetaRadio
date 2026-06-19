import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/i18n.ts');

// next/image 远程域名白名单：允许从 Strapi 媒体库（PR-IMG-3 的 heroImage）取图。
// 由 STRAPI_URL 推导（默认本地 :1337）；生产用 S3 时在 remotePatterns 里补桶域名。
const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const strapiHost = (() => {
    try {
        const u = new URL(strapiUrl);
        return { protocol: u.protocol.replace(':', ''), hostname: u.hostname, port: u.port };
    } catch {
        return { protocol: 'http', hostname: 'localhost', port: '1337' };
    }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: strapiHost.protocol,
                hostname: strapiHost.hostname,
                ...(strapiHost.port ? { port: strapiHost.port } : {}),
                pathname: '/uploads/**',
            },
            // 生产用 S3 时在此补桶域名，例如：
            // { protocol: 'https', hostname: '<bucket>.s3.<region>.amazonaws.com', pathname: '/**' },
        ],
    },
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
