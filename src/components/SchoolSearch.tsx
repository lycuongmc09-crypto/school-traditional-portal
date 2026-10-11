"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ArrowRight, X } from "lucide-react";

const searchItems = [
  { title: "Lịch sử nhà trường", summary: "Các mốc xây dựng và phát triển từ năm 1979", href: "#timeline", keywords: "lịch sử thành lập 1979 1984 1990 2007 2012 timeline" },
  { title: "Tiểu sử đồng chí Hoàng Văn Thụ", summary: "Người chiến sĩ cách mạng mà nhà trường vinh dự mang tên", href: "#tribute", keywords: "anh hùng hoàng văn thụ tiểu sử cách mạng" },
  { title: "Thành tích và video", summary: "Tư liệu theo năm học và giai đoạn", href: "#media", keywords: "video thành tích 2024 2025 2026 2020" },
  { title: "Thế hệ thầy cô giáo", summary: "Những thầy cô qua các thời kỳ", href: "#teachers", keywords: "thầy cô hiệu trưởng giáo viên" },
  { title: "Phòng truyền thống", summary: "Hình ảnh và kỷ vật nhà trường", href: "#media", keywords: "hiện vật phòng truyền thống ảnh kỷ vật" },
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
}

export default function SchoolSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return searchItems.filter((item) => normalize(`${item.title} ${item.summary} ${item.keywords}`).includes(q));
  }, [query]);

  return (
    <div className="relative mx-auto w-full max-w-xl text-left">
      <label htmlFor="school-search" className="sr-only">Tìm thông tin về trường</label>
      <div className="flex items-center rounded-xl border border-white/30 bg-white/95 p-1.5 shadow-lg shadow-blue-950/15 ring-1 ring-blue-950/5 focus-within:ring-2 focus-within:ring-sky-300">
        <Search className="ml-3 h-5 w-5 shrink-0 text-blue-800" aria-hidden="true"/>
        <input id="school-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} placeholder="Tìm lịch sử, thành tích, thầy cô…" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500" aria-controls="school-search-results" autoComplete="off" />
        {query && <button type="button" onClick={() => { setQuery(""); setOpen(false); }} aria-label="Xóa nội dung tìm kiếm" className="mr-2 rounded p-2 text-slate-500 hover:bg-slate-100"><X className="h-4 w-4"/></button>}
        <button type="button" onClick={() => setOpen(true)} className="rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-950">Tìm kiếm</button>
      </div>
      {open && query && <div id="school-search-results" className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl" role="region" aria-label="Kết quả tìm kiếm">
        {results.length ? results.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 hover:bg-blue-50 focus-visible:bg-blue-50">
          <span><span className="block text-sm font-semibold">{item.title}</span><span className="mt-0.5 block text-xs text-slate-600">{item.summary}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-blue-800"/>
        </Link>) : <p className="px-4 py-5 text-sm text-slate-600">Chưa tìm thấy mục phù hợp. Thử từ khóa “lịch sử”, “thành tích” hoặc “thầy cô”.</p>}
      </div>}
    </div>
  );
}
