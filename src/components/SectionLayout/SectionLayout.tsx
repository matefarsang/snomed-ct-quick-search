import type { ReactNode } from "react";

type SectionLayoutProps = Readonly<{
  children: ReactNode;
}>;

export function SectionLayout({ children }: SectionLayoutProps) {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      {children}
    </section>
  );
}
