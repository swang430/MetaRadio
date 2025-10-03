import Link from 'next/link';
export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600"/>
          <span className="text-xl font-bold tracking-tight">MetaRadio</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          <li><Link href="/marketing/solutions">解决方案</Link></li>
          <li><Link href="/marketing/products">核心产品</Link></li>
          <li><Link href="/capabilities">技术能力</Link></li>
          <li><Link href="/marketing/cases">成功案例</Link></li>
          <li><Link href="/marketing/blog">洞察</Link></li>
          <li><Link href="/marketing/resources">资源</Link></li>
          <li><Link href="/company">关于</Link></li>
          <li><Link href="/contact">联系</Link></li>
        </ul>
      </nav>
    </header>
  );
}
