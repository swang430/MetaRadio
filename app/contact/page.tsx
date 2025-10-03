import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

export default function ContactPage(){
  return (
    <div>
      <Nav />
      <Section title="联系我们" intro="预约演示、索取规格书或讨论联合研发。">
        <form className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-600">姓名</label>
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40" placeholder="张三" />
            </div>
            <div>
              <label className="text-sm text-slate-600">邮箱</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="you@company.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-slate-600">需求</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="简要描述你的测试/仿真需求…"
              ></textarea>
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /> 同意隐私政策
              </label>
              <button
                type="button"
                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </Section>
    </div>
  );
}
