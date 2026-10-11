"use client";

import { useState } from "react";
import { HeartHandshake, UploadCloud, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

export default function ContributeSection() {
  const [formData, setFormData] = useState({
    title: "",
    donor: "",
    year: "",
    room: "Gian Tiếp Nhận Số Hóa Mới",
    description: "",
    tags: "Kỷ vật đóng góp, Cựu học sinh",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ title: string; donor: string; year: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmittedData(null);

    try {
      const res = await fetch("/api/artifacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Có lỗi xảy ra khi gửi thông tin hiện vật");
      }

      setSubmittedData({
        title: formData.title,
        donor: formData.donor,
        year: formData.year || "Lưu trữ số",
      });

      setFormData({
        title: "",
        donor: "",
        year: "",
        room: "Gian Tiếp Nhận Số Hóa Mới",
        description: "",
        tags: "Kỷ vật đóng góp, Cựu học sinh",
        imageUrl: "",
      });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contribute" className="py-20 md:py-28 border-b border-[#E4DCD0] bg-[#F4EEE3]/70 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-[#C29B38] rounded-sm p-8 sm:p-12 shadow-vitrine relative overflow-hidden">
          {/* Top academic decorative accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4E0A14] via-[#C29B38] to-[#801424]"></div>

          <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.2em] uppercase text-[#A51C30]">
              <HeartHandshake className="w-4 h-4 text-[#C29B38]" />
              Chặng 5: Đóng Góp Kỷ Vật & Đồng Hành
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1615]">
              Hiến Tặng Tư Liệu & Kỷ Vật Nhà Trường
            </h2>
            <div className="w-20 h-0.5 bg-[#C29B38] mx-auto my-2"></div>
            <p className="text-sm sm:text-base font-serif text-[#4A4441] leading-relaxed">
              Mỗi bức ảnh cũ, một cuốn vở vàng úa, hay chiếc huy hiệu năm xưa đều là mảnh ghép vô giá tôn tạo nên bức tranh lịch sử hào hùng của mái trường.
            </p>
          </div>

          {/* Micro-interaction: Academic Certificate of Receipt */}
          {submittedData && (
            <div className="mb-8 p-6 bg-[#FAF7F2] border-2 border-[#C29B38] rounded-sm relative overflow-hidden shadow-academic animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="wax-seal shrink-0">
                  <span className="text-[8px] tracking-widest opacity-80">DI SẢN</span>
                  <span className="text-sm font-black tracking-tighter">LQĐ</span>
                  <span className="text-[8px] tracking-wider opacity-85">TIẾP NHẬN</span>
                </div>
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-sans font-bold text-[#A51C30] uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Chứng nhận tiếp nhận kỷ vật thành công
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#1A1615]">
                    &ldquo;{submittedData.title}&rdquo;
                  </h4>
                  <p className="text-xs font-serif text-[#4A4441] leading-relaxed">
                    Trân trọng ghi nhận đóng góp từ quý vị <strong>{submittedData.donor}</strong> ({submittedData.year}). Hồ sơ hiện vật đã được số hóa tức thì và lưu trữ trong bộ sưu tập chung của nhà trường.
                  </p>
                </div>
                <button
                  onClick={() => setSubmittedData(null)}
                  className="px-4 py-2 bg-white border border-[#D5CCC1] text-xs font-sans font-semibold rounded-sm hover:border-[#A51C30] hover:text-[#A51C30] transition-colors shrink-0"
                >
                  Đóng góp thêm
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 font-sans text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ct-title" className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                  Tên hiện vật / Tên tài liệu kỷ niệm <span className="text-[#A51C30]">*</span>
                </label>
                <input
                  id="ct-title"
                  name="title"
                  type="text"
                  required
                  placeholder="Ví dụ: Bằng khen học sinh giỏi năm 1975, Huy hiệu đoàn…"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                />
              </div>

              <div>
                <label htmlFor="ct-donor" className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                  Người trao tặng / Khóa học / Đơn vị <span className="text-[#A51C30]">*</span>
                </label>
                <input
                  id="ct-donor"
                  name="donor"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ví dụ: Cựu học sinh Nguyễn Thu Hằng (Lớp 12A 1995)…"
                  value={formData.donor}
                  onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                  Năm lưu hành / Niên đại ước tính
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 1985, Thập niên 90..."
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                  Gian phòng đề xuất trưng bày
                </label>
                <select
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                >
                  <option value="Gian Tiếp Nhận Số Hóa Mới">Gian Tiếp Nhận Số Hóa Mới</option>
                  <option value="Gian Trưng Bày Thời Kháng Chiến">Gian Trưng Bày Thời Kháng Chiến</option>
                  <option value="Phòng Thành Tựu & Bảng Vàng">Phòng Thành Tựu & Bảng Vàng</option>
                  <option value="Thư Viện & Báo Tường Truyền Thống">Thư Viện & Báo Tường Truyền Thống</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                  Từ khóa phân loại (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Báo tường, Học sinh giỏi, Khóa 1985..."
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                  Đường dẫn ảnh trực tuyến (URL ảnh minh họa)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... (để trống nếu dùng ảnh mặc định)"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4441] mb-1">
                Câu chuyện & Ý nghĩa lịch sử của hiện vật <span className="text-[#A51C30]">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Kể lại hoàn cảnh kỷ vật được lưu giữ, gắn với thầy cô, bạn bè hoặc sự kiện đáng nhớ nào của trường..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5CCC1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#A51C30] focus:border-transparent text-[#1A1615] font-serif resize-none leading-relaxed transition-all"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE3D6]">
              <div className="flex items-center gap-2 text-xs text-[#665E5A]">
                <ShieldCheck className="w-4 h-4 text-[#A51C30] shrink-0" />
                Dữ liệu chuẩn hóa Unicode UTF-8, xác thực bảo mật và lưu trữ vĩnh viễn trên thư viện số.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#801424] to-[#A51C30] hover:from-[#4E0A14] hover:to-[#801424] text-white font-semibold rounded-sm transition-all shadow-md flex items-center justify-center gap-2 border border-[#6E0D1B] disabled:opacity-50 cursor-pointer active:scale-[0.99]"
              >
                <UploadCloud className="w-4 h-4 text-[#DFB15B]" />
                {loading ? "Đang số hóa hồ sơ..." : "Xác Nhận Đóng Góp Kỷ Vật"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
