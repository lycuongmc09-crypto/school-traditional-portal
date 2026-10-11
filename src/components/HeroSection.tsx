import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Camera, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import SchoolSearch from "./SchoolSearch";

export default function HeroSection() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-20">
        <Image src="/images/school-placeholder.svg" alt="Ảnh trường sẽ được cập nhật khi nhà trường cung cấp tư liệu" fill priority sizes="100vw" className="object-cover opacity-30" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,24,45,.96)_0%,rgba(14,46,79,.88)_48%,rgba(14,46,79,.36)_100%),linear-gradient(0deg,rgba(7,24,45,.48),transparent_58%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_42%,rgba(56,130,190,.25),transparent_42%)]" />

      <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:min-h-[720px] md:py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <Reveal className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[.18em] text-blue-100">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4"/>Vàng Danh · Uông Bí · Quảng Ninh</span>
            <span className="hidden h-1 w-1 rounded-full bg-sky-300 sm:block"/>
            <span>Thành lập phân hiệu năm 1979</span>
          </div>

          <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Trường THPT<br/><span className="text-sky-200">Hoàng Văn Thụ</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-50/90 sm:text-lg">
            Từ những lớp học đầu tiên ở Vàng Danh đến hành trình hôm nay — khám phá lịch sử, con người và những thành tựu của các thế hệ thầy trò.
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm text-blue-100/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0"/>Tổ 1, Khu phố Vàng Danh 3, Phường Vàng Danh, tỉnh Quảng Ninh
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#timeline" className="group inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-blue-950 shadow-lg transition-all hover:bg-sky-100">
              Khám phá lịch sử <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
            </Link>
            <Link href="#media" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/35 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15">
              Xem phim tư liệu <ArrowDown className="h-4 w-4"/>
            </Link>
          </div>

          <div className="mt-9 max-w-xl"><SchoolSearch /></div>
        </Reveal>

        <Reveal delay={1} className="relative hidden lg:block">
          <div className="relative ml-auto max-w-[470px] overflow-hidden rounded-xl border border-white/25 bg-white/10 p-2 shadow-2xl shadow-blue-950/50 backdrop-blur-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-800">
              <Image src="/images/school-placeholder.svg" alt="Khung ảnh tư liệu chính thức của Trường THPT Hoàng Văn Thụ sẽ được bổ sung" fill sizes="470px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-slate-950/5"/>
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"><Camera className="h-3.5 w-3.5"/>Tư liệu nhà trường</div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-xs font-bold uppercase tracking-[.2em] text-sky-200">Một mái trường · Nhiều thế hệ</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">Hành trình được viết tiếp mỗi ngày</h2>
                <p className="mt-3 text-sm leading-6 text-white/75">Ảnh banner chính thức sẽ được bổ sung sau buổi ghi hình cùng nhà trường.</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-5 rounded-lg border border-white/15 bg-blue-950/90 px-5 py-4 shadow-xl backdrop-blur">
            <p className="font-display text-3xl font-bold text-white">1979</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-blue-100">Dấu mốc khởi đầu</p>
          </div>
        </Reveal>
      </div>
      <div className="border-t border-white/15 bg-blue-950/65 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 text-xs font-medium text-blue-100/90 sm:px-6 lg:px-8">
          <span>TRƯỜNG THPT HOÀNG VĂN THỤ</span><span>VÀNG DANH · QUẢNG NINH</span><span>TRUYỀN THỐNG DẠY TỐT · HỌC TỐT</span>
        </div>
      </div>
    </section>
  );
}
