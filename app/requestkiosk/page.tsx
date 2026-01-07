"use client";
import { useState, useEffect } from "react";
import { Ticket, Clock, CheckCircle, Settings, X } from "lucide-react";

type QueeWindow = {
  id: number;
  windowTitle: string;
  windowDescription: string;
};

type RecentTicket = {
  ticketNumber: number;
  createdAt: string;
  status: string;
  window: {
    windowTitle: string;
    windowDescription: string;
  };
};

export default function RequestKiosk() {
  const [windows, setWindows] = useState<QueeWindow[]>([]);
  const [recentTickets, setRecentTickets] = useState<RecentTicket[]>([]);
  const [selectedWindow, setSelectedWindow] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [error, setError] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [serverUrl, setServerUrl] = useState<string>("");
  const [tempServerUrl, setTempServerUrl] = useState<string>("");

  const getApiUrl = (endpoint: string) => {
    if (serverUrl) {
      return `${serverUrl}${endpoint}`;
    }
    return endpoint;
  };

  const fetchWindows = async () => {
    try {
      const res = await fetch(getApiUrl("/api/window/list"));
      if (res.ok) {
        const data = await res.json();
        setWindows(data);
      }
    } catch (error) {
      console.error("Error fetching windows:", error);
      setError("Failed to connect to server. Check settings.");
    }
  };

  const fetchRecentTickets = async () => {
    try {
      const res = await fetch(getApiUrl("/api/queue/recent"));
      if (res.ok) {
        const data = await res.json();
        setRecentTickets(data);
      }
    } catch (error) {
      console.error("Error fetching recent tickets:", error);
    }
  };

  const saveServerUrl = () => {
    let url = tempServerUrl.trim();

    // Validate and format URL
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }

    // Remove trailing slash
    url = url.replace(/\/$/, "");

    setServerUrl(url);
    localStorage.setItem("kioskServerUrl", url);
    setShowSettings(false);
    setError("");

    // Refresh data with new URL
    fetchWindows();
    fetchRecentTickets();
  };

  const resetToLocalhost = () => {
    setServerUrl("");
    setTempServerUrl("");
    localStorage.removeItem("kioskServerUrl");
    setShowSettings(false);
    fetchWindows();
    fetchRecentTickets();
  };

  const generateTicket = async () => {
    if (!selectedWindow) {
      setError("Please select a service window");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch(getApiUrl("/api/queue/new"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: "---",
          firstName: "---",
          lastName: "---",
          windowId: selectedWindow,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedTicket(data.ticketNumber);
        setShowSuccess(true);
        setSelectedWindow(null);

        // Refresh recent tickets
        await fetchRecentTickets();

        // Auto-close success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        setError("Failed to generate ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error generating ticket:", error);
      setError("Network error. Check server connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load server URL from localStorage
  useEffect(() => {
    const savedUrl = localStorage.getItem("kioskServerUrl");
    if (savedUrl) {
      setServerUrl(savedUrl);
      setTempServerUrl(savedUrl);
    }
  }, []);

  // Fetch data on mount and refresh every 10 seconds
  useEffect(() => {
    fetchWindows();
    fetchRecentTickets();

    const interval = setInterval(() => {
      fetchRecentTickets();
    }, 10000);

    return () => clearInterval(interval);
  }, [serverUrl]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 overflow-hidden">
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-lg mx-4 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Server Settings
                </h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Server IP Address or URL
              </label>
              <input
                type="text"
                value={tempServerUrl}
                onChange={(e) => setTempServerUrl(e.target.value)}
                placeholder="e.g., 192.168.1.100:3000 or http://server:3000"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              />
              <p className="mt-2 text-sm text-gray-600">
                Enter the IP address and port of the server running the queue
                system. Leave empty to use localhost.
              </p>
              {serverUrl && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    Current:{" "}
                    <span className="font-mono">
                      {serverUrl || "localhost"}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveServerUrl}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                Save Settings
              </button>
              <button
                onClick={resetToLocalhost}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Make sure the server is accessible from
                this device. Test the connection after saving.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-4 text-center transform animate-in zoom-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ticket Generated!
            </h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 mb-6">
              <p className="text-lg mb-2 opacity-90">Your Ticket Number</p>
              <p className="text-6xl md:text-7xl font-bold">
                {generatedTicket && `10${generatedTicket.toString().slice(-3)}`}
              </p>
            </div>
            <p className="text-gray-600 text-lg">
              Please wait for your number to be called
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Kiosk Interface */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-xl md:text-2xl font-bold">Kyuu.</h1>
                <p className="text-sm opacity-80">Get your ticket number</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSettings(true)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                title="Server Settings"
              >
                <Settings className="w-6 h-6 text-white" />
              </button>
              <div className="text-right text-white">
                <div className="text-xl md:text-2xl font-bold tabular-nums">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs md:text-sm opacity-80">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Column - Service Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Ticket className="w-8 h-8 text-blue-600" />
                  Select Service Window
                </h2>

                {error && (
                  <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {windows.map((window) => (
                    <button
                      key={window.id}
                      onClick={() => {
                        setSelectedWindow(window.id);
                        setError("");
                      }}
                      className={`p-6 rounded-2xl border-3 transition-all duration-200 text-left ${
                        selectedWindow === window.id
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-600 shadow-lg scale-105"
                          : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <h3
                        className={`text-xl md:text-2xl font-bold mb-2 ${
                          selectedWindow === window.id
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {window.windowTitle}
                      </h3>
                      <p
                        className={`text-sm ${
                          selectedWindow === window.id
                            ? "text-white/90"
                            : "text-gray-600"
                        }`}
                      >
                        {window.windowDescription}
                      </p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={generateTicket}
                  disabled={!selectedWindow || isGenerating}
                  className={`w-full py-6 rounded-2xl font-bold text-xl md:text-2xl transition-all duration-200 flex items-center justify-center gap-3 ${
                    selectedWindow && !isGenerating
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Ticket className="w-8 h-8" />
                  {isGenerating ? "Generating..." : "Get Ticket Number"}
                </button>
              </div>
            </div>

            {/* Right Column - Recent Tickets */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Recent Tickets
                  </h3>
                </div>

                <div className="flex-1 overflow-auto space-y-3">
                  {recentTickets.length > 0 ? (
                    recentTickets.map((ticket, index) => (
                      <div
                        key={ticket.ticketNumber}
                        className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-blue-600">
                            10{ticket.ticketNumber.toString().slice(-3)}
                          </span>
                          <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                            {getTimeSince(ticket.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <p className="text-sm font-semibold text-gray-700">
                            {ticket.window.windowTitle}
                          </p>
                        </div>
                        <div
                          className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            ticket.status === "waiting"
                              ? "bg-yellow-100 text-yellow-800"
                              : ticket.status === "called"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {ticket.status.charAt(0).toUpperCase() +
                            ticket.status.slice(1)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Ticket className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-sm">No recent tickets</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-white text-sm">
            <p className="opacity-90">DOrSU Banaybanay Campus / ITTSO</p>
            {serverUrl && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono">
                  {serverUrl.replace(/^https?:\/\//, "")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
