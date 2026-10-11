import Link from "next/link";
import { ArrowRight, Compass, MapPin, Film, CalendarDays, Camera } from "lucide-react";
import Reveal from "./Reveal";
import SchoolSearch from "./SchoolSearch";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20 border-b border-slate-200 bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(37,99,153,.1),transparent_48%),linear-gradient(115deg,#f8fafc_0%,#eff5fb_52%,#e5eef7_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-8 items-center">
          {/* Main Left Editorial Content */}
          <Reveal className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <p className="font-sans text-xs font-bold uppercase tracking-[.2em] text-blue-800">Không gian truyền thống & tư liệu số</p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-sans font-bold tracking-wider uppercase">
              <MapPin className="w-4 h-4" />
              Vàng Danh · Uông Bí · Quảng Ninh
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-display font-bold tracking-tight text-slate-950 leading-[1.08]">
              Trường THPT <span className="text-[#245A91]">Hoàng Văn Thụ</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Từ phân hiệu cấp 3 Vàng Danh năm 1979 đến mái trường hôm nay — cùng nhìn lại hành trình dạy tốt, học tốt và những câu chuyện làm nên truyền thống nhà trường.
            </p>
            <p className="flex items-start justify-center lg:justify-start gap-2 text-sm font-sans text-slate-600">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-700" />
              Tổ 1, Khu phố Vàng Danh 3, Phường Vàng Danh, tỉnh Quảng Ninh
            </p>

            <SchoolSearch />

            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="#timeline"
                className="px-6 py-3.5 bg-gradient-to-r from-[#173B68] to-[#245A91] text-white font-sans font-semibold text-sm rounded-md shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 border border-blue-900/30 group"
              >
                <Compass className="w-4 h-4 text-blue-100 group-hover:rotate-45 transition-transform duration-300" />
                Khám phá lịch sử trường
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#media"
                className="px-6 py-3.5 bg-white text-slate-800 font-sans font-semibold text-sm rounded-md border border-slate-300 hover:border-blue-500 hover:text-blue-800 transition-all shadow-sm flex items-center gap-2"
              >
                <Film className="w-4 h-4 text-blue-700" />
                Xem video & tư liệu
              </Link>
            </div>

            {/* Archival Metrics Counter */}
            <div className="pt-6 border-t border-slate-300 grid grid-cols-3 gap-3 text-center sm:text-left">
              <div className="p-3 bg-white border border-blue-100 rounded-md card-lift">
                <div className="text-2xl sm:text-3xl font-display font-bold text-blue-900">1979</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-600 font-sans mt-0.5 font-medium">
                  Thành lập phân hiệu
                </div>
              </div>
              <div className="p-3 bg-white border border-blue-100 rounded-md card-lift">
                <div className="text-2xl sm:text-3xl font-display font-bold text-blue-900">1984</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-600 font-sans mt-0.5 font-medium">
                  Thành lập trường
                </div>
              </div>
              <div className="p-3 bg-white border border-blue-100 rounded-md card-lift">
                <div className="text-2xl sm:text-3xl font-display font-bold text-blue-900">2012</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-600 font-sans mt-0.5 font-medium">
                  Đạt chuẩn quốc gia
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Museum Vitrine Feature Card */}
          <Reveal className="lg:col-span-6" delay={1}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Halo Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-br from-blue-300 via-blue-800 to-sky-300 rounded-md opacity-35 blur-sm"></div>

              {/* Main Vitrine Display Frame */}
              <div className="relative bg-white border border-blue-200 rounded-md p-2 shadow-2xl overflow-hidden card-lift">
                {/* Vintage Watermark Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/70 to-transparent pointer-events-none"></div>

                {/* Seal & Heading */}
                <div className="relative group overflow-hidden rounded-sm bg-slate-100">
                  <Image src="/images/school-placeholder.svg" alt="Ảnh tư liệu Trường THPT Hoàng Văn Thụ sẽ được bổ sung" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-5 sm:p-7 pt-20 text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm"><Camera className="h-3.5 w-3.5"/>Không gian truyền thống</span>
                    <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold">Một mái trường, nhiều thế hệ</h3>
                    <p className="mt-1 text-sm text-white/85">Ảnh chính thức sẽ được cập nhật sau buổi tư liệu cùng nhà trường.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 px-3 py-3 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-blue-700"/>Hành trình bắt đầu từ năm 1979</span>
                  <Link href="#media" className="inline-flex items-center gap-1 font-semibold text-blue-800 hover:text-blue-950">Xem tư liệu <ArrowRight className="h-3.5 w-3.5"/></Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
