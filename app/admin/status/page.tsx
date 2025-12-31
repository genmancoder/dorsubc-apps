'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import Link from 'next/link'
import {
    Plus,
    Users,
    Settings,
    LogOut,
    User,
    Shield
} from 'lucide-react'
import NavLinks from '../nav-links'
import AdminHeader from '@/components/admin/admin-header'

type QueeWindow = {
    id: number
    windowTitle: string
    windowDescription: string
}

export default function Cpanel() {
    const [windows, setWindows] = useState<QueeWindow[]>([])
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const [form, setForm] = useState({
        windowTitle: '',
        windowDescription: '',
    })

    const [error, setError] = useState('')


    const fetchWindow = async () => {
        const res = await fetch('/api/window/list')
        if (res.ok) {
            const data = await res.json()
            setWindows(data)
            console.log(data)
        }
    }

    useEffect(() => {

        setIsLoading(true);
        fetchWindow()

        setIsLoading(false);
    }, []);


    const validateForm = () => {
        const { windowTitle, windowDescription } = form

        if (!windowTitle || !windowDescription) {
            return 'All fields are required.'
        }
        return ''
    }

    const resetForm = () => {
        setForm({
            windowTitle: '',
            windowDescription: '',
        });
    };

    const addWindow = async () => {
        const errorMsg = validateForm()
        if (errorMsg) {
            setError(errorMsg)
            return
        }

        const res = await fetch('/api/window/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        console.log(res)
        toast("Window has been created.")
        resetForm();
        fetchWindow()
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}

            <AdminHeader />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Actions */}
                <NavLinks />
                {/* Window Management Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">System Status: <span className="bg-green-100 p-2 rounded-lg text-sm">Online</span></h2>

                    </div>

                    {/* Windows List */}
                    <div className="overflow-x-auto">

                    </div>
                </div>
            </div>

            {/* Add Window Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Window</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Window Title
                            </label>
                            <input
                                type="text"
                                name="windowTitle"
                                value={form.windowTitle}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter window title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <input
                                type="text"
                                name="windowDescription"
                                value={form.windowDescription}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter window description"
                            />
                        </div>
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <button
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addWindow}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Add Window
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
