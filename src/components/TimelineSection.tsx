import { Milestone } from "@/lib/types";
import { History } from "lucide-react";
import Reveal from "./Reveal";
import Image from "next/image";

export default function TimelineSection({ milestones }: { milestones: Milestone[] }) {
  const orderedMilestones = [...milestones].sort((a, b) => {
    const yearA = Number(a.year.match(/\d{4}/)?.[0] ?? 0);
    const yearB = Number(b.year.match(/\d{4}/)?.[0] ?? 0);
    return yearA - yearB;
  });
  return (
    <section id="timeline" className="py-20 md:py-28 border-b border-slate-200 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Harvard academic typography */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.25em] uppercase text-blue-800">
            <History className="w-4 h-4 text-blue-700" />
            Từ dấu mốc đến hôm nay
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1A1615]">
            Lịch sử nhà trường
          </h2>
          <div className="flex items-center justify-center gap-2 my-3">
            <div className="w-12 h-[1px] bg-blue-300"></div>
            <div className="w-2 h-2 rotate-45 bg-blue-700"></div>
            <div className="w-12 h-[1px] bg-blue-300"></div>
          </div>
          <p className="text-base sm:text-lg text-[#665E5A] font-sans">
            Theo dòng thời gian từ phân hiệu Vàng Danh năm 1979 đến Trường THPT Hoàng Văn Thụ hôm nay.
          </p>
        </Reveal>

        {/* Timeline Spine and Cards */}
        <div className="relative">
          {/* Timeline spine */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-blue-200 via-blue-700 to-blue-200"></div>

          <div className="space-y-12 md:space-y-16">
            {orderedMilestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <Reveal
                  key={item.id}
                  delay={(index % 4) + 1}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-8`}
                >
                  {/* Central Milestone Seal / Medallion */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-blue-700 items-center justify-center z-10 shadow-md">
                    <span className="font-sans font-bold text-[10px] text-blue-900 tracking-wide text-center px-1">
                      {item.year.match(/\d{4}/)?.[0]}
                    </span>
                  </div>

                  {/* Content Box */}
                  <div className="w-full md:w-1/2 px-2 md:px-8">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all relative overflow-hidden group story-card">
                      {/* Top Gold & Crimson Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-sky-300"></div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-display font-bold text-blue-900 tracking-tight">
                            {item.year}
                          </span>
                          <span className="text-[11px] font-sans uppercase tracking-widest text-blue-700 font-bold">
                            DẤU MỐC
                          </span>
                        </div>
                        <span className="text-xs font-sans font-semibold px-3 py-1 bg-blue-50 text-blue-900 border border-blue-100 rounded-full uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-slate-900 mb-2.5 group-hover:text-blue-800 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Documentary photos will be provided by the school */}
                      <div className="relative h-44 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        <Image src={item.imageUrl} alt={`Ảnh tư liệu sẽ bổ sung: ${item.title}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                        <div className="absolute bottom-2.5 left-3 right-3 text-slate-700 text-xs font-sans font-medium flex items-center justify-between">
                          <span>Ảnh tư liệu</span>
                          <span className="rounded-full bg-white/90 px-2 py-1">Sẽ cập nhật</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty spacer for alignment on desktop */}
                  <div className="hidden md:block md:w-1/2"></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
