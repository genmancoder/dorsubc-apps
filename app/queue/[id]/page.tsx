'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from 'next/link'
import {
    Play,
    Pause,
    Volume2,
    ChevronsRight,
    CheckCircle,
    Clock,
    Users,
    UserCheck,
    Timer,
    LogOut,
    Search,
    Bell,
    Home,
    Settings,
    Menu,
    X,
    ChevronsLeft
} from 'lucide-react'
import TTSButton from '@/components/tts/TTS'

type Queue = {
    ticketNumber: number
    firstName: string
    lastName: string
    studentId: string
    createdAt: string
}

type WindowDetails = {
    windowId: number;
    windowTitle: string;
    windowDescription: string;
}

type PausedQueue = {
    ticketNumber: number
    firstName: string
    lastName: string
    studentId: string
    startTime: string
    duration: string
}

export default function Queue() {
    const wsRef = useRef<WebSocket | null>(null);
    const [current, setCurrent] = useState<Queue | null>(null)
    const [pending, setPending] = useState<Queue[]>([])
    const [pausedQueue, setPausedQueue] = useState<PausedQueue[]>([])
    const [open, setOpen] = useState(false);
    const [serviceStartTime, setServiceStartTime] = useState<Date | null>(null)
    const [serviceDuration, setServiceDuration] = useState<string>('00:00:00')
    const [isServiceActive, setIsServiceActive] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const [details, setDetails] = useState<WindowDetails | null>(null)

    const params = useParams()
    const [windowId, setWindowId] = useState<number | null>(null)

    const showDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    // Statistics
    const [stats, setStats] = useState({
        waitingList: 0,
        serviceDone: 0,
        totalIdleTime: '00:10:00',
        serviceDuration: '02:45:10'
    })




    const fetchCurrent = async () => {
        if (!windowId) return;

        const res = await fetch('/api/queue/current/' + windowId)
        if (res.ok) {
            const data = await res.json()
            setCurrent(data)
            if (data && !isServiceActive) {
                setIsServiceActive(true)
                setServiceStartTime(new Date())
            } else if (!data && isServiceActive) {
                setIsServiceActive(false)
                setServiceStartTime(null)
            }
        } else {
            setCurrent(null)
            setIsServiceActive(false)
            setServiceStartTime(null)
        }
    }

    const fetchWindowDetails = async () => {
        if (!windowId) return;

        const res = await fetch('/api/window/details/' + windowId)
        if (res.ok) {
            const data = await res.json()
            setDetails(data)
        } else {
            setDetails(null)
        }
    }

    const fetchPending = async () => {
        if (!windowId) return;

        const res = await fetch('/api/queue/pending/' + windowId)
        if (res.ok) {
            const data = await res.json()
            setPending(data)
            setStats(prev => ({ ...prev, waitingList: data.length }))
        }
    }

    const fetchPausedQueue = async () => {
        // Mock data for paused queue - you can implement actual API
        const mockPausedQueue: PausedQueue[] = [
            { ticketNumber: 10150, firstName: 'John', lastName: 'Doe', studentId: '2020-0001', startTime: '11:10', duration: '00:00:39' },
            { ticketNumber: 10151, firstName: 'Jane', lastName: 'Smith', studentId: '2020-0002', startTime: '11:15', duration: '00:00:15' },
            { ticketNumber: 10163, firstName: 'Mike', lastName: 'Johnson', studentId: '2020-0003', startTime: '12:22', duration: '00:00:52' },
        ]
        setPausedQueue(mockPausedQueue)
    }

    useEffect(() => {
        if (params?.id) {
            const parsed = Number(params.id)
            if (!isNaN(parsed)) {
                setWindowId(parsed)
            } else {
                console.error('Invalid windowId:', params)
            }
        }
    }, [params?.id])

    useEffect(() => {
        wsRef.current = new WebSocket('ws://localhost:3005');
        return () => wsRef.current?.close();
    }, []);

    // Service timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isServiceActive && serviceStartTime) {
            interval = setInterval(() => {
                const now = new Date()
                const diff = now.getTime() - serviceStartTime.getTime()
                const hours = Math.floor(diff / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)
                setServiceDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isServiceActive, serviceStartTime])

    const callNext = async () => {
        if (!windowId) return;

        try {
            const res = await fetch('/api/queue/next', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ windowId }),
            })

            if (res.ok) {
                const data = await res.json()
                setCurrent(data)
                setIsServiceActive(true)
                setServiceStartTime(new Date())
                setServiceDuration('00:00:00')

                // Update statistics
                setStats(prev => ({
                    ...prev,
                    waitingList: Math.max(0, prev.waitingList - 1),
                    serviceDone: prev.serviceDone + 1
                }))

                // Refresh pending queue
                await fetchPending()
            } else {
                console.error('Failed to call next ticket')
            }
        } catch (error) {
            console.error('Error calling next ticket:', error)
        }
    }

    const startService = () => {
        if (current && !isServiceActive) {
            setIsServiceActive(true)
            setServiceStartTime(new Date())
            setServiceDuration('00:00:00')
        }
    }

    const pauseService = () => {
        setIsServiceActive(false)
        setServiceStartTime(null)
        setServiceDuration('00:00:00')
    }



    const completeService = async () => {
        if (!windowId || !current) return;

        try {
            // Mark current ticket as completed
            const res = await fetch('/api/queue/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    windowId,
                    ticketNumber: current.ticketNumber,
                    status: 'completed'
                }),
            })

            if (res.ok) {
                setIsServiceActive(false)
                setServiceStartTime(null)
                setServiceDuration('00:00:00')
                setCurrent(null)
                setStats(prev => ({ ...prev, serviceDone: prev.serviceDone + 1 }))

                // Refresh data
                await fetchCurrent()
                await fetchPending()
            }
        } catch (error) {
            console.error('Error completing service:', error)
        }
    }

    const callCurrent = async () => {
        if (!current) return;

        try {
            // Call current ticket (you can implement speaker announcement logic here)
            console.log('Calling current ticket:', current.ticketNumber)

            // Optional: Send to WebSocket for real-time announcements
            if (typeof window !== 'undefined' && window.WebSocket) {
                const ws = new WebSocket('ws://localhost:3005')
                ws.onopen = () => {
                    ws.send(JSON.stringify({
                        type: 'CALL_TICKET',
                        ticketNumber: current.ticketNumber,
                        windowId: windowId
                    }))
                    ws.close()
                }
            }

            // Show success feedback
            alert(`Calling ticket A${current.ticketNumber.toString().slice(-3)}`)
        } catch (error) {
            console.error('Error calling current ticket:', error)
        }
    }

    useEffect(() => {
        if (windowId !== null) {
            fetchCurrent()
            fetchPending()
            fetchWindowDetails()
            fetchPausedQueue()

            const interval = setInterval(() => {
                fetchCurrent()
                fetchPending()
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [windowId])

    const formatDate = () => {
        const now = new Date()
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {/* Header Navigation */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4 lg:space-x-8">
                            <h1 className="text-xl lg:text-2xl font-bold text-blue-600">Queue</h1>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex space-x-6">
                                <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </Link>
                                <Link href={`/queue/${windowId}`} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Queue
                                </Link>
                                <Link href="/transaction" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Transaction
                                </Link>
                                <Link href="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Administration
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-2 lg:space-x-4">
                            {/* Desktop Search */}
                            <div className="hidden md:block relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button className="text-gray-600 hover:text-blue-600">
                                <Bell className="h-5 w-5" />
                            </button>

                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">A</span>
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
                                <Link href={`/queue/${windowId}`} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Queue
                                </Link>
                                <Link href="/transaction" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Transaction
                                </Link>
                                <Link href="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Administration
                                </Link>
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

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 w-full">
                {/* Counter Info */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                    <div className="mb-4 lg:mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{details?.windowTitle || 'Counter'}</h2>
                        <p className="text-sm lg:text-base text-gray-600">{formatDate()}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{details?.windowTitle || 'Counter'}</h2>
                        <p className="text-sm lg:text-base text-gray-600">{formatDate()}</p>
                    </div>
                </div>

                {/* Mobile Current Queue Card */}
                <div className="lg:hidden mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-orange-600 mb-2">
                                Current Queue: {current ? `A${current.ticketNumber.toString().slice(-3)}` : '---'}
                            </h3>
                            <div className="text-base text-gray-600">
                                Service Time: {serviceDuration}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {!isServiceActive ? (
                                <button
                                    onClick={startService}
                                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Play className="h-4 w-4" />
                                    <span>Start</span>
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={pauseService}
                                        className="flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <Pause className="h-4 w-4" />
                                        <span>Pause</span>
                                    </button>
                                    <button
                                        onClick={completeService}
                                        className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        <span>Done</span>
                                    </button>
                                </>
                            )}

                            <button
                                onClick={callCurrent}
                                className="flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <Volume2 className="h-4 w-4" />
                                <span>Call</span>
                            </button>

                            <button
                                onClick={callNext}
                                className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <ChevronsRight className="h-4 w-4" />
                                <span>Next</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">

                    {/* Center Column - Current Queue (Desktop) */}
                    <div className=" ">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-orange-600 mb-2">
                                    Current Queue: {current ? `A${current.ticketNumber.toString().slice(-3)}` : '---'}
                                </h3>
                            </div>

                            <div className="flex flex-col space-y-3">
                                {!isServiceActive ? (
                                    <button
                                        onClick={startService}
                                        className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <ChevronsLeft className="h-4 w-4" />
                                        <span>Previous</span>
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={pauseService}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            <Pause className="h-4 w-4" />
                                            <span>Pause</span>
                                        </button>
                                        <button
                                            onClick={completeService}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                            <span>Done</span>
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={callCurrent}
                                    className="flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <Volume2 className="h-4 w-4" />
                                    <span>Call</span>
                                </button>

                                <button
                                    onClick={callNext}
                                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                    <span>Next</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pending Queue Table */}
                    <div className="bg-white rounded-lg shadow-sm border order-4 w-full">
                        <div className="p-4 lg:p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">Pending Queue</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th>
                                        <th className="hidden md:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="hidden lg:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pending.length > 0 ? (
                                        pending.map((item, index) => (
                                            <tr key={item.ticketNumber} className="hover:bg-gray-50">
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    A{item.ticketNumber.toString().slice(-3)}
                                                </td>
                                                <td className="hidden md:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.studentId}
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.firstName} {item.lastName}
                                                </td>
                                                <td className="hidden lg:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    00:05:30
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 lg:px-6 py-4 text-center text-sm text-gray-500">
                                                No pending tickets
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Logos Section */}
                    <div className="flex justify-center items-center space-x-8 mb-6">
                        {/* University Logo */}

                        <img src="/assets/dorsu_logo.png" alt="DOrSU" width={80} height={80} />

                        {/* Divider */}
                        <div className="w-px h-12 bg-gray-300"></div>
                        {/* Systems Division Logo */}
                        <img src="/assets/iitso_logo.jpg" alt="DOrSU" width={80} height={80} />
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-gray-300 mb-6"></div>

                    {/* Text Content */}
                    <div className="text-center space-y-2">
                        <p className="text-sm lg:text-base text-gray-700 font-medium">
                            Davao Oriental State University - BC • Innovate Information Technology Students Organization
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600">
                            Copyright © 2025. All Rights Reserved.{' '}
                            <Link href="/terms" className="underline hover:text-gray-800">Terms of Use</Link>
                            {' | '}
                            <Link href="/privacy" className="underline hover:text-gray-800">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </footer>

            {/* Clear Queue Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Clear Queue</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete all tickets from the current queue.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <button onClick={closeDialog} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                        <button onClick={closeDialog} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                            Clear Queue
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
