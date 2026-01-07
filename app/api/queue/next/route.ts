import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { broadcastQueueUpdate } from '@/lib/websocket'

export async function POST(req: NextRequest) {
  const { windowId } = await req.json()

  if (!windowId || isNaN(windowId)) {
    return NextResponse.json({ error: 'Invalid window ID' }, { status: 400 })
  }

  try {
    // 1. Find last called ticket
    const lastCalled = await prisma.queue.findFirst({
      where: { status: 'called', deletedAt: null, windowId: Number(windowId)},
      orderBy: { id: 'desc' },
    })

    if (lastCalled) {
      await prisma.queue.update({
        where: { id: lastCalled.id },
        data: { status: 'served' },
      })
    }

    // 2. Find the next waiting ticket
    const next = await prisma.queue.findFirst({
      where: { status: 'waiting', deletedAt: null, windowId: Number(windowId) },
      orderBy: { id: 'asc' },
    })

    if (!next) {
      return NextResponse.json({ message: 'No one in queue' }, { status: 404 })
    }

    // 3. Call next
    const updated = await prisma.queue.update({
      where: { id: next.id},
      data: { status: 'called', deletedAt: null, },
    })

    // 4. Broadcast queue update via WebSocket
    broadcastQueueUpdate(Number(windowId), 'next')

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error in /api/queue/next:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
