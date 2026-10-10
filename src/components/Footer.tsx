import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
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
                  TRƯỜNG THPT CHUYÊN LÊ QUÝ ĐÔN
                </div>
              </div>
            </div>

            <p className="text-sm font-sans text-[#A89E94] leading-relaxed max-w-sm">
              Không gian số lưu trữ và tri ân hơn 70 năm vẻ vang của mái trường (1956 - 2026). Nơi kết nối trái tim của các thế hệ học sinh, giáo viên trên khắp mọi miền Tổ quốc và thế giới.
            </p>

            <div className="pt-2 text-xs text-[#DFB15B] font-serif italic tracking-wide">
              &ldquo;Veritas et Scientia • Chân lý và Tri thức trường tồn&rdquo;
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
                  • Biên niên sử 1956 - 2026
                </Link>
              </li>
              <li>
                <Link href="#artifacts" className="hover:text-[#DFB15B] transition-colors">
                  • Bảo tàng hiện vật & kỷ vật
                </Link>
              </li>
              <li>
                <Link href="#teachers" className="hover:text-[#DFB15B] transition-colors">
                  • Bảng vàng danh sư tri ân
                </Link>
              </li>
              <li>
                <Link href="#guestbook" className="hover:text-[#DFB15B] transition-colors">
                  • Sổ vàng đồng môn trực tuyến
                </Link>
              </li>
              <li>
                <Link href="#contribute" className="hover:text-[#DFB15B] transition-colors">
                  • Hiến tặng kỷ vật & tư liệu
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
                <span>Phòng Truyền Thống, Tầng 3 Nhà Hiệu Bộ, Trường THPT Chuyên Lê Quý Đôn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFB15B] shrink-0" />
                <span>(024) 3856.7899 • Ban Lưu Trữ Số</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFB15B] shrink-0" />
                <span>phongtruyenthong@lequydon.edu.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#38322F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#786E68] gap-4 font-sans">
          <div>
            © 1956 - 2026 Trường THPT Chuyên Lê Quý Đôn. Chuẩn thiết kế Harvard University Academic Editorial & Museum Showcase.
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
