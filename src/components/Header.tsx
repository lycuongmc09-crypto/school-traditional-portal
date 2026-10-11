"use client";

import Link from "next/link";
import { Award, History, Menu, X, Landmark, Type, Film } from "lucide-react";
import { useState, useEffect } from "react";
import AcademicSeal from "./AcademicSeal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeFontSize = (size: "normal" | "large" | "xlarge") => {
    setFontSize(size);
    document.documentElement.setAttribute("data-font-size", size);
  };

  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-[#801424] focus:shadow-lg">
      Bỏ qua điều hướng, đến nội dung chính
    </a>
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      {/* Scroll Progress Bar */}
      <div
        className="h-1 bg-gradient-to-r from-blue-950 via-blue-600 to-sky-400 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Top Banner: Harvard style motto ribbon */}
      <div className="bg-gradient-to-r from-[#173B68] via-[#245A91] to-[#173B68] text-white text-[11px] py-1.5 px-4 tracking-[0.12em] text-center uppercase font-sans border-b border-blue-950/40 flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2 text-[#DFB15B] text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-200 shadow-[0_0_6px_#bae6fd]"></span>
          <span>THÀNH LẬP PHÂN HIỆU NĂM 1979</span>
        </div>

        <div className="flex-1 text-center font-semibold text-[#EFE8DA] tracking-wider text-[11px] sm:text-xs">
          TỰ HÀO TRUYỀN THỐNG • VỮNG BƯỚC TƯƠNG LAI
        </div>

        {/* Accessibility Font Size Toggle for Elderly Teachers & Alumni */}
        <div className="flex items-center gap-1 bg-[#36060E] px-2 py-0.5 rounded border border-[#6E0D1B]">
          <Type className="w-3 h-3 text-sky-200 mr-0.5" />
          <span className="text-[10px] text-[#D8C7A5] font-sans mr-1 hidden md:inline">Cỡ chữ:</span>
          <button
            onClick={() => changeFontSize("normal")}
            className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-colors ${
              fontSize === "normal"
                ? "bg-sky-200 text-blue-950"
                : "text-white hover:text-sky-200"
            }`}
            title="Cỡ chữ tiêu chuẩn"
            aria-label="Cỡ chữ bình thường"
          >
            A
          </button>
          <button
            onClick={() => changeFontSize("large")}
            className={`px-1.5 py-0.5 text-[11px] font-bold rounded transition-colors ${
              fontSize === "large"
                ? "bg-sky-200 text-blue-950"
                : "text-white hover:text-sky-200"
            }`}
            title="Cỡ chữ lớn (Thầy cô lớn tuổi)"
            aria-label="Cỡ chữ lớn"
          >
            A+
          </button>
          <button
            onClick={() => changeFontSize("xlarge")}
            className={`px-1.5 py-0.5 text-[12px] font-bold rounded transition-colors ${
              fontSize === "xlarge"
                ? "bg-sky-200 text-blue-950"
                : "text-white hover:text-sky-200"
            }`}
            title="Cỡ chữ rất lớn"
            aria-label="Cỡ chữ rất lớn"
          >
            A++
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <AcademicSeal size={48} variant="shield" className="drop-shadow-sm" />
            </div>
            <div>
              <div className="text-[10px] font-sans tracking-[0.18em] text-blue-800 uppercase font-bold flex items-center gap-1.5">
                <Landmark className="w-3 h-3 text-blue-700" />
                Vàng Danh · Uông Bí · Quảng Ninh
              </div>
              <div className="text-lg md:text-xl font-serif font-bold tracking-tight text-[#1A1615] group-hover:text-blue-800 transition-colors">
                THPT HOÀNG VĂN THỤ
              </div>
            </div>
          </Link>

          {/* Desktop Navigation: 5-Stage Chronological Narrative */}
          <nav className="hidden lg:flex items-center gap-1 font-sans text-[13px] font-medium" aria-label="Thanh điều hướng chính">
            <Link
              href="#timeline"
              className="px-3 py-2 text-[#334155] hover:text-blue-800 hover:bg-blue-50 rounded-sm transition-colors flex items-center gap-1.5 tracking-wide"
            >
              <History className="w-4 h-4 text-blue-700" />
              Lịch sử
            </Link>
            <Link
              href="#media"
              className="px-3 py-2 text-[#334155] hover:text-blue-800 hover:bg-blue-50 rounded-sm transition-colors flex items-center gap-1.5 tracking-wide"
            >
              <Film className="w-4 h-4 text-blue-700" />
              Video & tư liệu
            </Link>
            <Link
              href="#teachers"
              className="px-3 py-2 text-[#334155] hover:text-blue-800 hover:bg-blue-50 rounded-sm transition-colors flex items-center gap-1.5 tracking-wide"
            >
              <Award className="w-4 h-4 text-blue-700" />
              Thế hệ thầy cô
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A4744] hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded"
              aria-label="Mở danh mục điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2.5 shadow-lg">
          <Link
            href="#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-[#1A1615] hover:bg-[#F2ECE1] rounded border-b border-[#E4DCD0]"
          >
            <History className="w-5 h-5 text-blue-700" />
            Lịch sử nhà trường
          </Link>
          <Link
            href="#teachers"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-[#1A1615] hover:bg-[#F2ECE1] rounded border-b border-[#E4DCD0]"
          >
            <Award className="w-5 h-5 text-blue-700" />
            Thế hệ thầy cô
          </Link>
          <Link
            href="#media"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 text-base font-bold bg-blue-900 text-white text-center rounded shadow-sm font-sans tracking-wider uppercase mt-3"
          >
            <Film className="w-5 h-5 text-blue-100" />
            Video & tư liệu
          </Link>
        </div>
      )}
    </header>
    </>
  );
}
