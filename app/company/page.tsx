import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

export default function AboutPage(){
  return (
    <div>
      <Nav />
      <Section title="关于我们" intro="MetaRadio — 射线跟踪与通信测试的一体化平台。">
        <div className="prose prose-slate max-w-none">
          <p>这里放公司介绍、团队、伙伴与证书内容。</p>
        </div>
      </Section>
    </div>
  );
}
