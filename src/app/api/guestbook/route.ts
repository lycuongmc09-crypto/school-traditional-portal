import { NextRequest, NextResponse } from "next/server";
import {
  queryGuestbook,
  addGuestbookEntry,
  incrementGuestbookStat,
  updateGuestbookStatus,
  ModerationStatus,
} from "@/lib/db";
import { cleanInputString, checkRateLimit } from "@/lib/validation";

const VALID_STATUSES: ModerationStatus[] = ["approved", "pending", "rejected"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || undefined;
    const statusParam = searchParams.get("status");
    const status = (statusParam === "all" ? "all" : (statusParam as ModerationStatus)) || "approved";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const sortBy = (searchParams.get("sortBy") as "newest" | "oldest" | "likes") || "newest";

    const result = queryGuestbook({
      search,
      status,
      page,
      limit,
      sortBy,
    });

    return NextResponse.json({
      success: true,
      // guestbook kept for 100% backward compatibility
      guestbook: result.data,
      data: result.data,
      pagination: result.pagination,
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
    // Rate limit: 5 guestbook entries per minute per IP
    const clientIp = request.headers.get("x-forwarded-for") || "client-anon";
    const rateCheck = checkRateLimit(`guestbook-post:${clientIp}`, 5, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Bạn đang gửi thông điệp quá nhanh. Vui lòng đợi 1 phút trước khi gửi tiếp.",
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

    const name = cleanInputString(body.name, 100);
    const alumniClass = cleanInputString(body.alumniClass, 100);
    const role = cleanInputString(body.role, 100);
    const message = cleanInputString(body.message, 1500);

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập họ tên người lưu bút (tối thiểu 2 ký tự)" },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, error: "Nội dung lưu bút quá ngắn (tối thiểu 5 ký tự)" },
        { status: 400 }
      );
    }

    const newEntry = addGuestbookEntry({
      name,
      alumniClass: alumniClass || "Cựu học sinh / Khách quý",
      role: role || "Thành viên",
      message,
      status: "approved",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lưu bút của bạn đã được ghi lại thành công!",
        entry: newEntry,
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
        { success: false, error: "Thiếu ID lưu bút" },
        { status: 400 }
      );
    }

    const { id, action, status } = body;

    // Handle like interaction
    if (action === "like") {
      const updated = incrementGuestbookStat(id, "like");
      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Không tìm thấy lưu bút" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, entry: updated });
    }

    // Handle moderation status update
    if (status && VALID_STATUSES.includes(status)) {
      const updated = updateGuestbookStatus(id, status);
      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Không tìm thấy lưu bút" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, entry: updated });
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
