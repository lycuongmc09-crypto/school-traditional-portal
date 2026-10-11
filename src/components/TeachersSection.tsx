import type { Teacher } from "@/lib/types";
import { Award } from "lucide-react";
import Reveal from "./Reveal";

export default function TeachersSection({ teachers }: { teachers: Teacher[] }) {
  return (
    <section id="teachers" className="border-b border-slate-200 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-blue-800"><Award className="h-4 w-4"/> Những người đồng hành qua các thời kỳ</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 sm:text-4xl">Thế hệ thầy cô giáo</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">Một số mốc công tác Hiệu trưởng được ghi nhận trong tư liệu lịch sử nhà trường.</p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {teachers.map((teacher, index) => <Reveal key={teacher.id} delay={(index % 3) + 1}>
            <article className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">{teacher.period}</span>
              <h3 className="mt-3 font-display text-xl font-bold text-slate-950">{teacher.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">{teacher.role}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{teacher.bio}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}
