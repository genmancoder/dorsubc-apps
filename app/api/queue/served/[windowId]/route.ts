import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: { windowId: string } }
) {
  const params = await context.params;
  const windowId = Number(await params.windowId);

  if (isNaN(windowId)) {
    return NextResponse.json({ error: "Invalid window ID" }, { status: 400 });
  }

  try {
    // Get last 5 served tickets for this window
    const served = await prisma.queue.findMany({
      where: {
        status: "served",
        deletedAt: null,
        windowId: windowId,
      },
      orderBy: { id: "desc" },
      take: 5,
    });

    return NextResponse.json(served);
  } catch (error) {
    console.error("Error fetching served tickets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
