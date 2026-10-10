import { Teacher } from "@/lib/types";
import { Award, GraduationCap, Medal } from "lucide-react";

export default function TeachersSection({ teachers }: { teachers: Teacher[] }) {
  return (
    <section id="teachers" className="py-20 md:py-28 border-b border-[#E4DCD0] bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.25em] uppercase text-[#A51C30]">
            <Award className="w-4 h-4 text-[#C29B38]" />
            Bảng Vàng Danh Sư & Nhà Giáo Mẫu Mực
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A1615]">
            Thầy Cô & Tiên Khắc Khai Phá
          </h2>
          <div className="flex items-center justify-center gap-2 my-3">
            <div className="w-12 h-[1px] bg-[#C29B38]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#C29B38]"></div>
            <div className="w-12 h-[1px] bg-[#C29B38]"></div>
          </div>
          <p className="text-base sm:text-lg text-[#665E5A] font-sans">
            Những tấm gương nhà giáo mẫu mực đã dành trọn tâm huyết, trí tuệ để vun đắp nên vị thế và danh tiếng học hiệu qua nhiều thời kỳ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-[#FAF7F2] border border-[#D8C7A5] rounded-sm p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#C29B38] transition-all flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Top Harvard Gold & Crimson Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#801424] via-[#DFB15B] to-[#801424]"></div>

              {/* Classical Medallion Portrait Frame */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FAF7F2] shadow-vitrine group-hover:shadow-vitrine-hover transition-shadow relative z-10 outline outline-2 outline-[#C29B38]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                {/* Honorary Crest Icon Badge */}
                <div className="absolute -bottom-2 -right-1 z-20 w-8 h-8 rounded-full bg-[#801424] text-[#DFB15B] border-2 border-[#DFB15B] flex items-center justify-center shadow-md">
                  <Medal className="w-4 h-4" />
                </div>
              </div>

              {/* Period Pill Badge */}
              <div className="inline-block px-3.5 py-1 bg-[#F4EEE3] border border-[#D8C7A5] rounded-xs text-[11px] font-sans font-bold text-[#A51C30] mb-3 uppercase tracking-wider">
                Giai Đoạn {teacher.period}
              </div>

              <h3 className="text-xl font-serif font-bold text-[#1A1615] group-hover:text-[#A51C30] transition-colors leading-snug">
                {teacher.name}
              </h3>

              <div className="text-xs font-sans font-semibold text-[#C29B38] uppercase tracking-wider mt-1 mb-4 flex items-center justify-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                {teacher.role}
              </div>

              <p className="text-sm font-serif italic text-[#554D49] leading-relaxed border-t border-[#E4DCD0] pt-4 mt-auto">
                &ldquo;{teacher.bio}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
