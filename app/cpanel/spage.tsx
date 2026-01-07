"use client";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

type Queue = {
  ticketNumber: number;
  firstName: string;
  lastName: string;
  studentId: string;
};

export default function Admin() {
  const [current, setCurrent] = useState<Queue | null>(null);
  const [pending, setPending] = useState<Queue[]>([]);
  const [open, setOpen] = useState(false);

  const [currentTicket, setCurrentTicket] = useState<number | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioQueue = useRef<SpeechSynthesisUtterance[]>([]);

  useEffect(() => {
    // Load voices asynchronously
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Chrome may need this event
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const callTicket = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      console.log("Calling current ticket via WebSocket");
      const ticketNumber = Math.floor(Math.random() * 1000); // Example: random ticket
      socketRef.current.send(
        JSON.stringify({ type: "CALL_TICKET", ticketNumber })
      );
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  // Connect WebSocket
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3005");
    socketRef.current = ws;

    ws.onopen = () => console.log("WS connected");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "CALL_TICKET") {
          enqueueAudio(`Now serving ticket number ${data.ticketNumber}`);
          setCurrentTicket(data.ticketNumber);
        }
      } catch (err) {
        console.error(err);
      }
    };

    return () => ws.close();
  }, []);

  // Queue audio
  const enqueueAudio = (text: string) => {
    if (!voices.length) return;

    const ukMaleVoice =
      voices.find((v) => v.lang === "en-GB" && /male/i.test(v.name)) ||
      voices.find((v) => v.lang === "en-GB");

    const utterance = new SpeechSynthesisUtterance(text);
    if (ukMaleVoice) utterance.voice = ukMaleVoice;
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

  console.log("current", current);

  const speak = () => {
    if (!voices.length) return;

    if (!current?.ticketNumber) return;

    // Find UK English male voice
    const ukMaleVoice =
      voices.find((v) => v.lang === "en-GB" && /male/i.test(v.name)) ||
      voices.find((v) => v.lang === "en-GB"); // fallback

    const text = `Now serving ticket number ${
      current ? current.ticketNumber : "none"
    }`;

    const msg = new SpeechSynthesisUtterance(text);
    if (ukMaleVoice) msg.voice = ukMaleVoice;
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.speak(msg);
  };

  const showDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const fetchCurrent = async () => {
    const res = await fetch("/api/queue/current");
    if (res.ok) {
      const data = await res.json();
      setCurrent(data);
      console.log(data);
    } else {
      setCurrent(null);
    }
  };
  const fetchPending = async () => {
    const res = await fetch("/api/queue/pending");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setPending(data);
    }
  };
  const callNext = async () => {
    const res = await fetch("/api/queue/next", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setCurrent(data.ticketNumber);

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({ type: "CALL_TICKET", current })
        );
      }
    } else {
      setCurrent(null);
    }
  };

  const callQueue = async () => {
    const res = await fetch("/api/queue/next", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setCurrent(data.ticketNumber);
    } else {
      setCurrent(null);
    }
  };

  const refreshData = () => {
    fetchCurrent();
    fetchPending();
  };

  useEffect(() => {
    refreshData();

    const interval = setInterval(refreshData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center bg-white p-5 scroll-auto rounded-md mb-8">
      <h1 className="text-3xl font-bold mb-6">Admin Queue Panel</h1>
      <button
        onClick={callNext}
        className="bg-blue-400 text-white px-6 py-3 rounded mr-2"
      >
        Previous
      </button>
      <button
        onClick={callNext}
        className="bg-green-600 text-white px-6 py-3 rounded mr-2 cursor-pointer"
      >
        Next
      </button>
      <button
        onClick={callTicket}
        className="bg-red-600 text-white px-6 py-3 rounded mr-2"
      >
        Call Current
      </button>
      <button
        onClick={showDialog}
        className="bg-red-800 text-white px-6 py-3 rounded mr-2"
      >
        Clear Queue
      </button>
      <button
        onClick={showDialog}
        className="bg-red-800 text-white px-6 py-3 rounded"
      >
        View Queue
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete all
              tickets from the current queue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={showDialog}
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Yes, clear it.
            </button>
            <button
              onClick={closeDialog}
              className="bg-red-600 text-white px-6 py-3 rounded"
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {current ? (
        <>
          <h2 className="mt-8 text-2xl">
            Now Serving: {current.ticketNumber} - ({current.lastName},{" "}
            {current.firstName})
          </h2>
          <p className="mt-2">ID Number: {current.studentId}</p>
        </>
      ) : (
        <h2 className="mt-8 text-xl text-gray-600">
          No one currently being served.
        </h2>
      )}

      <hr className="my-10" />

      <h3 className="text-2xl font-semibold mb-4">Pending Tickets</h3>
      <div className="">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Ticket #</th>
              <th className="p-2 border">Id Number</th>
              <th className="p-2 border">Name</th>
            </tr>
          </thead>
          <tbody>
            {pending.length > 0 ? (
              pending.map((p) => (
                <tr key={p.ticketNumber} className="border-t">
                  <td className="p-2 border">{p.ticketNumber}</td>
                  <td className="p-2 border">{p.studentId}</td>
                  <td className="p-2 border">
                    {p.firstName} {p.lastName}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-gray-500">
                  No pending tickets
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
