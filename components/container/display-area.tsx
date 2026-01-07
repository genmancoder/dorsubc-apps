"use client";

import { useState, useEffect, useRef } from "react";
import { Window } from "../window";
import { Cog } from "lucide-react";
type QueeWindow = {
  id: number;
  windowTitle: string;
  windowDescription: string;
};

export function DisplayArea() {
  const [windows, setWindows] = useState<QueeWindow[]>([]);
  const [displayCount, setDisplayCount] = useState<number | "all">("all");
  const [layout, setLayout] = useState<"grid" | "row" | "column">("grid");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  // const audioUnlocked = useRef(false);

  const audioQueue = useRef<SpeechSynthesisUtterance[]>([]);

  type DisplaySettings = {
    pinnedWindows: number[]; // IDs of pinned windows
    visibleWindows: number[]; // IDs of windows to display
    minimalView: boolean; // new setting
  };

  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    pinnedWindows: [],
    visibleWindows: [],
    minimalView: false,
  });

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
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("displaySettings");
    if (saved) {
      setDisplaySettings(JSON.parse(saved));
    }
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
    const res = await fetch("/api/window/list");
    if (res.ok) {
      const data = await res.json();
      setWindows(data);
    }
  };

  useEffect(() => {
    fetchWindows();
    const interval = setInterval(fetchWindows, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ws = new WebSocket(process.env.WS_URL || "ws://10.10.115.21:3005");
    socketRef.current = ws;

    ws.onopen = () => console.log("Display Area: WS connected");

    ws.onmessage = (event) => {
      console.log("WS message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.type === "CALL_TICKET") {
          enqueueAudio(`Now serving ticket number ${data.ticketNumber}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    return () => ws.close();
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
  const gridClasses =
    layout === "grid"
      ? "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-min"
      : layout === "row"
      ? "flex flex-row flex-wrap gap-4"
      : "flex flex-col gap-4";

  return (
    <div className="w-full p-4">
      {/* Settings Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setSettingsOpen(true)}
          className="fixed top-4 right-1 -translate-x-1/2 z-50 bg-blue-100 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <Cog />
        </button>
      </div>

      {/* Settings Dialog */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Display Settings</h2>

            <div className="mb-4">
              <label className="block font-medium mb-1">
                Number of windows:
              </label>
              <select
                value={displayCount}
                onChange={(e) =>
                  setDisplayCount(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className="w-full border rounded px-2 py-1"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value="all">All</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Layout:</label>
              <select
                value={layout}
                onChange={(e) =>
                  setLayout(e.target.value as "grid" | "row" | "column")
                }
                className="w-full border rounded px-2 py-1"
              >
                <option value="grid">Grid</option>
                <option value="row">Row</option>
                <option value="column">Column</option>
              </select>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Pin Windows</h3>
              <div className="flex flex-wrap gap-2">
                {windows.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      const newPinned = displaySettings.pinnedWindows.includes(
                        w.id
                      )
                        ? displaySettings.pinnedWindows.filter(
                            (id) => id !== w.id
                          )
                        : [...displaySettings.pinnedWindows, w.id];
                      setDisplaySettings({
                        ...displaySettings,
                        pinnedWindows: newPinned,
                      });
                    }}
                    className={`px-3 py-1 rounded border ${
                      displaySettings.pinnedWindows.includes(w.id)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {w.windowTitle}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Select Queues to Display</h3>
              <div className="flex flex-wrap gap-2">
                {windows.map((w) => (
                  <label key={w.id} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={displaySettings.visibleWindows.includes(w.id)}
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
                    />
                    {w.windowTitle}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="minimalView"
                checked={displaySettings.minimalView}
                onChange={() =>
                  setDisplaySettings({
                    ...displaySettings,
                    minimalView: !displaySettings.minimalView,
                  })
                }
              />
              <label htmlFor="minimalView" className="font-semibold">
                Minimal Window View
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSettingsOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Windows Display */}
      {windows.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-min">
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
                minimal={displaySettings.minimalView} // pass prop
              />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No windows available</p>
      )}
    </div>
  );
}
