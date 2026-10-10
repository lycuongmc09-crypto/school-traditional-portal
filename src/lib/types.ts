// Shared types & constants safe for both Client and Server components
export type ArtifactCategory =
  | "khang-chien"
  | "giai-thuong"
  | "ky-vat-thay-co"
  | "hinh-anh-lop-hoc"
  | "bieu-tuong"
  | "dong-gop";

export type ModerationStatus = "approved" | "pending" | "rejected";

export interface CategoryInfo {
  id: ArtifactCategory;
  name: string;
  description: string;
}

export const ARTIFACT_CATEGORIES: CategoryInfo[] = [
  {
    id: "bieu-tuong",
    name: "Biểu tượng & Di sản",
    description: "Chuông trường, cờ hiệu, biểu trưng và vật phẩm mang tính biểu tượng",
  },
  {
    id: "khang-chien",
    name: "Thời kỳ Kháng chiến",
    description: "Tư liệu, giáo án thời sơ tán và kỷ vật thời khói lửa",
  },
  {
    id: "giai-thuong",
    name: "Giải thưởng & Thành tích",
    description: "Huy chương Olympic, cờ thi đua và phần thưởng vinh danh",
  },
  {
    id: "ky-vat-thay-co",
    name: "Kỷ vật Thầy Cô",
    description: "Bút tích, giáo án, đồ dùng giảng dạy của các thế hệ nhà giáo",
  },
  {
    id: "hinh-anh-lop-hoc",
    name: "Hình ảnh Lớp học",
    description: "Ảnh kỷ yếu, sinh hoạt lớp và tư liệu qua từng niên khóa",
  },
  {
    id: "dong-gop",
    name: "Kỷ vật Đóng góp",
    description: "Hiện vật, tư liệu do cựu học sinh và phụ huynh trao tặng",
  },
];

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

export interface Artifact {
  id: string;
  title: string;
  donor: string;
  year: string;
  room: string;
  description: string;
  tags: string[];
  imageUrl: string;
  category: ArtifactCategory;
  status: ModerationStatus;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  alumniClass: string;
  role: string;
  date: string;
  message: string;
  approved: boolean; // Retained for backward compatibility
  status: ModerationStatus;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  period: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface SchoolDatabase {
  schoolInfo: {
    name: string;
    subTitle: string;
    motto: string;
    establishedYear: number;
    description: string;
    principalMessage: string;
  };
  milestones: Milestone[];
  artifacts: Artifact[];
  guestbook: GuestbookEntry[];
  teachers: Teacher[];
}

export interface ArtifactQueryParams {
  category?: string;
  tag?: string;
  search?: string;
  status?: ModerationStatus | "all";
  page?: number;
  limit?: number;
  sortBy?: "newest" | "oldest" | "views" | "likes";
}

export interface GuestbookQueryParams {
  search?: string;
  status?: ModerationStatus | "all";
  page?: number;
  limit?: number;
  sortBy?: "newest" | "oldest" | "likes";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}
