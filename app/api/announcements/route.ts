import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET all active announcements (public)
export async function GET(req: NextRequest) {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}

// POST new announcement (admin only)
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const { title, message, type, priority } = await req.json();

    if (!title || !message) {
      return NextResponse.json(
        { error: "Title and message are required" },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        message,
        type: type || "info",
        priority: priority || 0,
        isActive: true,
      },
    });

    return NextResponse.json(announcement);
  } catch (error: any) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create announcement" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
