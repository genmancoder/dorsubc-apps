import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface UserSession {
  id: number
  email: string
  username: string
  fullName: string
  nickname: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: UserSession): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSession
  } catch (error) {
    return null
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    return null
  }
  
  return verifyToken(token)
}

export async function requireAuth(): Promise<UserSession> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}

export async function requireAdmin(): Promise<UserSession> {
  const user = await requireAuth()
  
  if (user.role !== 'admin') {
    throw new Error('Admin access required')
  }
  
  return user
}
