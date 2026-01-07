import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const windowUsers = await prisma.userWindow.findMany({
    where: { windowId: Number(params.id), isActive: true },
    include: { user: true },
  });

  return NextResponse.json(windowUsers.map((uw) => uw.user));
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userIds } = await req.json();

  if (!Array.isArray(userIds)) {
    return NextResponse.json(
      { error: "userIds must be an array" },
      { status: 400 }
    );
  }

  const windowId = Number(params.id);

  // Deactivate all previous assignments
  await prisma.userWindow.updateMany({
    where: { windowId },
    data: { isActive: false },
  });

  // Assign new users (only if there are any)
  if (userIds.length > 0) {
    const assignments = userIds.map((userId: number) => ({
      userId,
      windowId,
      isActive: true,
    }));

    // Use upsert to handle existing records
    for (const assignment of assignments) {
      await prisma.userWindow.upsert({
        where: {
          userId_windowId: {
            userId: assignment.userId,
            windowId: assignment.windowId,
          },
        },
        update: {
          isActive: true,
        },
        create: assignment,
      });
    }
  }

  return NextResponse.json({ success: true });
}
