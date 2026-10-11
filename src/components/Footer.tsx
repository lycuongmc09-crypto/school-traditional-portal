import Link from "next/link";
import { ArrowUp, MapPin } from "lucide-react";
import AcademicSeal from "./AcademicSeal";

export default function Footer() {
  return (
    <footer className="bg-[#1A1615] text-[#D8C7A5] font-sans border-t-4 border-[#A51C30] relative">
      {/* Top Footer with School Crest / Motto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <AcademicSeal size={50} variant="shield" className="drop-shadow-md" />
              <div>
                <div className="text-[11px] font-bold tracking-[0.2em] text-[#DFB15B] uppercase font-sans">
                  Di Sản & Truyền Thống Học Đường
                </div>
                <div className="text-lg font-serif font-bold text-[#FAF7F2]">
                  TRƯỜNG THPT HOÀNG VĂN THỤ
                </div>
              </div>
            </div>

            <p className="text-sm font-sans text-[#A89E94] leading-relaxed max-w-sm">
              Không gian số lưu giữ những dấu mốc, thành tích và câu chuyện của thầy trò Trường THPT Hoàng Văn Thụ, Vàng Danh, Quảng Ninh.
            </p>

            <div className="pt-2 text-xs text-[#DFB15B] font-serif italic tracking-wide">
              &ldquo;Tự hào truyền thống • Vững bước tương lai&rdquo;
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF7F2] border-b border-[#38322F] pb-2 font-sans">
              Các Gian Trưng Bày Số
            </h4>
            <ul className="space-y-2 text-sm text-[#A89E94]">
              <li>
                <Link href="#timeline" className="hover:text-[#DFB15B] transition-colors">
                  • Lịch sử nhà trường từ năm 1979
                </Link>
              </li>
              <li>
                <Link href="#tribute" className="hover:text-[#DFB15B] transition-colors">
                  • Tiểu sử đồng chí Hoàng Văn Thụ
                </Link>
              </li>
              <li>
                <Link href="#teachers" className="hover:text-[#DFB15B] transition-colors">
                  • Thành tích nhà trường
                </Link>
              </li>
              <li>
                <Link href="#media" className="hover:text-[#DFB15B] transition-colors">
                  • Video & tư liệu học tập
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF7F2] border-b border-[#38322F] pb-2 font-sans">
              Ban Quản Trị Di Sản & Thư Viện
            </h4>
            <div className="space-y-2.5 text-sm text-[#A89E94]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFB15B] shrink-0 mt-0.5" />
                <span>Tổ 1, Khu phố Vàng Danh 3, Phường Vàng Danh, tỉnh Quảng Ninh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#38322F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#786E68] gap-4 font-sans">
          <div>
            © Trường THPT Hoàng Văn Thụ, Vàng Danh, Quảng Ninh. Website tư liệu đang được hoàn thiện cùng nhà trường.
          </div>
          <Link
            href="#"
            className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1 text-[#DFB15B] font-semibold"
          >
            Về đầu trang <ArrowUp className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
