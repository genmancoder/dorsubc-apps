import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAdmin, hashPassword } from '@/lib/auth'

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
    
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        nickname: true,
        role: true,
        isActive: true,
        createdAt: true,
        userWindows: {
          include: {
            window: {
              select: {
                id: true,
                windowTitle: true
              }
            }
          }
        }
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}

export async function PUT(
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
    
    const { email, username, password, fullName, nickname, role, isActive } = await req.json()
    
    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null
      }
    })
    
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Check if email/username is already taken by another user
    if (email || username) {
      const duplicateUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email || existingUser.email },
            { username: username || existingUser.username }
          ],
          id: { not: userId },
          deletedAt: null
        }
      })
      
      if (duplicateUser) {
        return NextResponse.json(
          { error: 'Email or username already taken' },
          { status: 400 }
        )
      }
    }
    
    // Prepare update data
    const updateData: any = {}
    if (email) updateData.email = email
    if (username) updateData.username = username
    if (fullName) updateData.fullName = fullName
    if (nickname) updateData.nickname = nickname
    if (role) updateData.role = role
    if (typeof isActive === 'boolean') updateData.isActive = isActive
    if (password) updateData.password = await hashPassword(password)
    
    // Update user
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        nickname: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    })
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Update user error:', error)
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
    
    // Soft delete user
    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}
