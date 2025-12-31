import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Check if any users exist
  const existingUsers = await prisma.user.count({
    where: {
      deletedAt: null
    }
  })

  if (existingUsers > 0) {
    console.log('⚠️  Users already exist. Skipping user creation.')
    console.log('💡 Use the signup page at /signup to create an admin user if needed.')
    return
  }

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      fullName: 'System Administrator',
      nickname: 'Admin',
      role: 'admin',
      isActive: true
    }
  })

  console.log('✅ Created admin user:', adminUser.email)
  console.log('🔑 Default credentials:')
  console.log('   Username: admin')
  console.log('   Password: admin123')
  console.log('⚠️  Please change these credentials after first login!')

  // Create some sample windows
  const windows = await Promise.all([
    prisma.window.create({
      data: {
        windowTitle: 'Window 1',
        windowDescription: 'General Services',
        status: 'active'
      }
    }),
    prisma.window.create({
      data: {
        windowTitle: 'Window 2',
        windowDescription: 'Student Services',
        status: 'active'
      }
    }),
    prisma.window.create({
      data: {
        windowTitle: 'Window 3',
        windowDescription: 'Faculty Services',
        status: 'active'
      }
    })
  ])

  console.log('✅ Created sample windows:', windows.length)

  // Assign admin user to all windows
  const userWindows = await Promise.all(
    windows.map(window =>
      prisma.userWindow.create({
        data: {
          userId: adminUser.id,
          windowId: window.id,
          isActive: true
        }
      })
    )
  )

  console.log('✅ Assigned admin user to all windows')

  console.log('🎉 Database seeding completed!')
  console.log('📝 Next steps:')
  console.log('   1. Run: npm run dev')
  console.log('   2. Visit: http://localhost:3000/login')
  console.log('   3. Login with the credentials above')
  console.log('   4. Change the default password')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
