import Image from "next/image";
import { ArrowRight, Film, Image as ImageIcon, Play, PlayCircle } from "lucide-react";
import type { SchoolMedia } from "@/lib/types";
import Reveal from "./Reveal";

function MediaVisual({ item, featured = false }: { item: SchoolMedia; featured?: boolean }) {
  if (item.type === "image" && item.src) return <Image src={item.src} alt={item.title} fill sizes={featured ? "(max-width: 1024px) 100vw, 65vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"/>;
  if (item.type === "video" && item.src) return <video src={item.src} controls preload="metadata" className="h-full w-full object-cover" aria-label={item.title}/>;
  return <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-800 to-sky-600 p-7 text-center text-white">
    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/10 backdrop-blur"><Play className="ml-1 h-6 w-6 fill-white"/></span>
    <span className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-sky-100">Phim tư liệu</span>
    <span className="mt-2 font-display text-2xl font-semibold">{item.year}</span>
    <span className="mt-2 max-w-xs text-sm text-white/75">Video nhà trường sẽ được cập nhật tại đây</span>
  </div>;
}

export default function MediaSection({ media }: { media: SchoolMedia[] }) {
  const featured = media.find((item) => item.featured);
  const news = media.filter((item) => item.type === "video").sort((a, b) => b.year.localeCompare(a.year));
  const archive = media.filter((item) => !item.featured);

  return (
    <section id="media" className="border-b border-slate-200 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-blue-800"><Film className="h-4 w-4"/> Tin tức · Video · Tư liệu</span><h2 className="mt-3 font-display text-3xl font-bold text-slate-950 sm:text-4xl">Đời sống và dấu ấn nhà trường</h2><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Nội dung mới nhất được đặt phía trước; phim tư liệu và hình ảnh được sắp xếp thành kho để dễ khám phá.</p></div>
          <a href="#media-archive" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-950">Tất cả tư liệu <ArrowRight className="h-4 w-4"/></a>
        </Reveal>

        {news.length > 0 && <div className="mb-12 grid gap-4 md:grid-cols-3">
          {news.map((item, index) => <Reveal key={item.id} delay={(index % 3) + 1}>
            <a href="#media-archive" className="group flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-800"><PlayCircle className="h-5 w-5"/></span>
              <span><span className="block text-[11px] font-bold uppercase tracking-wider text-blue-700">{item.year} · Thành tích</span><span className="mt-1 block font-semibold leading-snug text-slate-900">{item.title}</span><span className="mt-2 block text-xs leading-5 text-slate-500">Mở tư liệu <ArrowRight className="inline h-3 w-3"/></span></span>
            </a>
          </Reveal>)}
        </div>}

        {featured && <Reveal className="mb-12">
          <article className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl lg:grid-cols-[1.35fr_.9fr]">
            <div className="relative min-h-[290px] overflow-hidden bg-blue-950 sm:min-h-[390px]"><MediaVisual item={featured} featured/><div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-950"><PlayCircle className="h-4 w-4"/>{featured.type === "video" ? "Nổi bật" : "Tư liệu mới"}</div></div>
            <div className="flex flex-col justify-center p-7 sm:p-10"><span className="text-xs font-bold uppercase tracking-[.18em] text-blue-700">{featured.year} · Nổi bật</span><h3 className="mt-4 font-display text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">{featured.title}</h3><p className="mt-4 text-base leading-7 text-slate-600">{featured.description}</p><div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-800">Khám phá câu chuyện <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></div></div>
          </article>
        </Reveal>}

        <div id="media-archive" className="scroll-mt-28">
          <div className="mb-5 flex items-center gap-3"><ImageIcon className="h-5 w-5 text-blue-700"/><h3 className="font-display text-xl font-bold text-slate-950">Kho video & tư liệu</h3><span className="hidden h-px flex-1 bg-slate-200 sm:block"/></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((item, index) => <Reveal key={item.id} delay={(index % 3) + 1}>
              <article className="group h-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-blue-950"><MediaVisual item={item}/></div>
                <div className="p-5"><span className="text-xs font-bold uppercase tracking-wider text-blue-700">{item.year}</span><h4 className="mt-2 font-display text-lg font-bold text-slate-950">{item.title}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></div>
              </article>
            </Reveal>)}
          </div>
        </div>
        <p className="mt-7 text-xs leading-5 text-slate-500">Ảnh, video và thành tích minh họa sẽ được thay bằng tư liệu chính thức nhà trường cung cấp.</p>
      </div>
    </section>
  );
}
