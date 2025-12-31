import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAdmin, hashPassword } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    
    const users = await prisma.user.findMany({
      where: {
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin()
    
    const { email, username, password, fullName, nickname, role = 'user' } = await req.json()
    
    // Validation
    if (!email || !username || !password || !fullName || !nickname) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ],
        deletedAt: null
      }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        fullName,
        nickname,
        role
      },
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
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json(
      { error: 'Unauthorized or internal server error' },
      { status: 401 }
    )
  }
}
