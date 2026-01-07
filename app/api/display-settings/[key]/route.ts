import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET single display setting
export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const setting = await prisma.displaySettings.findUnique({
      where: { key: params.key },
    });

    if (!setting) {
      return NextResponse.json(null);
    }

    try {
      const value = JSON.parse(setting.value);
      return NextResponse.json(value);
    } catch {
      return NextResponse.json(setting.value);
    }
  } catch (error) {
    console.error("Error fetching display setting:", error);
    return NextResponse.json(
      { error: "Failed to fetch display setting" },
      { status: 500 }
    );
  }
}

// PUT update single display setting (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    await requireAdmin();

    const { value, description } = await req.json();

    const setting = await prisma.displaySettings.upsert({
      where: { key: params.key },
      update: {
        value: JSON.stringify(value),
        description,
        updatedAt: new Date(),
      },
      create: {
        key: params.key,
        value: JSON.stringify(value),
        description,
      },
    });

    return NextResponse.json(setting);
  } catch (error: any) {
    console.error("Error updating display setting:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update display setting" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// DELETE display setting (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    await requireAdmin();

    await prisma.displaySettings.delete({
      where: { key: params.key },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting display setting:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete display setting" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

