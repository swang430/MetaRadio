// 全站页面「显示 / 隐藏」单一开关源（两态）。
// 把某页 hidden 设为 true，即在 顶部导航 / 页脚快速链接 / sitemap / 直达 URL（404）全站一起隐藏；
// 设回 false（或删掉 hidden）即恢复。切换方式：改这里一个字段 → commit push → Vercel 自动重部署（约 1 分钟）。
// 向前兼容：将来 hidden 的取值源可换成 Strapi「是否发布」开关或 Vercel Edge Config，消费端
//（Header / Footer / sitemap / 各 page 守卫）保持不变。

export interface NavPage {
  /** i18n 键 + 可见性查询键（与 Header 导航键一致）。 */
  key: string;
  /** 页面路径（locale 前缀由各处运行时拼）。 */
  path: string;
  /** true = 隐藏；默认显示。 */
  hidden?: boolean;
}

export const PAGES: NavPage[] = [
  { key: 'products', path: '/products' },
  { key: 'solutions', path: '/solutions' },
  { key: 'foundations', path: '/foundations' },
  { key: 'services', path: '/services' },
  { key: 'tools', path: '/tools' },
  { key: 'resources', path: '/resources' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
];

/** 某页是否隐藏（Header / Footer 过滤、page 守卫用）。 */
export const isHidden = (key: string): boolean =>
  PAGES.find((p) => p.key === key)?.hidden ?? false;

/** 某路径是否隐藏（sitemap 过滤用）。 */
export const isHiddenPath = (path: string): boolean =>
  PAGES.find((p) => p.path === path)?.hidden ?? false;
