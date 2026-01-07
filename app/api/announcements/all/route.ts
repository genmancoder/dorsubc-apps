import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET all announcements including inactive (admin only)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const announcements = await prisma.announcement.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(announcements);
  } catch (error: any) {
    console.error("Error fetching all announcements:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch announcements" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

