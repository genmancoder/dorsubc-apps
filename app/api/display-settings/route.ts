import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET display settings
export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.displaySettings.findMany();

    // Convert to key-value object
    const settingsObj: Record<string, any> = {};
    settings.forEach((setting) => {
      try {
        settingsObj[setting.key] = JSON.parse(setting.value);
      } catch {
        settingsObj[setting.key] = setting.value;
      }
    });

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error("Error fetching display settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch display settings" },
      { status: 500 }
    );
  }
}

// POST/PUT update display settings (admin only)
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const settings = await req.json();

    // Update or create each setting
    for (const [key, value] of Object.entries(settings)) {
      await prisma.displaySettings.upsert({
        where: { key },
        update: {
          value: JSON.stringify(value),
          updatedAt: new Date(),
        },
        create: {
          key,
          value: JSON.stringify(value),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating display settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update display settings" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

