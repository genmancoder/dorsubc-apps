import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    select: { id: true, username: true, fullName: true, email: true },
  });

  return NextResponse.json(users);
}
