import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }
    
    const userWindows = await prisma.userWindow.findMany({
      where: {
        userId: userId,
        isActive: true
      },
      include: {
        window: {
          select: {
            id: true,
            windowTitle: true,
            windowDescription: true,
            status: true
          }
        }
      }
    })
    
    return NextResponse.json(userWindows)
  } catch (error) {
    console.error('Get user windows error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }
    
    const { windowId } = await req.json()
    
    if (!windowId) {
      return NextResponse.json(
        { error: 'Window ID is required' },
        { status: 400 }
      )
    }
    
    // Check if user exists
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Check if window exists
    const window = await prisma.window.findFirst({
      where: {
        id: windowId,
        deletedAt: null
      }
    })
    
    if (!window) {
      return NextResponse.json(
        { error: 'Window not found' },
        { status: 404 }
      )
    }
    
    // Check if assignment already exists
    const existingAssignment = await prisma.userWindow.findFirst({
      where: {
        userId: userId,
        windowId: windowId
      }
    })
    
    if (existingAssignment) {
      // Update existing assignment to active
      const updatedAssignment = await prisma.userWindow.update({
        where: { id: existingAssignment.id },
        data: { isActive: true },
        include: {
          window: {
            select: {
              id: true,
              windowTitle: true,
              windowDescription: true,
              status: true
            }
          }
        }
      })
      
      return NextResponse.json(updatedAssignment)
    }
    
    // Create new assignment
    const userWindow = await prisma.userWindow.create({
      data: {
        userId: userId,
        windowId: windowId,
        isActive: true
      },
      include: {
        window: {
          select: {
            id: true,
            windowTitle: true,
            windowDescription: true,
            status: true
          }
        }
      }
    })
    
    return NextResponse.json(userWindow, { status: 201 })
  } catch (error) {
    console.error('Assign user window error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }
    
    const { windowId } = await req.json()
    
    if (!windowId) {
      return NextResponse.json(
        { error: 'Window ID is required' },
        { status: 400 }
      )
    }
    
    // Deactivate assignment
    await prisma.userWindow.updateMany({
      where: {
        userId: userId,
        windowId: windowId
      },
      data: {
        isActive: false
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Remove user window error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}
