'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Users,
    LogOut,
} from 'lucide-react'



export default function AdminHeader() {

    const [currentUser, setCurrentUser] = useState<any>(null)
    const router = useRouter()


    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    useEffect(() => {
        checkAuth()
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me')
            if (response.ok) {
                const data = await response.json()
                setCurrentUser(data.user)
             
            }
        } catch (error) {
            router.push('/login')
        }
    }



    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Users className="h-8 w-8 text-blue-600" />
                            <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600 px-3">
                                Welcome, {currentUser?.fullName}
                            </span>
                            <Link href="/admin/users" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                Users
                            </Link>
                            <Link href="/admin/windows" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                Windows
                            </Link>
                            <Link href="/admin/status" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                System Status
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
