import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, username, password, fullName, nickname, role = 'admin' } = await req.json()

    // Validation
    if (!email || !username || !password || !fullName || !nickname) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if any users already exist (only allow signup if no users exist)
    const existingUsers = await prisma.user.count({
      where: {
        deletedAt: null
      }
    })

    if (existingUsers > 0) {
      return NextResponse.json(
        { error: 'Admin user already exists. Please contact the administrator to create additional users.' },
        { status: 403 }
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

    // Create user (always admin for signup)
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        fullName,
        nickname,
        role: 'admin' // Always create admin user for signup
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

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user
    }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
