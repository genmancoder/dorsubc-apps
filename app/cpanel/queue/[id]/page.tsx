"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { LogOut, Command } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  ChevronsRight,
  CheckCircle,
  Search,
  Bell,
  Menu,
  X,
  ChevronsLeft,
} from "lucide-react";
import UserHeader from "@/components/users/user-admin";

type Queue = {
  ticketNumber: number;
  firstName: string;
  lastName: string;
  studentId: string;
  createdAt: string;
};

type WindowDetails = {
  windowId: number;
  windowTitle: string;
  windowDescription: string;
};

type PausedQueue = {
  ticketNumber: number;
  firstName: string;
  lastName: string;
  studentId: string;
  startTime: string;
  duration: string;
};

export default function Queue() {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isManualCloseRef = useRef(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [current, setCurrent] = useState<Queue | null>(null);
  const [pending, setPending] = useState<Queue[]>([]);
  const [served, setServed] = useState<Queue[]>([]);
  const [pausedQueue, setPausedQueue] = useState<PausedQueue[]>([]);
  const [open, setOpen] = useState(false);
  const [serviceStartTime, setServiceStartTime] = useState<Date | null>(null);
  const [serviceDuration, setServiceDuration] = useState<string>("00:00:00");
  const [isServiceActive, setIsServiceActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [details, setDetails] = useState<WindowDetails | null>(null);

  const params = useParams();
  const router = useRouter();
  const [windowId, setWindowId] = useState<number | null>(null);

  const showDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  // Statistics
  const [, setStats] = useState({
    waitingList: 0,
    serviceDone: 0,
    totalIdleTime: "00:10:00",
    serviceDuration: "02:45:10",
  });

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchCurrent = async () => {
    if (!windowId) return;

    try {
      const res = await fetch("/api/queue/current/" + windowId);
      if (res.ok) {
        const data = await res.json();
        setCurrent(data);
        if (data && !isServiceActive) {
          setIsServiceActive(true);
          setServiceStartTime(new Date());
        } else if (!data && isServiceActive) {
          setIsServiceActive(false);
          setServiceStartTime(null);
        }
        setError(null);
      } else {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.error("Failed to fetch current:", errorData);
        setCurrent(null);
        setIsServiceActive(false);
        setServiceStartTime(null);
        setError(errorData.error || "Failed to fetch current ticket");
      }
    } catch (error) {
      console.error("Error fetching current ticket:", error);
      setError("Network error. Please check your connection.");
    }
  };

  const fetchWindowDetails = async () => {
    if (!windowId) return;

    try {
      const res = await fetch("/api/window/details/" + windowId);
      if (res.ok) {
        const data = await res.json();
        setDetails(data);
      } else {
        console.error("Failed to fetch window details");
        setDetails(null);
      }
    } catch (error) {
      console.error("Error fetching window details:", error);
    }
  };

  const fetchPending = async () => {
    if (!windowId) return;

    try {
      const res = await fetch("/api/queue/pending/" + windowId);
      if (res.ok) {
        const data = await res.json();
        setPending(data);
        setStats((prev) => ({ ...prev, waitingList: data.length }));
      } else {
        console.error("Failed to fetch pending queue");
      }
    } catch (error) {
      console.error("Error fetching pending queue:", error);
    }
  };

  const fetchServed = async () => {
    if (!windowId) return;

    try {
      const res = await fetch("/api/queue/served/" + windowId);
      if (res.ok) {
        const data = await res.json();
        setServed(data);
      } else {
        console.error("Failed to fetch served queue");
      }
    } catch (error) {
      console.error("Error fetching served queue:", error);
    }
  };

  const fetchPausedQueue = async () => {
    // Mock data for paused queue - you can implement actual API
    const mockPausedQueue: PausedQueue[] = [
      {
        ticketNumber: 10150,
        firstName: "John",
        lastName: "Doe",
        studentId: "2020-0001",
        startTime: "11:10",
        duration: "00:00:39",
      },
      {
        ticketNumber: 10151,
        firstName: "Jane",
        lastName: "Smith",
        studentId: "2020-0002",
        startTime: "11:15",
        duration: "00:00:15",
      },
      {
        ticketNumber: 10163,
        firstName: "Mike",
        lastName: "Johnson",
        studentId: "2020-0003",
        startTime: "12:22",
        duration: "00:00:52",
      },
    ];
    setPausedQueue(mockPausedQueue);
  };

  useEffect(() => {
    if (params?.id) {
      const parsed = Number(params.id);
      if (!isNaN(parsed)) {
        setWindowId(parsed);
      } else {
        console.error("Invalid windowId:", params);
      }
    }
  }, [params?.id]);

  // Helper function to broadcast queue updates
  const broadcastQueueUpdate = (action: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && windowId) {
      try {
        wsRef.current.send(
          JSON.stringify({
            type: "QUEUE_UPDATE",
            windowId: windowId,
            action: action,
          })
        );
      } catch (error) {
        console.error("Error broadcasting queue update:", error);
      }
    }
  };

  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3005";

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Queue Page: WS connected");
        setWsConnected(true);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "QUEUE_UPDATE" && data.windowId === windowId) {
            // Refresh data when queue updates for this window
            fetchCurrent();
            fetchPending();
            fetchServed();
          }
        } catch (err) {
          console.error("Error parsing WS message:", err);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setWsConnected(false);
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setWsConnected(false);
        wsRef.current = null;

        // Attempt to reconnect if not manually closed
        if (!isManualCloseRef.current && event.code !== 1000) {
          const maxAttempts = 10;
          const baseDelay = 1000;

          if (reconnectAttemptsRef.current < maxAttempts) {
            const delay = Math.min(
              baseDelay * Math.pow(2, reconnectAttemptsRef.current),
              30000
            );

            reconnectAttemptsRef.current++;
            console.log(
              `Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${maxAttempts})...`
            );

            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket();
            }, delay);
          } else {
            console.error("Max reconnection attempts reached.");
            setError("WebSocket connection lost. Please refresh the page.");
          }
        }
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      setWsConnected(false);
    }
  };

  useEffect(() => {
    isManualCloseRef.current = false;
    connectWebSocket();

    return () => {
      isManualCloseRef.current = true;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  // Service timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isServiceActive && serviceStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - serviceStartTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setServiceDuration(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isServiceActive, serviceStartTime]);

  const callNext = async () => {
    if (!windowId) return;

    try {
      const res = await fetch("/api/queue/next", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ windowId }),
      });

      if (res.ok) {
        const data = await res.json();
        setCurrent(data);
        setIsServiceActive(true);
        setServiceStartTime(new Date());
        setServiceDuration("00:00:00");

        // Update statistics
        setStats((prev) => ({
          ...prev,
          waitingList: Math.max(0, prev.waitingList - 1),
          serviceDone: prev.serviceDone + 1,
        }));

        // Refresh queues
        await fetchPending();
        await fetchServed();

        // Broadcast update via WebSocket
        broadcastQueueUpdate("next");
        setError(null);
      } else {
        const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
        console.error("Failed to call next ticket:", errorData);
        setError(errorData.message || "Failed to call next ticket");
      }
    } catch (error) {
      console.error("Error calling next ticket:", error);
      setError("Network error while calling next ticket");
    }
  };

  const startService = () => {
    if (current && !isServiceActive) {
      setIsServiceActive(true);
      setServiceStartTime(new Date());
      setServiceDuration("00:00:00");
    }
  };

  const pauseService = () => {
    setIsServiceActive(false);
    setServiceStartTime(null);
    setServiceDuration("00:00:00");
  };

  const completeService = async () => {
    if (!windowId || !current) return;

    try {
      // Mark current ticket as completed
      const res = await fetch("/api/queue/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          windowId,
          ticketNumber: current.ticketNumber,
          status: "completed",
        }),
      });

      if (res.ok) {
        setIsServiceActive(false);
        setServiceStartTime(null);
        setServiceDuration("00:00:00");
        setCurrent(null);
        setStats((prev) => ({ ...prev, serviceDone: prev.serviceDone + 1 }));

        // Refresh data
        await fetchCurrent();
        await fetchPending();
        await fetchServed();

        // Broadcast update via WebSocket
        broadcastQueueUpdate("complete");
        setError(null);
      } else {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        console.error("Error completing service:", errorData);
        setError(errorData.error || "Failed to complete service");
      }
    } catch (error) {
      console.error("Error completing service:", error);
      setError("Network error while completing service");
    }
  };

  const callCurrent = async () => {
    if (!current || !windowId) return;

    try {
      // Use existing WebSocket connection to broadcast call
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "CALL_TICKET",
            ticketNumber: current.ticketNumber,
            windowId: windowId,
          })
        );
        // Show success feedback
        setError(null);
        alert(`Calling ticket 10${current.ticketNumber.toString().slice(-3)}`);
      } else {
        console.error("WebSocket is not connected");
        setError("Cannot call ticket: WebSocket disconnected");
      }
    } catch (error) {
      console.error("Error calling current ticket:", error);
      setError("Failed to call ticket");
    }
  };

  useEffect(() => {
    if (windowId !== null) {
      fetchCurrent();
      fetchPending();
      fetchServed();
      fetchWindowDetails();
      fetchPausedQueue();

      // Reduced polling interval since WebSocket provides real-time updates
      // Keep as fallback in case WebSocket disconnects
      const interval = setInterval(() => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) {
          // Only poll if WebSocket is disconnected
          fetchCurrent();
          fetchPending();
          fetchServed();
        }
      }, 30000); // 30 seconds fallback

      return () => clearInterval(interval);
    }
  }, [windowId]);

  const formatDate = () => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${days[now.getDay()]}, ${now.getDate()} ${
      months[now.getMonth()]
    } ${now.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header Navigation */}
      <UserHeader />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 w-full">
        {/* Error Banner */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-700 font-medium">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Counter Info - Simplified */}
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {details?.windowTitle || "Counter"}
              </h2>
              <p className="text-sm lg:text-base text-gray-600 mt-1">{formatDate()}</p>
            </div>
            {/* Connection Status */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div
                className={`w-3 h-3 rounded-full ${
                  wsConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
                title={wsConnected ? "Connected" : "Disconnected"}
              />
              <span className="text-sm font-medium text-gray-700">
                {wsConnected ? "Live" : "Offline"}
              </span>
            </div>
          </div>
        </div>


        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Queue & Recently Called */}
          <div className="space-y-6">
            {/* Current Queue Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-700 mb-3">
                  Current Serving
                </h3>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="text-5xl font-bold mb-2">
                    {current
                      ? `10${current.ticketNumber.toString().slice(-3)}`
                      : "---"}
                  </div>
                  {current && (
                    <div className="text-sm opacity-90">
                      {current.firstName} {current.lastName}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Service Time: <span className="font-semibold">{serviceDuration}</span>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={callCurrent}
                  className="flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                  disabled={!current}
                >
                  <Volume2 className="h-5 w-5" />
                  <span className="font-medium">Call Ticket</span>
                </button>

                <div className="flex space-x-3">
                  {!isServiceActive ? (
                    <button
                      onClick={startService}
                      disabled={!current}
                      className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start</span>
                    </button>
                  ) : (
                    <button
                      onClick={pauseService}
                      className="flex-1 flex items-center justify-center space-x-2 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </button>
                  )}
                  <button
                    onClick={completeService}
                    disabled={!current}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Complete</span>
                  </button>
                </div>

                <button
                  onClick={callNext}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  <ChevronsRight className="h-5 w-5" />
                  <span className="font-medium">Call Next</span>
                </button>
              </div>
            </div>

            {/* Recently Called Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recently Called
              </h3>
              <div className="space-y-2">
                {served.length > 0 ? (
                  served.map((ticket, index) => (
                    <div
                      key={ticket.ticketNumber}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            10{ticket.ticketNumber.toString().slice(-3)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {ticket.firstName} {ticket.lastName}
                          </div>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No recently called tickets</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Pending Queue Table */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
            <div className="p-4 lg:p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Pending Queue
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pos
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket #
                    </th>
                    <th className="hidden md:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="hidden lg:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wait Time
                    </th>
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
                          10{item.ticketNumber.toString().slice(-3)}
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
                      <td
                        colSpan={5}
                        className="px-4 lg:px-6 py-4 text-center text-sm text-gray-500"
                      >
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

            <img
              src="/assets/dorsu_logo.png"
              alt="DOrSU"
              width={80}
              height={80}
            />

            {/* Divider */}
            <div className="w-px h-12 bg-gray-300"></div>
            {/* Systems Division Logo */}
            <img
              src="/assets/iitso_logo.jpg"
              alt="DOrSU"
              width={80}
              height={80}
            />
          </div>

          {/* Divider Line */}
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Text Content */}
          <div className="text-center space-y-2">
            <p className="text-sm lg:text-base text-gray-700 font-medium">
              Davao Oriental State University - BC • Innovate Information
              Technology Students Organization
            </p>
            <p className="text-xs lg:text-sm text-gray-600">
              Copyright © 2025. All Rights Reserved.{" "}
              <Link href="/terms" className="underline hover:text-gray-800">
                Terms of Use
              </Link>
              {" | "}
              <Link href="/privacy" className="underline hover:text-gray-800">
                Privacy Policy
              </Link>
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
              This action cannot be undone. This will permanently delete all
              tickets from the current queue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={closeDialog}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Clear Queue
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
