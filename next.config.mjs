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
            // 生产用阿里云 OSS 时在此补桶/CDN 域名，例如：
            // { protocol: 'https', hostname: '<bucket>.oss-cn-hangzhou.aliyuncs.com', pathname: '/**' },
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/zh-CN',
                permanent: true,
            },
            // 命名迁移 + 产品/解决方案拆分：旧 /platform、/solutions/* 别名、合并期 /datasheets/* → 新 /products | /solutions。
            // 具体映射在前，通配兜底在后（Next 按顺序取首个命中）。
            { source: '/:locale/platform/hyperrt', destination: '/:locale/products/l1-ray-tracing', permanent: true },
            { source: '/:locale/platform/csi-sensing', destination: '/:locale/solutions/v3-isac', permanent: true },
            { source: '/:locale/platform/mvs-workflow', destination: '/:locale/foundations', permanent: true },
            { source: '/:locale/platform/:path*', destination: '/:locale/products', permanent: true },
            { source: '/:locale/platform', destination: '/:locale/products', permanent: true },
            // 旧 /solutions/* 具体方案别名（落到「产品」L2）。不再设 /solutions/:path* 通配，
            // 否则会遮挡真实的 /solutions 列表与 /solutions/[slug] 详情。
            { source: '/:locale/solutions/mimo-ota', destination: '/:locale/products/l2-virtual-drive-test', permanent: true },
            { source: '/:locale/solutions/virtual-drive-testing', destination: '/:locale/products/l2-virtual-drive-test', permanent: true },
            // 合并期 /datasheets/* → 按分类拆到 /products（L1-L3 + Liquid RF）| /solutions（V1-V6），保留旧链接与 SEO。
            { source: '/:locale/datasheets/l1-ray-tracing', destination: '/:locale/products/l1-ray-tracing', permanent: true },
            { source: '/:locale/datasheets/l2-virtual-drive-test', destination: '/:locale/products/l2-virtual-drive-test', permanent: true },
            { source: '/:locale/datasheets/l3-em-twin', destination: '/:locale/products/l3-em-twin', permanent: true },
            { source: '/:locale/datasheets/liquid-rf', destination: '/:locale/products/liquid-rf', permanent: true },
            { source: '/:locale/datasheets/v1-low-altitude', destination: '/:locale/solutions/v1-low-altitude', permanent: true },
            { source: '/:locale/datasheets/v2-satellite-ntn', destination: '/:locale/solutions/v2-satellite-ntn', permanent: true },
            { source: '/:locale/datasheets/v3-isac', destination: '/:locale/solutions/v3-isac', permanent: true },
            { source: '/:locale/datasheets/v4-autonomous-driving', destination: '/:locale/solutions/v4-autonomous-driving', permanent: true },
            { source: '/:locale/datasheets/v5-robotics', destination: '/:locale/solutions/v5-robotics', permanent: true },
            { source: '/:locale/datasheets/v6-6g', destination: '/:locale/solutions/v6-6g', permanent: true },
            { source: '/:locale/datasheets', destination: '/:locale/products', permanent: true },
            { source: '/:locale/datasheets/:path*', destination: '/:locale/products', permanent: true },
        ];
    },
};

export default withNextIntlConfig(nextConfig);
