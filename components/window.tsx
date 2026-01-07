"use client";

import { useState, useEffect } from "react";
import { Clock, Users, Volume2 } from "lucide-react";

type Queue = {
  ticketNumber: number;
  firstName: string;
  lastName: string;
  studentId: string;
  createdAt: string;
};

type WindowProps = {
  title: string;
  windowId: number;
  minimal?: boolean;
};

export function Window({ title, windowId }: WindowProps) {
  const [current, setCurrent] = useState<Queue | null>(null);
  const [pending, setPending] = useState<Queue[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchCurrent = async () => {
    try {
      const res = await fetch("/api/queue/current/" + windowId);
      if (res.ok) {
        const data = await res.json();
        setCurrent(data);
      } else {
        setCurrent(null);
      }
    } catch (error) {
      console.error("Error fetching current ticket:", error);
      setCurrent(null);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/queue/pending/" + windowId);
      if (res.ok) {
        const data = await res.json();
        setPending(data);
      }
    } catch (error) {
      console.error("Error fetching pending tickets:", error);
    }
  };

  const refreshData = () => {
    fetchCurrent();
    fetchPending();
  };

  // Update current time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, [windowId]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
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

  const pendingQueue = pending?.slice(0, 3); // Show exactly 3 pending tickets

  return (
    <div
      className="
        bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden 
        transition-all duration-300 hover:shadow-xl

        w-full max-w-sm     /* Mobile friendly width */
        h-auto md:h-[600px] /* Auto height on mobile */
        min-w-[200px] md:min-w-[250px] /* Minimum width */
        flex flex-col
      "
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex-shrink-0">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-1 truncate">{title}</h2>
          <p className="text-xs text-blue-100 opacity-90 truncate">
            {formatDate(currentTime)}
          </p>
        </div>
      </div>

      {/* Current Time */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-center space-x-2">
          <Clock className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-mono text-gray-700">
            {formatTime(currentTime)}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Now Serving Section */}
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-3 flex items-center justify-center">
            <Volume2 className="h-4 w-4 mr-2 text-blue-600" />
            Now Serving
          </h3>
          <div className="flex justify-center">
            {current ? (
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-3 rounded-lg shadow-md w-full max-w-[200px] text-center">
                <div className="text-2xl font-bold mb-1">
                  10{current.ticketNumber.toString().slice(-3)}
                </div>
                <div className="text-xs opacity-90 truncate">
                  {current.firstName} {current.lastName}
                </div>
                <div className="text-xs opacity-75 mt-1 truncate">
                  {current.studentId}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-3 rounded-lg shadow-md w-full max-w-[200px] text-center">
                <div className="text-2xl font-bold mb-1">----</div>
                <div className="text-xs opacity-90 truncate">
                  No active service
                </div>
                <div className="text-xs opacity-75 mt-1 truncate">----</div>
              </div>
            )}
          </div>
        </div>

        {/* On Queue Section */}
        <div className="flex-1">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-3 flex items-center justify-center">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            {pendingQueue?.length > 0
              ? "Next 3 in Queue"
              : "No tickets in Queue."}
          </h3>

          <div className="space-y-2">
            {pendingQueue?.length > 0 ? (
              pendingQueue.map((ticket, index) => (
                <div
                  key={ticket.ticketNumber}
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    index === 0
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        index === 0
                          ? "bg-blue-600 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="font-bold text-base text-gray-800 truncate">
                      10{ticket.ticketNumber.toString().slice(-3)}
                    </span>
                  </div>
                  <div className="text-right min-w-0 flex-shrink-0 ml-2">
                    <div className="text-xs text-gray-500 truncate">
                      {ticket.firstName} {ticket.lastName}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {ticket.studentId}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                <div className="text-base font-semibold mb-1">
                  No pending tickets
                </div>
                <div className="text-xs">Queue is empty</div>
              </div>
            )}

            {/* Show empty slots if less than 3 tickets */}
            {pendingQueue?.length < 3 &&
              pendingQueue?.length > 0 &&
              Array.from({ length: 3 - pendingQueue.length }, (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200 opacity-50"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gray-300 text-gray-500">
                      {pendingQueue.length + i + 1}
                    </div>
                    <span className="font-bold text-base text-gray-400 truncate">
                      ---
                    </span>
                  </div>
                  <div className="text-right min-w-0 flex-shrink-0 ml-2">
                    <div className="text-xs text-gray-400 truncate">
                      Waiting...
                    </div>
                    <div className="text-xs text-gray-300 truncate">---</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Statistics Footer */}
        <div className="border-t border-gray-200 pt-3 mt-3 flex-shrink-0">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-lg font-bold text-blue-600">
                {pending?.length || 0}
              </div>
              <div className="text-xs text-blue-700 font-medium">Pending</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <div className="text-lg font-bold text-green-600">
                {current ? 1 : 0}
              </div>
              <div className="text-xs text-green-700 font-medium">Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div
        className={`h-1 flex-shrink-0 ${
          current
            ? "bg-gradient-to-r from-green-500 to-green-600"
            : "bg-gradient-to-r from-gray-400 to-gray-500"
        }`}
      ></div>
    </div>
  );
}
