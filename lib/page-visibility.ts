import { notFound } from 'next/navigation';
import { isHidden } from './nav';

/**
 * 页面顶部可见性守卫：该页在 lib/nav 里被标记 hidden 时返回 404。
 * 用法：在 page 组件取到 locale 后调用 `assertVisible('tools')`。
 * 配合 Header/Footer/sitemap 的过滤，实现「两态」隐藏（导航/SEO/直达 URL 一起隐藏）。
 */
export function assertVisible(key: string): void {
  if (isHidden(key)) notFound();
}
