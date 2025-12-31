// app/api/window/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const windowId = parseInt(params.id)
    if (isNaN(windowId)) {
      return NextResponse.json({ error: 'Invalid window ID' }, { status: 400 })
    }

    const { windowTitle, windowDescription } = await req.json()

    // Validation
    if (!windowTitle || !windowDescription) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Check if window exists
    const existingWindow = await prisma.window.findUnique({
      where: { id: windowId }
    })

    if (!existingWindow) {
      return NextResponse.json({ error: 'Window not found' }, { status: 404 })
    }

    // Update the window
    const updatedWindow = await prisma.window.update({
      where: { id: windowId },
      data: {
        windowTitle,
        windowDescription
      }
    })

    return NextResponse.json(updatedWindow)
  } catch (error) {
    console.error('Update window error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}
