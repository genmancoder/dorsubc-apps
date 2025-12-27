import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const windowUsers = await prisma.userWindow.findMany({
    where: { windowId: Number(params.id), isActive: true },
    include: { user: true },
  });

  return NextResponse.json(windowUsers.map((uw) => uw.user));
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { userIds } = await req.json();

  if (!Array.isArray(userIds)) {
    return NextResponse.json({ error: "userIds must be an array" }, { status: 400 });
  }

  const windowId = Number(params.id);

  // Deactivate all previous assignments
  await prisma.userWindow.updateMany({
    where: { windowId },
    data: { isActive: false },
  });

  // Assign new users
  const assignments = userIds.map((userId: number) => ({
    userId,
    windowId,
    isActive: true,
  }));

  await prisma.userWindow.createMany({
    data: assignments,
    // skipDuplicates: true,
  });

  return NextResponse.json({ success: true });
}

