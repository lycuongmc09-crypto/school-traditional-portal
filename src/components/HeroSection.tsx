import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Sparkles, BookMarked, Landmark, Eye } from "lucide-react";
import AcademicSeal from "./AcademicSeal";
import Reveal from "./Reveal";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#E4DCD0] paper-texture">
      {/* Harvard Filigree Corner Ornaments */}
      <div className="absolute top-4 left-4 w-24 h-24 border-t-2 border-l-2 border-[#C29B38]/40 pointer-events-none hidden sm:block">
        <div className="w-3 h-3 border-t border-l border-[#A51C30] m-1"></div>
      </div>
      <div className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 border-[#C29B38]/40 pointer-events-none hidden sm:block">
        <div className="w-3 h-3 border-t border-r border-[#A51C30] m-1 ml-auto"></div>
      </div>
      <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-[#C29B38]/40 pointer-events-none hidden sm:block">
        <div className="w-3 h-3 border-b border-l border-[#A51C30] m-1 mt-auto"></div>
      </div>
      <div className="absolute bottom-4 right-4 w-24 h-24 border-b-2 border-r-2 border-[#C29B38]/40 pointer-events-none hidden sm:block">
        <div className="w-3 h-3 border-b border-r border-[#A51C30] m-1 ml-auto mt-auto"></div>
      </div>

      {/* Subtle Harvard Crimson radial glow in the backdrop */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#A51C30]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Left Editorial Content */}
          <Reveal className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C29B38]/40 text-[#A51C30] text-xs font-sans font-semibold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C29B38] animate-pulse"></span>
              <ShieldCheck className="w-4 h-4 text-[#A51C30]" />
              Không Gian Di Sản Trực Tuyến & Lưu Trữ Động
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-display font-bold tracking-tight text-[#1A1615] leading-[1.12]">
              Nơi Lưu Giữ{" "}
              <span className="relative inline-block text-[#A51C30]">
                Ký Ức Vàng
                <span className="hero-rule absolute left-0 bottom-1 w-full h-[3px] bg-gradient-to-r from-[#C29B38] via-[#DFB15B] to-transparent"></span>
              </span>{" "}
              & Hào Khí Học Đường
            </h1>

            <p className="text-base sm:text-lg text-[#554D49] font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Từ mái trường tranh tre sơ tán thời kỳ 1956 đến biểu tượng giáo dục dẫn đầu hôm nay. Khám phá 70 năm hành trình phụng sự chân lý và tri thức qua hàng ngàn kỷ vật, tư liệu quý báu và câu chuyện thầy trò sống mãi với thời gian.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="#artifacts"
                className="px-6 py-3.5 bg-gradient-to-r from-[#801424] via-[#A51C30] to-[#801424] text-[#FAF7F2] font-sans font-semibold text-sm rounded-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 border border-[#DFB15B]/60 group"
              >
                <Compass className="w-4 h-4 text-[#DFB15B] group-hover:rotate-45 transition-transform duration-300" />
                Tham Quan Phòng Truyền Thống
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#guestbook"
                className="px-6 py-3.5 bg-[#FAF7F2] text-[#1A1615] font-sans font-semibold text-sm rounded-sm border border-[#D8C7A5] hover:border-[#A51C30] hover:text-[#A51C30] hover:bg-white transition-all shadow-sm flex items-center gap-2"
              >
                <BookMarked className="w-4 h-4 text-[#C29B38]" />
                Ghi Danh Sổ Vàng Lưu Bút
              </Link>
            </div>

            {/* Archival Metrics Counter */}
            <div className="pt-8 border-t border-[#E4DCD0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div className="p-3 bg-[#FAF7F2]/80 border border-[#E8DEC9] rounded-sm card-lift">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#A51C30]">70+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#665E5A] font-sans mt-0.5 font-medium">
                  Năm Lịch Sử (1956)
                </div>
              </div>
              <div className="p-3 bg-[#FAF7F2]/80 border border-[#E8DEC9] rounded-sm card-lift">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#A51C30]">45.000+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#665E5A] font-sans mt-0.5 font-medium">
                  Cựu Học Sinh Toàn Cầu
                </div>
              </div>
              <div className="p-3 bg-[#FAF7F2]/80 border border-[#E8DEC9] rounded-sm card-lift">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#A51C30]">1.200+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#665E5A] font-sans mt-0.5 font-medium">
                  Kỷ Vật & Bảng Vàng
                </div>
              </div>
              <div className="p-3 bg-[#FAF7F2]/80 border border-[#E8DEC9] rounded-sm card-lift">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C29B38]">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#665E5A] font-sans mt-0.5 font-medium">
                  Số Hóa Tiêu Chuẩn
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Museum Vitrine Feature Card */}
          <Reveal className="lg:col-span-5" delay={1}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Halo Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[#C29B38] via-[#801424] to-[#DFB15B] rounded-sm opacity-35 blur-sm"></div>

              {/* Main Vitrine Display Frame */}
              <div className="relative bg-[#FAF7F2] border-2 border-[#C29B38] rounded-sm p-6 sm:p-7 shadow-2xl overflow-hidden card-lift float-gently">
                {/* Vintage Watermark Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#DFB15B]/15 to-transparent pointer-events-none"></div>

                {/* Seal & Heading */}
                <div className="flex items-center justify-between pb-5 border-b border-[#E4DCD0]">
                  <div className="flex items-center gap-3">
                    <AcademicSeal size={42} variant="shield" />
                    <div>
                      <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#C29B38] block">
                        Thông Điệp Di Sản
                      </span>
                      <h3 className="text-base font-display font-bold text-[#1A1615]">
                        Ban Giám Hiệu & Hội Cựu Giáo Chức
                      </h3>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C29B38] flex items-center justify-center text-[#A51C30]">
                    <Sparkles className="w-4 h-4 text-[#C29B38]" />
                  </div>
                </div>

                {/* Museum Showcase Item Preview inside card */}
                <div className="my-5 relative rounded-sm overflow-hidden border border-[#D8C7A5] shadow-inner group">
                  <div className="relative h-48 bg-[#2A050A] flex items-center justify-center overflow-hidden">
                    {/* Simulated Museum Ambient Lighting */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(194,155,56,0.35)_0%,rgba(42,5,10,0.95)_70%)]"></div>
                    
                    {/* Glass Specular Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

                    {/* Artifact Visual Representation */}
                    <div className="relative z-10 text-center px-4">
                      <div className="inline-block p-3.5 rounded-full bg-[#4E0A14] border-2 border-[#DFB15B] shadow-[0_0_15px_rgba(223,177,91,0.4)] mb-2">
                        <Landmark className="w-8 h-8 text-[#DFB15B]" />
                      </div>
                      <div className="font-serif font-bold text-white text-base tracking-wide drop-shadow">
                        Tiếng Chuông Đồng Kháng Chiến (1956)
                      </div>
                      <div className="text-[11px] font-sans text-[#DFB15B] tracking-wider uppercase mt-0.5">
                        Bảo Vật Khởi Nguyên Của Trường
                      </div>
                    </div>

                    {/* View Button Overlay on hover */}
                    <Link
                      href="#artifacts"
                      className="absolute inset-0 bg-[#4E0A14]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-sans text-xs font-semibold z-20 backdrop-blur-xs"
                    >
                      <Eye className="w-4 h-4 text-[#DFB15B]" />
                      Xem Chi Tiết Hiện Vật Này
                    </Link>
                  </div>

                  {/* Brass Plaque Nameplate at bottom of showcase */}
                  <div className="brass-plaque px-3.5 py-1.5 flex items-center justify-between text-[11px] font-serif font-bold tracking-wider">
                    <span>MÃ SỐ DI SẢN: HV-1956-01</span>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#4E0A14]">
                      ĐÃ GIÁM ĐỊNH
                    </span>
                  </div>
                </div>

                {/* Excerpt Quote */}
                <div className="space-y-3">
                  <p className="font-serif italic text-sm text-[#443C38] leading-relaxed border-l-2 border-[#C29B38] pl-3.5 py-0.5">
                    &ldquo;Mỗi hiện vật nằm lại trong phòng truyền thống này không phải là kỷ niệm đóng bụi của thời gian, mà là ngọn lửa cháy bỏng về khát vọng vươn lên, danh dự và lòng biết ơn của mỗi thế hệ người học trò.&rdquo;
                  </p>
                </div>

                {/* Card Footer Banner */}
                <div className="mt-5 pt-3.5 border-t border-[#E4DCD0] flex items-center justify-between text-xs font-sans text-[#665E5A]">
                  <span className="font-medium text-[#A51C30] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    Cổng Dữ Liệu Đang Mở 24/7
                  </span>
                  <span className="font-serif italic text-[#C29B38] font-semibold">
                    Veritas et Scientia
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
