import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Get last 5 tickets with window information
    const recent = await prisma.queue.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        window: {
          select: {
            windowTitle: true,
            windowDescription: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })

    return NextResponse.json(recent)
  } catch (error) {
    console.error('Error fetching recent tickets:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

