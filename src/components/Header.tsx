"use client";

import Link from "next/link";
import { BookOpen, Award, Compass, HeartHandshake, History, Menu, X, Landmark, Type } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E4DCD0] shadow-sm transition-all">
      {/* Scroll Progress Bar */}
      <div
        className="h-1 bg-gradient-to-r from-[#801424] via-[#C29B38] to-[#A51C30] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Top Banner: Harvard style motto ribbon */}
      <div className="bg-[#4E0A14] text-[#F5EFE6] text-[11px] py-1.5 px-4 tracking-[0.2em] text-center uppercase font-sans border-b border-[#3B070E] flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2 text-[#DFB15B] text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DFB15B] shadow-[0_0_6px_#DFB15B]"></span>
          <span>EST. 1956 • HÀNH TRÌNH 70 NĂM TRI THỨC</span>
        </div>

        <div className="flex-1 text-center font-semibold text-[#EFE8DA] tracking-wider text-[11px] sm:text-xs">
          VERITAS ET SCIENTIA • PHÒNG TRUYỀN THỐNG TRƯỜNG THPT CHUYÊN LÊ QUÝ ĐÔN
        </div>

        {/* Accessibility Font Size Toggle for Elderly Teachers & Alumni */}
        <div className="flex items-center gap-1 bg-[#36060E] px-2 py-0.5 rounded border border-[#6E0D1B]">
          <Type className="w-3 h-3 text-[#DFB15B] mr-0.5" />
          <span className="text-[10px] text-[#D8C7A5] font-sans mr-1 hidden md:inline">Cỡ chữ:</span>
          <button
            onClick={() => changeFontSize("normal")}
            className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-colors ${
              fontSize === "normal"
                ? "bg-[#C29B38] text-[#1A1615]"
                : "text-[#EFE8DA] hover:text-[#DFB15B]"
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
                ? "bg-[#C29B38] text-[#1A1615]"
                : "text-[#EFE8DA] hover:text-[#DFB15B]"
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
                ? "bg-[#C29B38] text-[#1A1615]"
                : "text-[#EFE8DA] hover:text-[#DFB15B]"
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
              <div className="text-[10px] font-sans tracking-[0.25em] text-[#A51C30] uppercase font-bold flex items-center gap-1.5">
                <Landmark className="w-3 h-3 text-[#C29B38]" />
                Không Gian Di Sản & Bảo Tàng Số
              </div>
              <div className="text-lg md:text-xl font-serif font-bold tracking-tight text-[#1A1615] group-hover:text-[#A51C30] transition-colors">
                THPT CHUYÊN LÊ QUÝ ĐÔN
              </div>
            </div>
          </Link>

          {/* Desktop Navigation: 5-Stage Chronological Narrative */}
          <nav className="hidden lg:flex items-center space-x-1 font-sans text-[13px] font-medium" aria-label="Thanh điều hướng chính">
            <Link
              href="#timeline"
              className="px-3 py-2 text-[#4A4441] hover:text-[#A51C30] hover:bg-[#F2ECE1] rounded-sm transition-colors flex items-center gap-1.5 tracking-wide"
            >
              <History className="w-4 h-4 text-[#A51C30]" />
              1. Biên Niên Sử
            </Link>
            <Link
              href="#artifacts"
              className="px-3 py-2 text-[#4A4441] hover:text-[#A51C30] hover:bg-[#F2ECE1] rounded-sm transition-colors flex items-center gap-1.5 tracking-wide"
            >
              <Compass className="w-4 h-4 text-[#A51C30]" />
              2. Hiện Vật Tiêu Biểu
            </Link>
            <Link
              href="#teachers"
              className="px-3 py-2 text-[#4A4441] hover:text-[#A51C30] hover:bg-[#F2ECE1] rounded-sm transition-colors flex items-center gap-1.5 tracking-wide"
            >
              <Award className="w-4 h-4 text-[#A51C30]" />
              3. Thầy Cô Khai Phá
            </Link>
            <Link
              href="#guestbook"
              className="px-3 py-2 text-[#4A4441] hover:text-[#A51C30] hover:bg-[#F2ECE1] rounded-sm transition-colors flex items-center gap-1.5 tracking-wide"
            >
              <BookOpen className="w-4 h-4 text-[#A51C30]" />
              4. Sổ Vàng Lưu Bút
            </Link>

            <Link
              href="#contribute"
              className="ml-2 px-3.5 py-2 bg-gradient-to-r from-[#801424] to-[#A51C30] text-[#FAF7F2] rounded-sm text-xs font-semibold tracking-wider uppercase hover:from-[#4E0A14] hover:to-[#801424] transition-all shadow-sm flex items-center gap-1.5 border border-[#C29B38]/50"
            >
              <HeartHandshake className="w-4 h-4 text-[#DFB15B]" />
              5. Đóng Góp Kỷ Vật
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A4441] hover:text-[#1A1615] focus:outline-none focus:ring-2 focus:ring-[#A51C30] rounded"
              aria-label="Mở danh mục điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E4DCD0] px-4 pt-3 pb-6 space-y-2.5 shadow-lg">
          <Link
            href="#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-[#1A1615] hover:bg-[#F2ECE1] rounded border-b border-[#E4DCD0]"
          >
            <History className="w-5 h-5 text-[#A51C30]" />
            1. Biên Niên Sử (Mốc Son Lịch Sử)
          </Link>
          <Link
            href="#artifacts"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-[#1A1615] hover:bg-[#F2ECE1] rounded border-b border-[#E4DCD0]"
          >
            <Compass className="w-5 h-5 text-[#A51C30]" />
            2. Hiện Vật Tiêu Biểu & Kỷ Vật
          </Link>
          <Link
            href="#teachers"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-[#1A1615] hover:bg-[#F2ECE1] rounded border-b border-[#E4DCD0]"
          >
            <Award className="w-5 h-5 text-[#A51C30]" />
            3. Thầy Cô Khai Phá & Danh Sư
          </Link>
          <Link
            href="#guestbook"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-[#1A1615] hover:bg-[#F2ECE1] rounded border-b border-[#E4DCD0]"
          >
            <BookOpen className="w-5 h-5 text-[#A51C30]" />
            4. Sổ Vàng Lưu Bút Đồng Môn
          </Link>
          <Link
            href="#contribute"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 text-base font-bold bg-[#A51C30] text-[#FAF7F2] text-center rounded shadow-sm font-serif tracking-wider uppercase mt-3"
          >
            <HeartHandshake className="w-5 h-5 text-[#DFB15B]" />
            5. Hiến Tặng Kỷ Vật Trực Tuyến
          </Link>
        </div>
      )}
    </header>
  );
}

