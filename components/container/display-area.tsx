"use client";

import { useState, useEffect, useRef } from "react";
import { Window } from "../window";
import {
  Cog,
  X,
  Video,
  Layout,
  Monitor,
  Eye,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

type QueeWindow = {
  id: number;
  windowTitle: string;
  windowDescription: string;
};

type Announcement = {
  id: number;
  title: string;
  message: string;
  type: string;
  isActive: boolean;
  priority: number;
  createdAt: string;
};

export function DisplayArea() {
  const [windows, setWindows] = useState<QueeWindow[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [displayCount, setDisplayCount] = useState<number | "all">("all");
  const [layout, setLayout] = useState<"grid" | "row" | "column">("grid");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"display" | "windows" | "media">(
    "display"
  );

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isManualCloseRef = useRef(false);
  const [wsConnected, setWsConnected] = useState(false);
  const audioQueue = useRef<SpeechSynthesisUtterance[]>([]);

  type DisplaySettings = {
    pinnedWindows: number[]; // IDs of pinned windows
    visibleWindows: number[]; // IDs of windows to display
    minimalView: boolean;
    showVideoColumn: boolean; // Enable two-column layout
    videoUrl: string; // YouTube embed or video URL
    videoPosition: "left" | "right"; // Position of video column
    columnsRatio: number; // Ratio between windows and video (50-80)
  };

  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    pinnedWindows: [],
    visibleWindows: [],
    minimalView: false,
    showVideoColumn: false,
    videoUrl: "",
    videoPosition: "right",
    columnsRatio: 70, // 70% for windows, 30% for video
  });

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements");
      if (res.ok) {
        const data = await res.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Fetch admin display settings and merge with local settings
  const fetchAdminSettings = async () => {
    try {
      const res = await fetch("/api/display-settings");
      if (res.ok) {
        const adminSettings = await res.json();

        // Merge admin settings with local settings (local overrides admin)
        const saved = localStorage.getItem("displaySettings");
        if (saved) {
          const localSettings = JSON.parse(saved);
          setDisplaySettings({
            ...displaySettings,
            // Use admin settings as defaults
            showVideoColumn:
              adminSettings.videoEnabled || localSettings.showVideoColumn,
            videoUrl: localSettings.videoUrl || adminSettings.videoUrl || "",
            videoPosition:
              localSettings.videoPosition ||
              adminSettings.videoPosition ||
              "right",
            columnsRatio:
              localSettings.columnsRatio || adminSettings.videoRatio || 70,
            // Keep local user preferences
            pinnedWindows: localSettings.pinnedWindows || [],
            visibleWindows: localSettings.visibleWindows || [],
            minimalView: localSettings.minimalView || false,
          });
        } else {
          // No local settings, use admin defaults
          setDisplaySettings({
            ...displaySettings,
            showVideoColumn: adminSettings.videoEnabled || false,
            videoUrl: adminSettings.videoUrl || "",
            videoPosition: adminSettings.videoPosition || "right",
            columnsRatio: adminSettings.videoRatio || 70,
          });
        }

        // Set layout from admin settings if not already set locally
        const savedLayout = localStorage.getItem("layout");
        if (!savedLayout && adminSettings.defaultLayout) {
          setLayout(adminSettings.defaultLayout);
        }
      }
    } catch (error) {
      console.error("Error fetching admin settings:", error);
    }
  };

  // --- Read settings from localStorage on mount ---
  useEffect(() => {
    const savedDisplayCount = localStorage.getItem("displayCount");
    const savedLayout = localStorage.getItem("layout");

    if (savedDisplayCount) {
      setDisplayCount(
        savedDisplayCount === "all" ? "all" : Number(savedDisplayCount)
      );
    }
    if (
      savedLayout === "grid" ||
      savedLayout === "row" ||
      savedLayout === "column"
    ) {
      setLayout(savedLayout);
    }

    // Fetch admin settings and announcements
    fetchAdminSettings();
    fetchAnnouncements();
  }, []);

  // Save whenever displaySettings changes
  useEffect(() => {
    localStorage.setItem("displaySettings", JSON.stringify(displaySettings));
  }, [displaySettings]);

  // --- Persist settings to localStorage whenever they change ---
  useEffect(() => {
    localStorage.setItem("displayCount", displayCount.toString());
  }, [displayCount]);

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);

  const fetchWindows = async () => {
    try {
      const res = await fetch("/api/window/list");
      if (res.ok) {
        const data = await res.json();
        setWindows(data);
      } else {
        console.error("Failed to fetch windows:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching windows:", error);
    }
  };

  useEffect(() => {
    fetchWindows();
    // Refresh announcements periodically
    const windowsInterval = setInterval(fetchWindows, 30000); // 30 seconds fallback
    const announcementsInterval = setInterval(fetchAnnouncements, 60000); // 1 minute

    return () => {
      clearInterval(windowsInterval);
      clearInterval(announcementsInterval);
    };
  }, []);

  const connectWebSocket = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3005";

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("Display Area: WS connected");
        setWsConnected(true);
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "CALL_TICKET") {
            enqueueAudio(`Now serving ticket number ${data.ticketNumber}`);
          } else if (data.type === "QUEUE_UPDATE") {
            // Trigger refresh of windows when queue updates
            fetchWindows();
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
        socketRef.current = null;

        // Attempt to reconnect if not manually closed
        if (!isManualCloseRef.current && event.code !== 1000) {
          const maxAttempts = 10;
          const baseDelay = 1000; // Start with 1 second

          if (reconnectAttemptsRef.current < maxAttempts) {
            const delay = Math.min(
              baseDelay * Math.pow(2, reconnectAttemptsRef.current),
              30000 // Max 30 seconds
            );

            reconnectAttemptsRef.current++;
            console.log(
              `Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${maxAttempts})...`
            );

            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket();
            }, delay);
          } else {
            console.error(
              "Max reconnection attempts reached. Please refresh the page."
            );
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
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  const enqueueAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      audioQueue.current.shift();
      if (audioQueue.current.length > 0) {
        speechSynthesis.speak(audioQueue.current[0]);
      }
    };

    audioQueue.current.push(utterance);
    if (audioQueue.current.length === 1) {
      speechSynthesis.speak(utterance);
    }
  };

  // Determine windows to display
  const displayedWindows =
    displayCount === "all" ? windows : windows.slice(0, displayCount);

  // Determine classes based on layout
  const getGridClasses = () => {
    if (displaySettings.showVideoColumn) {
      // Adjust grid for two-column layout
      return "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min";
    }

    if (layout === "grid") {
      return "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-min";
    } else if (layout === "row") {
      return "flex flex-row flex-wrap gap-3 sm:gap-4";
    } else {
      return "flex flex-col gap-3 sm:gap-4";
    }
  };

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    // Handle YouTube URLs
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}`;
    }

    return url; // Return as-is for other URLs
  };

  // Get announcement icon based on type
  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 flex-shrink-0" />;
      case "error":
        return <AlertCircle className="h-5 w-5 flex-shrink-0" />;
      default:
        return <Info className="h-5 w-5 flex-shrink-0" />;
    }
  };

  // Get announcement styling based on type
  const getAnnouncementStyle = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-full mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Monitor className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Kyuu. Display Board
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Real-time queue monitoring system
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Connection Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50">
                <div
                  className={`w-2 h-2 rounded-full ${
                    wsConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                  }`}
                  title={wsConnected ? "Connected" : "Disconnected"}
                />
                <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline font-medium">
                  {wsConnected ? "Live" : "Offline"}
                </span>
              </div>

              {/* Settings Button */}
              <button
                onClick={() => setSettingsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-2.5 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              >
                <Cog className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline">
                  Settings
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Banner */}
      {announcements.length > 0 && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-full mx-auto px-3 sm:px-6 py-3">
            <div className="space-y-2">
              {announcements.slice(0, 3).map((announcement) => (
                <div
                  key={announcement.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${getAnnouncementStyle(
                    announcement.type
                  )} animate-fade-in`}
                >
                  {getAnnouncementIcon(announcement.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base">
                      {announcement.title}
                    </div>
                    <div className="text-xs sm:text-sm mt-1 opacity-90">
                      {announcement.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Settings Dialog */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Display Settings
                </h2>
                <p className="text-sm text-blue-100 mt-1">
                  Customize your queue display
                </p>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b bg-gray-50 px-6">
              <div className="flex gap-2 sm:gap-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("display")}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "display"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Layout className="inline h-4 w-4 mr-2" />
                  Layout
                </button>
                <button
                  onClick={() => setActiveTab("windows")}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "windows"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Eye className="inline h-4 w-4 mr-2" />
                  Windows (
                  {displaySettings.visibleWindows.length || windows.length})
                </button>
                <button
                  onClick={() => setActiveTab("media")}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "media"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Video className="inline h-4 w-4 mr-2" />
                  Media
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6">
              {activeTab === "display" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Layout Style
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "grid", label: "Grid", icon: "⊞" },
                        { value: "row", label: "Row", icon: "▬" },
                        { value: "column", label: "Column", icon: "⋮" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setLayout(opt.value as any)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            layout === opt.value
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <div className="text-2xl mb-1">{opt.icon}</div>
                          <div className="text-sm font-medium">{opt.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Display Options
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={displaySettings.minimalView}
                          onChange={() =>
                            setDisplaySettings({
                              ...displaySettings,
                              minimalView: !displaySettings.minimalView,
                            })
                          }
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            Minimal View
                          </div>
                          <div className="text-xs text-gray-500">
                            Compact window display
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "windows" && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-semibold text-gray-700">
                        Select Windows to Display
                      </label>
                      <button
                        onClick={() => {
                          const allIds = windows.map((w) => w.id);
                          setDisplaySettings({
                            ...displaySettings,
                            visibleWindows:
                              displaySettings.visibleWindows.length ===
                              windows.length
                                ? []
                                : allIds,
                          });
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {displaySettings.visibleWindows.length ===
                        windows.length
                          ? "Deselect All"
                          : "Select All"}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {windows.map((w) => (
                        <label
                          key={w.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            displaySettings.visibleWindows.length === 0 ||
                            displaySettings.visibleWindows.includes(w.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={
                              displaySettings.visibleWindows.length === 0 ||
                              displaySettings.visibleWindows.includes(w.id)
                            }
                            onChange={() => {
                              const newVisible =
                                displaySettings.visibleWindows.includes(w.id)
                                  ? displaySettings.visibleWindows.filter(
                                      (id) => id !== w.id
                                    )
                                  : [...displaySettings.visibleWindows, w.id];
                              setDisplaySettings({
                                ...displaySettings,
                                visibleWindows: newVisible,
                              });
                            }}
                            className="mt-1 w-5 h-5 text-blue-600 rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate">
                              {w.windowTitle}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {w.windowDescription}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Pin Windows (Show First)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {windows.map((w) => (
                        <button
                          key={w.id}
                          onClick={() => {
                            const newPinned =
                              displaySettings.pinnedWindows.includes(w.id)
                                ? displaySettings.pinnedWindows.filter(
                                    (id) => id !== w.id
                                  )
                                : [...displaySettings.pinnedWindows, w.id];
                            setDisplaySettings({
                              ...displaySettings,
                              pinnedWindows: newPinned,
                            });
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            displaySettings.pinnedWindows.includes(w.id)
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {displaySettings.pinnedWindows.includes(w.id)
                            ? "📌 "
                            : ""}
                          {w.windowTitle}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={displaySettings.showVideoColumn}
                        onChange={() =>
                          setDisplaySettings({
                            ...displaySettings,
                            showVideoColumn: !displaySettings.showVideoColumn,
                          })
                        }
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          Enable Video Column
                        </div>
                        <div className="text-xs text-gray-500">
                          Show video/advertisement alongside windows
                        </div>
                      </div>
                    </label>
                  </div>

                  {displaySettings.showVideoColumn && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Video URL
                        </label>
                        <input
                          type="text"
                          value={displaySettings.videoUrl}
                          onChange={(e) =>
                            setDisplaySettings({
                              ...displaySettings,
                              videoUrl: e.target.value,
                            })
                          }
                          placeholder="Paste YouTube URL or video embed URL"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Supports YouTube links (e.g.,
                          https://youtube.com/watch?v=...)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Video Position
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: "left", label: "Left Side" },
                            { value: "right", label: "Right Side" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() =>
                                setDisplaySettings({
                                  ...displaySettings,
                                  videoPosition: opt.value as "left" | "right",
                                })
                              }
                              className={`p-3 rounded-lg border-2 transition-all ${
                                displaySettings.videoPosition === opt.value
                                  ? "border-blue-600 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-sm font-medium">
                                {opt.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Windows Width: {displaySettings.columnsRatio}%
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="80"
                          step="5"
                          value={displaySettings.columnsRatio}
                          onChange={(e) =>
                            setDisplaySettings({
                              ...displaySettings,
                              columnsRatio: Number(e.target.value),
                            })
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>50%</span>
                          <span>65%</span>
                          <span>80%</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setSettingsOpen(false)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
              >
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-3 sm:p-6">
        {displaySettings.showVideoColumn ? (
          /* Two-Column Layout: Windows + Video */
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Windows Column */}
            <div
              className={`flex-1 ${
                displaySettings.videoPosition === "left"
                  ? "lg:order-2"
                  : "lg:order-1"
              }`}
              style={{
                flexBasis: `${displaySettings.columnsRatio}%`,
              }}
            >
              {windows.length > 0 ? (
                <div className={getGridClasses()}>
                  {windows
                    .filter(
                      (w) =>
                        displaySettings.visibleWindows.length === 0 ||
                        displaySettings.visibleWindows.includes(w.id)
                    )
                    .sort((a, b) => {
                      const aPinned = displaySettings.pinnedWindows.includes(
                        a.id
                      )
                        ? -1
                        : 0;
                      const bPinned = displaySettings.pinnedWindows.includes(
                        b.id
                      )
                        ? -1
                        : 0;
                      return aPinned - bPinned;
                    })
                    .map((w) => (
                      <Window
                        key={w.id}
                        title={w.windowTitle}
                        windowId={w.id}
                        minimal={displaySettings.minimalView}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No windows available</p>
                </div>
              )}
            </div>

            {/* Video Column */}
            <div
              className={`flex-shrink-0 ${
                displaySettings.videoPosition === "left"
                  ? "lg:order-1"
                  : "lg:order-2"
              }`}
              style={{
                flexBasis: `${100 - displaySettings.columnsRatio}%`,
              }}
            >
              <div className="sticky top-24 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Video className="h-5 w-5" />
                  </h3>
                </div>
                {displaySettings.videoUrl ? (
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={getEmbedUrl(displaySettings.videoUrl)}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No video configured</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Add a video URL in settings
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Single Column Layout: Windows Only */
          <div>
            {windows.length > 0 ? (
              <div className={getGridClasses()}>
                {windows
                  .filter(
                    (w) =>
                      displaySettings.visibleWindows.length === 0 ||
                      displaySettings.visibleWindows.includes(w.id)
                  )
                  .sort((a, b) => {
                    const aPinned = displaySettings.pinnedWindows.includes(a.id)
                      ? -1
                      : 0;
                    const bPinned = displaySettings.pinnedWindows.includes(b.id)
                      ? -1
                      : 0;
                    return aPinned - bPinned;
                  })
                  .map((w) => (
                    <Window
                      key={w.id}
                      title={w.windowTitle}
                      windowId={w.id}
                      minimal={displaySettings.minimalView}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Monitor className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-xl font-medium">
                  No windows available
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Windows will appear here once they are created
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
