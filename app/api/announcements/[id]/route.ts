import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET single announcement
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const announcement = await prisma.announcement.findFirst({
      where: {
        id: Number(params.id),
        deletedAt: null,
      },
    });

    if (!announcement) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcement" },
      { status: 500 }
    );
  }
}

// PUT update announcement (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { title, message, type, priority, isActive } = await req.json();

    const announcement = await prisma.announcement.update({
      where: { id: Number(params.id) },
      data: {
        title,
        message,
        type,
        priority,
        isActive,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(announcement);
  } catch (error: any) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update announcement" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// DELETE announcement (soft delete, admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    await prisma.announcement.update({
      where: { id: Number(params.id) },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete announcement" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
