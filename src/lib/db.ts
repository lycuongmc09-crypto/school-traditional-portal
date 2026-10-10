import fs from "fs";
import path from "path";
import {
  Artifact,
  ArtifactCategory,
  ARTIFACT_CATEGORIES,
  CategoryInfo,
  GuestbookEntry,
  ModerationStatus,
  PaginatedResult,
  SchoolDatabase,
  ArtifactQueryParams,
  GuestbookQueryParams,
} from "./types";

// Re-export types for backward compatibility across server files
export * from "./types";

const dataFilePath = path.join(process.cwd(), "src", "data", "database.json");

// ==========================================
// 1. UNICODE & VIETNAMESE HELPER FUNCTIONS
// ==========================================

export function removeVietnameseAccents(str: string): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export function matchesVietnameseSearch(source: string, search: string): boolean {
  if (!search) return true;
  if (!source) return false;
  const normalizedSource = source.normalize("NFC").toLowerCase();
  const normalizedSearch = search.normalize("NFC").toLowerCase();

  // Direct substring match with diacritics
  if (normalizedSource.includes(normalizedSearch)) return true;

  // Accent-insensitive fallback match
  return removeVietnameseAccents(source).includes(removeVietnameseAccents(search));
}

// ==========================================
// 2. PERSISTENCE ENGINE (ATOMIC & UTF-8 SAFE)
// ==========================================

function ensureDefaultArtifactFields(artifact: Partial<Artifact>): Artifact {
  const now = new Date().toISOString();
  return {
    id: artifact.id || "art-" + Date.now(),
    title: (artifact.title || "").normalize("NFC").trim(),
    donor: (artifact.donor || "Chưa xác định").normalize("NFC").trim(),
    year: (artifact.year || "Chưa xác định").normalize("NFC").trim(),
    room: (artifact.room || "Gian trưng bày số hóa").normalize("NFC").trim(),
    description: (artifact.description || "").normalize("NFC").trim(),
    tags: Array.isArray(artifact.tags) ? artifact.tags.map((t) => t.normalize("NFC").trim()) : ["Kỷ vật"],
    imageUrl: artifact.imageUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    category: (artifact.category as ArtifactCategory) || "dong-gop",
    status: artifact.status || "approved",
    viewCount: typeof artifact.viewCount === "number" ? artifact.viewCount : 0,
    likeCount: typeof artifact.likeCount === "number" ? artifact.likeCount : 0,
    createdAt: artifact.createdAt || now,
    updatedAt: artifact.updatedAt || now,
  };
}

function ensureDefaultGuestbookFields(entry: Partial<GuestbookEntry>): GuestbookEntry {
  const now = new Date();
  const nowIso = now.toISOString();
  const dateFormatted = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

  const isApproved = entry.approved ?? (entry.status !== "rejected" && entry.status !== "pending");

  return {
    id: entry.id || "gb-" + Date.now(),
    name: (entry.name || "Khách quý").normalize("NFC").trim(),
    alumniClass: (entry.alumniClass || "Cựu học sinh / Khách quý").normalize("NFC").trim(),
    role: (entry.role || "Thành viên").normalize("NFC").trim(),
    date: entry.date || dateFormatted,
    message: (entry.message || "").normalize("NFC").trim(),
    approved: isApproved,
    status: entry.status || (isApproved ? "approved" : "pending"),
    likeCount: typeof entry.likeCount === "number" ? entry.likeCount : 0,
    createdAt: entry.createdAt || nowIso,
    updatedAt: entry.updatedAt || nowIso,
  };
}

