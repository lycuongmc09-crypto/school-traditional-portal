import { Milestone } from "@/lib/types";
import { History } from "lucide-react";
import Reveal from "./Reveal";

export default function TimelineSection({ milestones }: { milestones: Milestone[] }) {
  return (
    <section id="timeline" className="py-20 md:py-28 border-b border-[#E4DCD0] bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Harvard academic typography */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.25em] uppercase text-[#A51C30]">
            <History className="w-4 h-4 text-[#C29B38]" />
            Biên Niên Sử & Mốc Son Thời Gian
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1A1615]">
            Những Mốc Son Lịch Sử Vẻ Vang
          </h2>
          <div className="flex items-center justify-center gap-2 my-3">
            <div className="w-12 h-[1px] bg-[#C29B38]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#C29B38]"></div>
            <div className="w-12 h-[1px] bg-[#C29B38]"></div>
          </div>
          <p className="text-base sm:text-lg text-[#665E5A] font-sans">
            Hành trình hơn 70 năm kiến tạo tương lai qua những giai đoạn lịch sử hào hùng, từ thời kỳ khói lửa đến kỷ nguyên vươn tầm thế giới.
          </p>
        </Reveal>

        {/* Timeline Spine and Cards */}
        <div className="relative">
          {/* Vertical Harvard Gold & Crimson Spine Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-6 bottom-6 w-1 bg-gradient-to-b from-[#C29B38] via-[#A51C30] to-[#C29B38] opacity-70"></div>

          <div className="space-y-12 md:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <Reveal
                  key={item.id}
                  delay={(index % 4) + 1}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-8`}
                >
                  {/* Central Milestone Seal / Medallion */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-[#4E0A14] border-2 border-[#DFB15B] items-center justify-center z-10 shadow-lg">
                    <span className="font-serif font-bold text-xs text-[#FAF7F2] tracking-wider">
                      {item.year.slice(2)}&apos;s
                    </span>
                  </div>

                  {/* Content Box */}
                  <div className="w-full md:w-1/2 px-2 md:px-8">
                    <div className="bg-[#FAF7F2] border border-[#D8C7A5] rounded-sm p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#C29B38] transition-all relative overflow-hidden group story-card">
                      {/* Top Gold & Crimson Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A51C30] via-[#DFB15B] to-[#A51C30]"></div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-serif font-bold text-[#A51C30] tracking-tight">
                            {item.year}
                          </span>
                          <span className="text-[11px] font-sans uppercase tracking-widest text-[#C29B38] font-bold">
                            Niên Đại
                          </span>
                        </div>
                        <span className="text-xs font-sans font-semibold px-3 py-1 bg-[#F4EEE3] text-[#4E0A14] border border-[#D8C7A5] rounded-xs uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-[#1A1615] mb-2.5 group-hover:text-[#A51C30] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[#554D49] font-sans text-sm sm:text-base leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Image Thumbnail with Museum frame */}
                      <div className="relative h-52 w-full rounded-xs overflow-hidden border border-[#D8C7A5] shadow-inner group-hover:border-[#C29B38] transition-colors">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A050A]/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-sans font-medium flex items-center justify-between drop-shadow">
                          <span>Hình ảnh tư liệu lịch sử</span>
                          <span className="text-[#DFB15B] font-serif italic">Bản gốc số hóa</span>
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
