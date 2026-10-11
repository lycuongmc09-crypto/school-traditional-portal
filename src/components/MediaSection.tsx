import { Film, Image as ImageIcon, PlayCircle, ArrowRight } from "lucide-react";
import type { SchoolMedia } from "@/lib/types";
import Reveal from "./Reveal";

export default function MediaSection({ media }: { media: SchoolMedia[] }) {
  const featured = media.filter((item) => item.featured);
  const archive = media.filter((item) => !item.featured);

  return (
    <section id="media" className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-blue-800"><Film className="h-4 w-4"/> Thư viện hình ảnh & video</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 sm:text-4xl">Những câu chuyện bằng hình ảnh</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">Tư liệu học tập và những thước phim về thành tích, hoạt động mới nhất của nhà trường.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900"><ImageIcon className="h-4 w-4"/> Tư liệu nhà trường</span>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_.8fr]">
          {featured.map((item, index) => (
            <Reveal key={item.id} delay={index + 1} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  {item.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.src} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  ) : item.src ? (
                    <video src={item.src} controls preload="metadata" className="h-full w-full object-cover" aria-label={item.title} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-800 to-sky-600 p-8 text-center text-white">
                      <PlayCircle className="h-14 w-14 text-white/90" strokeWidth={1.25}/>
                      <p className="mt-4 text-xs font-bold uppercase tracking-[.22em] text-blue-100">Video tư liệu</p>
                      <p className="mt-2 max-w-sm font-display text-2xl font-semibold">{item.year}</p>
                      <p className="mt-2 text-sm text-white/80">Video chính thức đang chờ nhà trường cung cấp</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="text-xs font-bold uppercase tracking-[.16em] text-blue-700">{item.year}</span>
                  <h3 className="mt-2 font-display text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-display text-xl font-bold text-slate-900">Kho tư liệu theo năm học</h3>
            <span className="text-sm text-slate-500">Chọn để xem thêm</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {archive.map((item, index) => (
              <Reveal key={item.id} delay={index + 1}>
                <article className="flex h-full items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-800"><Film className="h-5 w-5"/></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{item.year}</p>
                    <h4 className="mt-1 font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    {item.src && <a href={item.src} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-800 hover:text-blue-950">Mở tư liệu <ArrowRight className="h-3.5 w-3.5"/></a>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs leading-5 text-slate-500">Video và hình ảnh thành tích sẽ được thay bằng tư liệu do nhà trường cung cấp. Không sử dụng ảnh minh họa như ảnh thật của trường.</p>
      </div>
    </section>
  );
}
