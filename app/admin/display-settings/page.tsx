"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/admin-header";
import { Monitor, Video, Save, RotateCcw } from "lucide-react";

export default function DisplaySettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    videoEnabled: false,
    videoUrl: "",
    videoPosition: "right",
    videoRatio: 70,
    defaultLayout: "grid",
    autoRefreshInterval: 30,
    showConnectionStatus: true,
  });

  useEffect(() => {
    checkAuth();
    fetchSettings();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/display-settings");
      if (res.ok) {
        const data = await res.json();
        setSettings({
          videoEnabled: data.videoEnabled || false,
          videoUrl: data.videoUrl || "",
          videoPosition: data.videoPosition || "right",
          videoRatio: data.videoRatio || 70,
          defaultLayout: data.defaultLayout || "grid",
          autoRefreshInterval: data.autoRefreshInterval || 30,
          showConnectionStatus: data.showConnectionStatus !== false,
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/display-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm("Reset to default settings?")) return;
    
    setSettings({
      videoEnabled: false,
      videoUrl: "",
      videoPosition: "right",
      videoRatio: 70,
      defaultLayout: "grid",
      autoRefreshInterval: 30,
      showConnectionStatus: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Display Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure default display board settings for all users
          </p>
        </div>

        <div className="space-y-6">
          {/* Video Settings */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Video className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Video/Advertisement Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Configure video display alongside queue windows
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.videoEnabled}
                    onChange={(e) =>
                      setSettings({ ...settings, videoEnabled: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      Enable Video Column
                    </div>
                    <div className="text-xs text-gray-500">
                      Show video/advertisement by default on display board
                    </div>
                  </div>
                </label>
              </div>

              {settings.videoEnabled && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Default Video URL
                    </label>
                    <input
                      type="text"
                      value={settings.videoUrl}
                      onChange={(e) =>
                        setSettings({ ...settings, videoUrl: e.target.value })
                      }
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      YouTube URL or video embed link. Users can override this in
                      their local settings.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video Position
                      </label>
                      <select
                        value={settings.videoPosition}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            videoPosition: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="left">Left Side</option>
                        <option value="right">Right Side</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Windows Width: {settings.videoRatio}%
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="80"
                        step="5"
                        value={settings.videoRatio}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            videoRatio: Number(e.target.value),
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
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Monitor className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Display Configuration
                </h2>
                <p className="text-sm text-gray-600">
                  Default layout and behavior settings
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Default Layout
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "grid", label: "Grid", icon: "⊞" },
                    { value: "row", label: "Row", icon: "▬" },
                    { value: "column", label: "Column", icon: "⋮" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setSettings({ ...settings, defaultLayout: opt.value })
                      }
                      className={`p-4 rounded-lg border-2 transition-all ${
                        settings.defaultLayout === opt.value
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Auto-Refresh Interval (seconds)
                </label>
                <input
                  type="number"
                  value={settings.autoRefreshInterval}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoRefreshInterval: Number(e.target.value),
                    })
                  }
                  min="10"
                  max="120"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Fallback polling interval when WebSocket is disconnected (10-120
                  seconds)
                </p>
              </div>

              <div>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showConnectionStatus}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        showConnectionStatus: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      Show Connection Status
                    </div>
                    <div className="text-xs text-gray-500">
                      Display real-time connection indicator in header
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Reset to Defaults
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> These settings apply as defaults for the display
            board. Users can still customize their local display settings using the
            settings button on the display page. Local settings will override these
            defaults.
          </p>
        </div>
      </div>
    </div>
  );
}