export function getDatabase(): SchoolDatabase {
  if (!fs.existsSync(dataFilePath)) {
    throw new Error("Database file not found at " + dataFilePath);
  }
  // Read UTF-8 explicitly and strip any potential BOM
  const raw = fs.readFileSync(dataFilePath, "utf8").replace(/^\uFEFF/, "").normalize("NFC");
  const data: SchoolDatabase = JSON.parse(raw);

  // Auto-enrich any items that might lack modern schema attributes
  let needsSave = false;
  data.artifacts = data.artifacts.map((a) => {
    const enriched = ensureDefaultArtifactFields(a);
    if (a.category !== enriched.category || a.status !== enriched.status) needsSave = true;
    return enriched;
  });

  data.guestbook = data.guestbook.map((g) => {
    const enriched = ensureDefaultGuestbookFields(g);
    if (g.status !== enriched.status || g.approved !== enriched.approved) needsSave = true;
    return enriched;
  });

  if (needsSave) {
    saveDatabase(data);
  }

  return data;
}

export function saveDatabase(data: SchoolDatabase): void {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const jsonString = JSON.stringify(data, null, 2);
  const tempPath = `${dataFilePath}.${Date.now()}.tmp`;

  // Write atomically to temporary file first, then rename
  fs.writeFileSync(tempPath, jsonString, "utf8");
  fs.renameSync(tempPath, dataFilePath);
}

// ==========================================
// 3. BUSINESS LOGIC & QUERY ENGINE
// ==========================================

export function queryArtifacts(params: ArtifactQueryParams = {}): PaginatedResult<Artifact> & {
  categories: CategoryInfo[];
  stats: {
    total: number;
    approved: number;
    pending: number;
    totalViews: number;
    totalLikes: number;
    byCategory: Record<ArtifactCategory, number>;
  };
} {
  const db = getDatabase();
  const {
    category,
    tag,
    search,
    status = "approved",
    page = 1,
    limit = 10,
    sortBy = "newest",
  } = params;

  // Calculate comprehensive stats across all items
  const stats = {
    total: db.artifacts.length,
    approved: db.artifacts.filter((a) => a.status === "approved").length,
    pending: db.artifacts.filter((a) => a.status === "pending").length,
    totalViews: db.artifacts.reduce((sum, a) => sum + (a.viewCount || 0), 0),
    totalLikes: db.artifacts.reduce((sum, a) => sum + (a.likeCount || 0), 0),
    byCategory: {
      "khang-chien": 0,
      "giai-thuong": 0,
      "ky-vat-thay-co": 0,
      "hinh-anh-lop-hoc": 0,
      "bieu-tuong": 0,
      "dong-gop": 0,
    } as Record<ArtifactCategory, number>,
  };

  for (const item of db.artifacts) {
    if (stats.byCategory[item.category] !== undefined) {
      stats.byCategory[item.category] += 1;
    }
  }

  // Filter items
  const filtered = db.artifacts.filter((item) => {
    // Status filter
    if (status !== "all" && item.status !== status) {
      return false;
    }

    // Category filter
    if (category && category !== "all" && item.category !== category) {
      return false;
    }

    // Tag filter
    if (tag && tag !== "all" && tag !== "Tất cả") {
      if (!item.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        return false;
      }
    }

    // Search query filter (Vietnamese diacritics aware)
    if (search && search.trim() !== "") {
      const q = search.trim();
      const inTitle = matchesVietnameseSearch(item.title, q);
      const inDonor = matchesVietnameseSearch(item.donor, q);
      const inDesc = matchesVietnameseSearch(item.description, q);
      const inRoom = matchesVietnameseSearch(item.room, q);
      const inTags = item.tags.some((t) => matchesVietnameseSearch(t, q));
      if (!inTitle && !inDonor && !inDesc && !inRoom && !inTags) {
        return false;
      }
    }

    return true;
  });

  // Sort items
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "views":
        return (b.viewCount || 0) - (a.viewCount || 0);
      case "likes":
        return (b.likeCount || 0) - (a.likeCount || 0);
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Pagination bounds
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Math.min(100, Number(limit) || 10));
  const total = filtered.length;
  const totalPages = Math.ceil(total / safeLimit) || 1;
  const startIndex = (safePage - 1) * safeLimit;
  const paginatedData = filtered.slice(startIndex, startIndex + safeLimit);

  return {
    data: paginatedData,
    categories: ARTIFACT_CATEGORIES,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
    stats,
  };
}

