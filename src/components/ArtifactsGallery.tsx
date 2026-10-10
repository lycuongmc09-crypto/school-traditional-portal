"use client";

import { useState } from "react";
import { Artifact, ArtifactCategory, ARTIFACT_CATEGORIES } from "@/lib/types";
import {
  Compass,
  Search,
  Eye,
  MapPin,
  Calendar,
  Heart,
  Tag,
  Share2,
  FolderOpen,
} from "lucide-react";

interface ArtifactsGalleryProps {
  initialArtifacts: Artifact[];
}

export default function ArtifactsGallery({ initialArtifacts }: ArtifactsGalleryProps) {
  const [artifacts, setArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Extract all unique tags
  const allTags = ["Tất cả", ...Array.from(new Set(artifacts.flatMap((a) => a.tags || [])))];

  // Vietnamese accent insensitive search & filter
  const filteredArtifacts = artifacts.filter((item) => {
    // Only show approved
    if (item.status && item.status !== "approved") return false;

    // Filter by Category
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;

    // Filter by Tag
    const matchesTag = selectedTag === "Tất cả" || (item.tags && item.tags.includes(selectedTag));

    // Filter by Search Query
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.donor.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

    return matchesCategory && matchesTag && matchesSearch;
  });

  const handleOpenArtifact = async (item: Artifact) => {
    setSelectedArtifact(item);

    // Call API to increment view count
    try {
      const res = await fetch("/api/artifacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, action: "view" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.artifact) {
          setArtifacts((prev) =>
            prev.map((a) => (a.id === item.id ? { ...a, viewCount: data.artifact.viewCount } : a))
          );
          setSelectedArtifact((prev) =>
            prev && prev.id === item.id ? { ...prev, viewCount: data.artifact.viewCount } : prev
          );
        }
      }
    } catch {
      // Silently continue
    }
  };

  const handleLikeArtifact = async (e: React.MouseEvent, item: Artifact) => {
    e.stopPropagation();
    if (likedMap[item.id]) return;

    setLikedMap((prev) => ({ ...prev, [item.id]: true }));

    // Optimistic UI update
    setArtifacts((prev) =>
      prev.map((a) => (a.id === item.id ? { ...a, likeCount: (a.likeCount || 0) + 1 } : a))
    );
    if (selectedArtifact && selectedArtifact.id === item.id) {
      setSelectedArtifact((prev) =>
        prev ? { ...prev, likeCount: (prev.likeCount || 0) + 1 } : null
      );
    }

    try {
      await fetch("/api/artifacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, action: "like" }),
      });
    } catch {
      // Revert if error
    }
  };

  const getCategoryName = (catId?: ArtifactCategory) => {
    const found = ARTIFACT_CATEGORIES.find((c) => c.id === catId);
    return found ? found.name : "Hiện vật lưu trữ";
  };

  return (
    <section id="artifacts" className="py-20 md:py-28 border-b border-[#E5DED6] bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-widest uppercase text-[#A51C30]">
            <Compass className="w-4 h-4 text-[#C29B38]" />
            Bảo Tàng & Bộ Sưu Tập Kỷ Vật Số
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E1E1E]">
            Hiện Vật & Chứng Nhân Thời Gian
          </h2>
          <div className="w-24 h-0.5 bg-[#C29B38] mx-auto my-3"></div>
          <p className="text-base sm:text-lg text-[#5C5856] font-serif">
            Hàng trăm tài liệu gốc, hiện vật lịch sử, cờ thi đua và kỷ vật thiêng liêng được số hóa
            để gìn giữ trọn vẹn tinh hoa học hiệu.
          </p>
        </div>

        {/* Category Tab Filter */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-sm shrink-0 transition-all ${
              selectedCategory === "all"
                ? "bg-[#A51C30] text-white shadow-sm"
                : "bg-white text-[#5C5856] border border-[#E5DED6] hover:border-[#A51C30] hover:text-[#A51C30]"
            }`}
          >
            Tất cả danh mục ({artifacts.length})
          </button>
          {ARTIFACT_CATEGORIES.map((cat) => {
            const count = artifacts.filter((a) => a.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-sm shrink-0 transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-[#A51C30] text-white shadow-sm"
                    : "bg-white text-[#5C5856] border border-[#E5DED6] hover:border-[#A51C30] hover:text-[#A51C30]"
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="bg-white border border-[#E5DED6] rounded-sm p-4 sm:p-6 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#736E6A] absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo tên kỷ vật, người trao tặng, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#D5CCC1] rounded-sm text-sm font-sans focus:outline-none focus:border-[#A51C30] text-[#1E1E1E]"
              />
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-sans font-semibold tracking-wide transition-all ${
                    selectedTag === tag
                      ? "bg-[#C29B38] text-white shadow-sm"
                      : "bg-[#FAF8F5] text-[#5C5856] border border-[#E5DED6] hover:border-[#C29B38] hover:text-[#C29B38]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtifacts.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF7F2] border border-[#D8C7A5] rounded-sm overflow-hidden shadow-sm hover:shadow-vitrine-hover hover:border-[#C29B38] transition-all duration-300 group flex flex-col cursor-pointer hover:-translate-y-1 relative"
              onClick={() => handleOpenArtifact(item)}
            >
              {/* Image Frame with museum caption overlay and vitrine lighting */}
              <div className="relative h-64 w-full overflow-hidden bg-[#2A050A]">
                {/* Museum spotlight radial highlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(194,155,56,0.25)_0%,rgba(42,5,10,0.85)_75%)] pointer-events-none z-10"></div>
                {/* Glass reflection gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10"></div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 z-20 bg-[#1A1615]/85 backdrop-blur-sm text-[#FAF7F2] text-xs font-sans px-2.5 py-1 rounded-xs flex items-center gap-1.5 border border-[#C29B38]/60 shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-[#DFB15B]" />
                  <span>Năm {item.year}</span>
                </div>

                <div className="absolute top-3 right-3 z-20 bg-[#801424]/90 text-[#FAF7F2] text-[10px] font-sans font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider border border-[#DFB15B]/30 shadow-sm">
                  {getCategoryName(item.category)}
                </div>
              </div>

              {/* Brass-style nameplate border divider */}
              <div className="brass-plaque px-3.5 py-1 text-[10px] font-serif font-bold tracking-wider flex items-center justify-between">
                <span>HIỆN VẬT LƯU TRỮ #{item.id}</span>
                <span className="text-[9px] font-sans font-semibold uppercase tracking-widest text-[#4E0A14]">
                  ĐÃ GIÁM ĐỊNH
                </span>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#FAF7F2]">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-sans text-[#665E5A] mb-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#A51C30]" />
                    <span>{item.room}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1A1615] group-hover:text-[#A51C30] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm font-sans text-[#554D49] line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4DCD0] flex items-center justify-between text-xs font-sans text-[#665E5A]">
                  <div>
                    <span className="font-semibold text-[#1A1615]">Trao tặng:</span> {item.donor}
                  </div>

                  {/* Interaction Stats */}
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1" title="Lượt xem">
                      <Eye className="w-3.5 h-3.5 text-[#665E5A]" />
                      {item.viewCount || 0}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleLikeArtifact(e, item)}
                      className={`flex items-center gap-1 hover:text-[#A51C30] transition-colors ${
                        likedMap[item.id] ? "text-[#A51C30] font-bold" : ""
                      }`}
                      title="Yêu thích"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          likedMap[item.id] ? "fill-[#A51C30] text-[#A51C30]" : ""
                        }`}
                      />
                      {item.likeCount || 0}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtifacts.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#E5DED6] rounded-sm">
            <Compass className="w-12 h-12 text-[#C29B38] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-serif font-bold text-[#1E1E1E]">Không tìm thấy hiện vật</h3>
            <p className="text-sm text-[#736E6A] font-sans mt-1">
              Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn &quot;Tất cả danh mục&quot;.
            </p>
          </div>
        )}
      </div>

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-3xl w-full border border-[#C29B38] rounded-sm shadow-2xl overflow-hidden relative">
            {/* Modal Header */}
            <div className="bg-[#A51C30] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#C29B38]" />
                <span className="text-xs font-sans tracking-widest text-[#E5DED6] uppercase font-bold">
                  Bản Ghi Hiện Vật Số • {getCategoryName(selectedArtifact.category)}
                </span>
              </div>
              <button
                onClick={() => setSelectedArtifact(null)}
                className="text-white/80 hover:text-white text-xl font-sans focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="relative h-72 w-full rounded-sm overflow-hidden border border-[#D5CCC1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedArtifact.imageUrl}
                  alt={selectedArtifact.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1E1E]">
                  {selectedArtifact.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs font-sans text-[#736E6A] mt-2 pb-4 border-b border-[#E5DED6]">
                  <div>
                    <span className="font-semibold text-[#1E1E1E]">Thời gian:</span> Năm{" "}
                    {selectedArtifact.year}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1E1E1E]">Vị trí trưng bày:</span>{" "}
                    {selectedArtifact.room}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1E1E1E]">Người trao tặng:</span>{" "}
                    {selectedArtifact.donor}
                  </div>
                  <div className="flex items-center gap-1 text-[#A51C30] font-semibold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{selectedArtifact.viewCount || 0} lượt xem</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-[#1E1E1E]">
                  Ý nghĩa & Câu chuyện lịch sử
                </h4>
                <p className="text-base font-serif text-[#4A4744] leading-relaxed whitespace-pre-line">
                  {selectedArtifact.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DED6] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#736E6A]" />
                  <span className="text-xs font-sans text-[#736E6A]">Từ khóa:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedArtifact.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-[#FAF8F5] text-[#5C5856] border border-[#E5DED6] px-2 py-0.5 rounded text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => handleLikeArtifact(e, selectedArtifact)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-sans font-bold transition-all ${
                      likedMap[selectedArtifact.id]
                        ? "bg-[#A51C30] text-white border-[#A51C30]"
                        : "bg-white text-[#A51C30] border-[#A51C30] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedMap[selectedArtifact.id] ? "fill-white" : ""
                      }`}
                    />
                    Yêu thích ({selectedArtifact.likeCount || 0})
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedArtifact.title,
                          text: selectedArtifact.description,
                          url: window.location.href,
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#D5CCC1] text-xs font-sans font-semibold text-[#5C5856] hover:bg-[#FAF8F5]"
                  >
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
