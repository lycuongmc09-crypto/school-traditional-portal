"use client";

import { useState } from "react";
import { GuestbookEntry } from "@/lib/types";
import { BookOpen, Send, MessageSquareQuote, CheckCircle2, Sparkles, AlertCircle, Heart } from "lucide-react";
import Reveal from "./Reveal";

export default function GuestbookSection({ initialEntries }: { initialEntries: GuestbookEntry[] }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [formData, setFormData] = useState({
    name: "",
    alumniClass: "",
    role: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successEntry, setSuccessEntry] = useState<GuestbookEntry | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessEntry(null);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Có lỗi xảy ra khi lưu sổ vàng");
      }

      setEntries([data.entry, ...entries]);
      setSuccessEntry(data.entry);
      setFormData({ name: "", alumniClass: "", role: "", message: "" });
    } catch (err: unknown) {
      setErrorMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="guestbook" className="py-20 md:py-28 border-b border-[#E4DCD0] bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.2em] uppercase text-[#A51C30]">
            <BookOpen className="w-4 h-4 text-[#C29B38]" />
            Chặng 4: Sổ Vàng Tri Ân Đồng Môn
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1A1615]">
            Lưu Bút Các Thế Hệ Thầy Trò
          </h2>
          <div className="w-24 h-0.5 bg-[#C29B38] mx-auto my-3"></div>
          <p className="text-base sm:text-lg text-[#4A4441] font-serif leading-relaxed">
            Hàng ngàn thế hệ học trò đã bay cao bay xa từ mái trường này. Hãy khắc ghi một dòng tâm sự, tri ân thầy cô và gửi gắm ước vọng tới tương lai.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form: Write to Guestbook with Wax Seal Micro-interaction */}
          <Reveal className="lg:col-span-5 bg-white border-2 border-[#E4DCD0] rounded-sm p-6 sm:p-8 shadow-academic relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4E0A14] via-[#C29B38] to-[#A51C30]"></div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C29B38]" />
                <h3 className="text-xl font-serif font-bold text-[#1A1615]">
                  Ghi Dấu Ký Ức Vào Sổ Vàng
                </h3>
              </div>
              <span className="text-[11px] font-sans text-[#8C827A] uppercase tracking-wider font-semibold">
                Lưu Trữ Vĩnh Viễn
              </span>
            </div>

            {/* Micro-interaction: Traditional Red Wax Seal on Success */}
            {successEntry && (
              <div className="mb-6 p-5 bg-[#FAF7F2] border-2 border-[#C29B38] rounded-sm relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 pt-1">
                    <div className="wax-seal" title="Dấu ấn niêm phong sổ vàng truyền thống">
                      <span className="text-[9px] tracking-widest opacity-80">VERITAS</span>
                      <span className="text-xs font-black tracking-tighter">LQĐ</span>
                      <span className="text-[8px] tracking-wider opacity-85">LƯU BÚT</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-[#A51C30] uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Niêm phong sổ vàng thành công!
                    </div>
                    <p className="text-xs font-serif text-[#2B2625] leading-relaxed">
                      Ký ức của <strong>{successEntry.name}</strong> ({successEntry.alumniClass || "Cựu học sinh"}) đã được trân trọng đóng dấu vào trang nhất của Sổ Vàng Truyền Thống.
                    </p>
                    <button
                      onClick={() => setSuccessEntry(null)}
                      className="text-[11px] font-sans text-[#A51C30] font-semibold underline hover:text-[#801424] pt-1 block"
                    >
                      Viết thêm lời chúc khác →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-sm flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div>
                <label htmlFor="gb-name" className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                  Họ và tên quý vị / cựu học sinh <span className="text-[#A51C30]">*</span>
                </label>
                <input
                  id="gb-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ví dụ: GS. Nguyễn Văn An, Thạc sĩ Lê Hà Linh…"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gb-class" className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                    Niên khóa / Lớp học
                  </label>
                  <input
                    id="gb-class"
                    name="alumniClass"
                    type="text"
                    placeholder="Ví dụ: Khóa 1998 - 2001…"
                    value={formData.alumniClass}
                    onChange={(e) => setFormData({ ...formData, alumniClass: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="gb-role" className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                    Đơn vị công tác / Vị trí
                  </label>
                  <input
                    id="gb-role"
                    name="role"
                    type="text"
                    placeholder="Ví dụ: Cựu sinh viên, Kỹ sư…"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="gb-message" className="block text-xs font-bold uppercase tracking-wider text-[#4A4441]">
                    Nội dung lưu bút / Lời tri ân <span className="text-[#A51C30]">*</span>
                  </label>
                  <span className="text-[11px] text-[#8C827A]">{formData.message.length} ký tự</span>
                </div>
                <textarea
                  id="gb-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Chia sẻ kỷ niệm thời áo trắng dưới mái trường, lời tri ấn thầy cô hoặc lời chúc tới các thế hệ đàn em mai sau..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] font-serif resize-none leading-relaxed transition-all"
                ></textarea>
              </div>

              {/* Instant Live Preview of the Signature Plaque */}
              {formData.message && (
                <div className="p-3.5 bg-[#F4EEE3] rounded-sm border border-[#E4DCD0] space-y-1 text-xs">
                  <div className="font-sans font-bold text-[#A51C30] uppercase text-[10px] tracking-widest flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#C29B38]" /> Xem trước chữ ký lưu bút:
                  </div>
                  <p className="font-serif italic text-[#38322F] line-clamp-2 leading-relaxed">
                    &ldquo;{formData.message}&rdquo;
                  </p>
                  <div className="text-[11px] text-[#665E5A] font-sans">
                    — {formData.name || "Quý đồng môn"}{formData.alumniClass ? ` (${formData.alumniClass})` : ""}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#801424] to-[#A51C30] hover:from-[#4E0A14] hover:to-[#801424] text-white font-semibold rounded-sm transition-all shadow-md flex items-center justify-center gap-2 border border-[#6E0D1B] disabled:opacity-50 cursor-pointer active:scale-[0.99]"
              >
                <Send className="w-4 h-4 text-[#DFB15B]" />
                {loading ? "Đang ghi dấu vào sổ vàng..." : "Đóng Dấu & Lưu Bút Ngay"}
              </button>
            </form>
          </Reveal>

          {/* Right Feed: Guestbook Entries */}
          <Reveal className="lg:col-span-7 space-y-6" delay={1}>
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DCD0]">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#665E5A]">
                Tổng cộng <strong>{entries.length}</strong> dòng lưu bút đã được số hóa
              </span>
              <span className="text-xs font-sans text-[#A51C30] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Thời gian thực
              </span>
            </div>

            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-[#E4DCD0] rounded-sm p-6 shadow-sm hover:border-[#C29B38] hover:shadow-md transition-all relative group"
                >
                  <MessageSquareQuote className="w-8 h-8 text-[#EAE3D6] group-hover:text-[#C29B38]/40 transition-colors absolute top-4 right-4 -z-0" />

                  <div className="relative z-10">
                    <p className="font-serif italic text-base text-[#2E2C2A] leading-relaxed mb-4">
                      &ldquo;{entry.message}&rdquo;
                    </p>

                    <div className="flex items-center justify-between text-xs font-sans pt-3 border-t border-[#F0EAE2]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#A51C30] flex items-center justify-center text-[#A51C30] font-serif font-bold">
                          {entry.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-[#1A1615]">{entry.name}</div>
                          <div className="text-[#665E5A]">
                            {entry.alumniClass && <span className="font-medium text-[#A51C30]">{entry.alumniClass}</span>}
                            {entry.alumniClass && entry.role && <span> • </span>}
                            {entry.role && <span>{entry.role}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#8C827A] font-mono">
                        {entry.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