export function queryGuestbook(params: GuestbookQueryParams = {}): PaginatedResult<GuestbookEntry> {
  const db = getDatabase();
  const {
    search,
    status = "approved",
    page = 1,
    limit = 10,
    sortBy = "newest",
  } = params;

  const filtered = db.guestbook.filter((item) => {
    if (status !== "all" && item.status !== status) {
      return false;
    }

    if (search && search.trim() !== "") {
      const q = search.trim();
      const inName = matchesVietnameseSearch(item.name, q);
      const inClass = matchesVietnameseSearch(item.alumniClass, q);
      const inRole = matchesVietnameseSearch(item.role, q);
      const inMsg = matchesVietnameseSearch(item.message, q);
      if (!inName && !inClass && !inRole && !inMsg) {
        return false;
      }
    }

    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === "likes") {
      return (b.likeCount || 0) - (a.likeCount || 0);
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Math.min(100, Number(limit) || 10));
  const total = filtered.length;
  const totalPages = Math.ceil(total / safeLimit) || 1;
  const startIndex = (safePage - 1) * safeLimit;

  return {
    data: filtered.slice(startIndex, startIndex + safeLimit),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
  };
}

export function addArtifact(
  artifact: Omit<Artifact, "id" | "status" | "viewCount" | "likeCount" | "createdAt" | "updatedAt"> & {
    category?: ArtifactCategory;
    status?: ModerationStatus;
  }
): Artifact {
  const db = getDatabase();
  const newArtifact = ensureDefaultArtifactFields({
    ...artifact,
    id: "art-" + Date.now(),
    status: artifact.status || "approved",
    viewCount: 1,
    likeCount: 0,
  });

  db.artifacts.unshift(newArtifact);
  saveDatabase(db);
  return newArtifact;
}

export function addGuestbookEntry(
  entry: Omit<GuestbookEntry, "id" | "date" | "approved" | "status" | "likeCount" | "createdAt" | "updatedAt"> & {
    status?: ModerationStatus;
  }
): GuestbookEntry {
  const db = getDatabase();
  const newEntry = ensureDefaultGuestbookFields({
    ...entry,
    id: "gb-" + Date.now(),
    status: entry.status || "approved",
    approved: entry.status ? entry.status === "approved" : true,
    likeCount: 0,
  });

  db.guestbook.unshift(newEntry);
  saveDatabase(db);
  return newEntry;
}

export function incrementArtifactStat(id: string, stat: "view" | "like"): Artifact | null {
  const db = getDatabase();
  const artifact = db.artifacts.find((a) => a.id === id);
  if (!artifact) return null;

  if (stat === "view") {
    artifact.viewCount = (artifact.viewCount || 0) + 1;
  } else if (stat === "like") {
    artifact.likeCount = (artifact.likeCount || 0) + 1;
  }
  artifact.updatedAt = new Date().toISOString();

  saveDatabase(db);
  return artifact;
}

export function incrementGuestbookStat(id: string, stat: "like" = "like"): GuestbookEntry | null {
  const db = getDatabase();
  const entry = db.guestbook.find((g) => g.id === id);
  if (!entry) return null;

  if (stat === "like") {
    entry.likeCount = (entry.likeCount || 0) + 1;
  }
  entry.updatedAt = new Date().toISOString();

  saveDatabase(db);
  return entry;
}

export function updateArtifactStatus(id: string, status: ModerationStatus): Artifact | null {
  const db = getDatabase();
  const artifact = db.artifacts.find((a) => a.id === id);
  if (!artifact) return null;

  artifact.status = status;
  artifact.updatedAt = new Date().toISOString();
  saveDatabase(db);
  return artifact;
}

export function updateGuestbookStatus(id: string, status: ModerationStatus): GuestbookEntry | null {
  const db = getDatabase();
  const entry = db.guestbook.find((g) => g.id === id);
  if (!entry) return null;

  entry.status = status;
  entry.approved = status === "approved";
  entry.updatedAt = new Date().toISOString();
  saveDatabase(db);
  return entry;
}
