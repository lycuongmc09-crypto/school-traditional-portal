"use client";

import { useState } from "react";
import Image from "next/image";
import type { Milestone } from "@/lib/types";
import { ArrowRight, History } from "lucide-react";
import Reveal from "./Reveal";

export default function TimelineSection({ milestones }: { milestones: Milestone[] }) {
  const [activeId, setActiveId] = useState(milestones[0]?.id ?? "");
  const ordered = [...milestones].sort((a, b) => Number(a.year.match(/\d{4}/)?.[0] ?? 0) - Number(b.year.match(/\d{4}/)?.[0] ?? 0));
  const active = ordered.find((item) => item.id === activeId) ?? ordered[0];
  if (!active) return null;

  return (
    <section id="timeline" className="overflow-hidden border-b border-slate-200 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-blue-800"><History className="h-4 w-4"/> Biên niên sử nhà trường</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 sm:text-5xl">Từ Vàng Danh, viết tiếp hành trình</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Chọn một mốc trên trục thời gian để khám phá từng chặng đường phát triển của nhà trường.</p>
        </Reveal>

        <div className="relative mb-10 overflow-x-auto pb-4">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-slate-200 md:block"/>
          <ol className="relative flex min-w-max gap-3 md:grid md:min-w-0 md:grid-flow-col md:auto-cols-fr md:gap-2">
            {ordered.map((item, index) => {
              const selected = item.id === active.id;
              return <li key={item.id} className="min-w-[120px] md:min-w-0">
                <button type="button" aria-pressed={selected} onClick={() => setActiveId(item.id)} className="group flex w-full flex-col items-start gap-3 rounded-lg p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:items-center md:text-center">
                  <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-xs font-bold shadow transition-all ${selected ? "scale-110 bg-blue-800 text-white ring-2 ring-blue-200" : "bg-slate-200 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-900"}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${selected ? "text-blue-900" : "text-slate-500"}`}>{item.year}</span>
                  <span className={`max-w-36 text-sm font-semibold leading-snug ${selected ? "text-slate-950" : "text-slate-600"}`}>{item.title}</span>
                </button>
              </li>;
            })}
          </ol>
        </div>

        <div key={active.id} className="timeline-panel grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-[270px] bg-blue-950 sm:min-h-[360px]">
            <Image src={active.imageUrl} alt={`Tư liệu minh họa cho mốc ${active.year}: ${active.title}`} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/65 via-transparent to-transparent"/>
            <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-950">Tư liệu ảnh · sẽ cập nhật</span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-blue-700">{active.category}</span>
            <p className="mt-4 font-display text-5xl font-bold tracking-tight text-blue-900 sm:text-6xl">{active.year}</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-slate-950 sm:text-3xl">{active.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{active.description}</p>
            <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-blue-800"><span className="h-px w-8 bg-blue-300"/>Tư liệu lịch sử nhà trường</div>
          </div>
        </div>

        <div className="mt-5 flex justify-end"><a href="#media" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-950">Khám phá tư liệu hình ảnh <ArrowRight className="h-4 w-4"/></a></div>
      </div>
    </section>
  );
}
