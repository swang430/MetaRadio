import type { ReactNode } from 'react';

export function Section({ id, title, intro, children }:{
  id?:string; title:string; intro?:string; children:ReactNode;
}){
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          {intro && <p className="mt-3 text-slate-600">{intro}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
