'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Search,
    Bell,
    Menu,
    X,
    Command
} from 'lucide-react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"

type WindowDetails = {
    windowId: number;
    windowTitle: string;
    windowDescription: string;
}


export default function UserHeader() {

    const [currentUser, setCurrentUser] = useState<any>(null)
    const router = useRouter()

    const [userWindows, setUserWindows] = useState<WindowDetails[]>([]);
    const [isWindowsModalOpen, setIsWindowsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const [windowId, setWindowId] = useState<number | null>(null)

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const handleSelectWindow = (id: number) => {
        setIsWindowsModalOpen(false);
        router.push(`/cpanel/queue/${id}`);
    };


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

    const fetchUserWindows = async () => {
        try {
            const res = await fetch('/api/users/windows?userId=' + currentUser.id);
            if (res.ok) {
                const data: WindowDetails[] = await res.json();
                setUserWindows(data);
                setIsWindowsModalOpen(true); // Open modal after fetching
            } else {
                console.error('Failed to fetch user windows');
            }
        } catch (error) {
            console.error('Error fetching user windows:', error);
        }
    };



    return (
        <>
            {/* Header Navigation */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4 lg:space-x-8">
                            <Command className="h-8 w-8 text-blue-600" />
                            <h1 className="-ml-2 text-xl lg:text-2xl font-bold text-blue-600">Kyuu.</h1>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex space-x-6">
                                <Link href="/cpanel" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">                                    Home
                                </Link>
                                <Button onClick={fetchUserWindows} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Windows
                                </Button>

                                <span className="text-sm text-gray-600 px-3 py-2">
                                    Welcome, {currentUser?.fullName}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-2 lg:space-x-4">
                            {/* Desktop Search */}
                            {/* <div className="hidden md:block relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div> */}

                            <button className="text-gray-600 hover:text-blue-600">
                                <Bell className="h-5 w-5" />
                            </button>

                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">{currentUser?.fullName?.charAt(0)}</span>
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden text-gray-600 hover:text-blue-600"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-gray-200 py-4">
                            <nav className="flex flex-col space-y-2">
                                <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </Link>
                                <Link href={`/cpanel/queue/${windowId}`} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Queue
                                </Link>
                                {/* <Link href="/transaction" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Transaction
                                </Link>
                                <Link href="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Administration
                                </Link> */}
                            </nav>

                            {/* Mobile Search */}
                            <div className="mt-4 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <Dialog open={isWindowsModalOpen} onOpenChange={setIsWindowsModalOpen}>
                <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Your Assigned Windows</DialogTitle>
                        <DialogDescription>
                            Select a window to access its control panel.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex flex-col space-y-2 max-h-96 overflow-y-auto">
                        {userWindows.length > 0 ? (
                            userWindows.map((w) => (
                                <button
                                    key={w.windowId}
                                    onClick={() => handleSelectWindow(w.windowId)}
                                    className="text-left px-4 py-2 bg-gray-100 rounded-md hover:bg-blue-100 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">{w.windowTitle}</div>
                                    <div className="text-sm text-gray-500">{w.windowDescription}</div>
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No windows assigned to you.</p>
                        )}
                    </div>
                    <DialogFooter>
                        <button
                            onClick={() => setIsWindowsModalOpen(false)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Close
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
