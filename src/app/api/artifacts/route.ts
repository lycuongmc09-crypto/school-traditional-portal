import { NextRequest, NextResponse } from "next/server";
import {
  queryArtifacts,
  addArtifact,
  incrementArtifactStat,
  updateArtifactStatus,
  ArtifactCategory,
  ModerationStatus,
} from "@/lib/db";
import { cleanInputString, isValidImageUrl, checkRateLimit } from "@/lib/validation";

const VALID_CATEGORIES: ArtifactCategory[] = [
  "bieu-tuong",
  "khang-chien",
  "giai-thuong",
  "ky-vat-thay-co",
  "hinh-anh-lop-hoc",
  "dong-gop",
];

const VALID_STATUSES: ModerationStatus[] = ["approved", "pending", "rejected"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const search = searchParams.get("search") || undefined;
    const statusParam = searchParams.get("status");
    const status = (statusParam === "all" ? "all" : (statusParam as ModerationStatus)) || "approved";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const sortBy = (searchParams.get("sortBy") as "newest" | "oldest" | "views" | "likes") || "newest";

    const result = queryArtifacts({
      category,
      tag,
      search,
      status,
      page,
      limit,
      sortBy,
    });

    return NextResponse.json({
      success: true,
      // artifacts kept for 100% backward compatibility
      artifacts: result.data,
      data: result.data,
      pagination: result.pagination,
      stats: result.stats,
      categories: result.categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 15 submissions per minute per IP
    const clientIp = request.headers.get("x-forwarded-for") || "client-anon";
    const rateCheck = checkRateLimit(`artifact-post:${clientIp}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Thao tác quá nhanh. Vui lòng thử lại sau ít phút.",
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Dữ liệu gửi lên không đúng định dạng JSON" },
        { status: 400 }
      );
    }

    const title = cleanInputString(body.title, 200);
    const donor = cleanInputString(body.donor, 150);
    const description = cleanInputString(body.description, 2000);
    const year = cleanInputString(body.year, 50) || "Chưa xác định";
    const room = cleanInputString(body.room, 100) || "Gian tiếp nhận số hóa";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

    // Validation
    if (!title || title.length < 3) {
      return NextResponse.json(
        { success: false, error: "Tên hiện vật bắt buộc và phải có ít nhất 3 ký tự" },
        { status: 400 }
      );
    }
    if (!donor || donor.length < 2) {
      return NextResponse.json(
        { success: false, error: "Tên người trao tặng bắt buộc và phải có ít nhất 2 ký tự" },
        { status: 400 }
      );
    }
    if (!description || description.length < 10) {
      return NextResponse.json(
        { success: false, error: "Mô tả hiện vật phải có ít nhất 10 ký tự" },
        { status: 400 }
      );
    }

    // Category assignment
    let category: ArtifactCategory = "dong-gop";
    if (body.category && VALID_CATEGORIES.includes(body.category)) {
      category = body.category;
    }

    // Tags processing
    let tags: string[] = ["Kỷ vật"];
    if (Array.isArray(body.tags)) {
      tags = body.tags
        .map((t: unknown) => cleanInputString(t, 40))
        .filter((t: string) => t.length > 0)
        .slice(0, 8);
    } else if (typeof body.tags === "string" && body.tags.trim() !== "") {
      tags = body.tags
        .split(",")
        .map((t: string) => cleanInputString(t, 40))
        .filter((t: string) => t.length > 0)
        .slice(0, 8);
    }
    if (tags.length === 0) tags = ["Kỷ vật đóng góp"];

    // Image URL validation
    const safeImageUrl =
      imageUrl && isValidImageUrl(imageUrl)
        ? imageUrl
        : "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80";

    const newArtifact = addArtifact({
      title,
      donor,
      year,
      room,
      description,
      tags,
      imageUrl: safeImageUrl,
      category,
      status: "approved",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Tiếp nhận hiện vật thành công!",
        artifact: newArtifact,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || !body.id) {
      return NextResponse.json(
        { success: false, error: "Thiếu ID hiện vật" },
        { status: 400 }
      );
    }

    const { id, action, status } = body;

    // Handle view / like interaction
    if (action === "view" || action === "like") {
      const updated = incrementArtifactStat(id, action);
      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Không tìm thấy hiện vật" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, artifact: updated });
    }

    // Handle moderation status update
    if (status && VALID_STATUSES.includes(status)) {
      const updated = updateArtifactStatus(id, status);
      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Không tìm thấy hiện vật" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, artifact: updated });
    }

    return NextResponse.json(
      { success: false, error: "Thao tác PATCH không hợp lệ" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
