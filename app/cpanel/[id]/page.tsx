"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
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

type Queue = {
  ticketNumber: number;
  firstName: string;
  lastName: string;
  studentId: string;
};

type WindowDetails = {
  windowId: number;
  windowTitle: string;
  windowDescription: string;
};

export default function Admin() {
  const [current, setCurrent] = useState<Queue | null>(null);
  const [pending, setPending] = useState<Queue[]>([]);
  const [open, setOpen] = useState(false);

  const [details, setDetails] = useState<WindowDetails | null>(null);

  const params = useParams();
  const [windowId, setWindowId] = useState<number | null>(null);

  const showDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const socketRef = useRef<WebSocket | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioQueue = useRef<SpeechSynthesisUtterance[]>([]);
  const [voicesReady, setVoicesReady] = useState(false);

  const fetchCurrent = async () => {
    const res = await fetch("/api/queue/current/" + windowId);
    if (res.ok) {
      const data = await res.json();
      setCurrent(data);
    } else {
      setCurrent(null);
    }
  };

  const callTicket = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      console.log("Calling current ticket via WebSocket");
      socketRef.current.send(
        JSON.stringify({ type: "CALL_TICKET", current })
      );
    } else {
      console.log("WebSocket not connected");
    }
  };

  const fetchWindowDetails = async () => {
    const res = await fetch("/api/window/details/" + windowId);
    if (res.ok) {
      const data = await res.json();
      setDetails(data);
    } else {
      setDetails(null);
    }
  };

  const fetchPending = async () => {
    const res = await fetch("/api/queue/pending/" + windowId);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setPending(data);
    }
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

  // Connect WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3005");
    socketRef.current = ws;

    ws.onopen = () => console.log("WS connected");
    ws.onmessage = (event) => {
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
    console.log("Enqueueing audio for text:", text);

    console.log("Current voices:", voices);

    if (!voices.length) return;
    console.log("Available voices:", voices);

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

  const callNext = async () => {
    if (windowId !== null) {
      const res = await fetch("/api/queue/next", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ windowId }),
      });

      if (res.ok) {
        const data = await res.json();
        setCurrent(data.ticketNumber);


        if (socketRef.current?.readyState === WebSocket.OPEN) {
          console.log("Calling current ticket via WebSocket");
          socketRef.current.send(
            JSON.stringify({ type: "CALL_TICKET", ticketNumber: data.ticketNumber })
          );
        } else {
          console.log("WebSocket not connected");
        }


      } else {
        setCurrent(null);
      }
    } else {
      console.log("window id is null");
    }
  };

  useEffect(() => {
    if (windowId !== null) {
      fetchCurrent();
      fetchPending();
      fetchWindowDetails();
      const interval = setInterval(() => {
        fetchCurrent();
        fetchPending();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [windowId]);

  const callCurrent = () => {
    if (!voices.length) return;
    if (!current?.ticketNumber) return;
    // Find UK English male voice
    const ukMaleVoice =
      voices.find(v => v.lang === "en-GB" && /male/i.test(v.name)) ||
      voices.find(v => v.lang === "en-GB"); // fallback

    const text = `Now serving ticket number ${current ? current.ticketNumber : 'none'}`;

    const msg = new SpeechSynthesisUtterance(text);
    if (ukMaleVoice) msg.voice = ukMaleVoice;
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.speak(msg);
  };

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send("Hello from client button!");
    } else {
      console.warn("WebSocket not connected");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center bg-white p-5 scroll-auto rounded-md mb-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel - {details?.windowTitle}
      </h1>
      <div className="flex gap-2 justify-center">
        <Link
          href="/cpanel"
          className="bg-primary text-white px-6 py-3 rounded"
        >
          <span>CPanel</span>
        </Link>
        <button onClick={() => enqueueAudio("Testing UK English voice")}>
          Test Voice
        </button>
        <button
          onClick={callTicket}
          className="bg-green-800 text-white px-6 py-3 rounded cursor-pointer"
        >
          Call
        </button>
        <button
          onClick={callNext}
          className="bg-green-800 text-white px-6 py-3 rounded cursor-pointer"
        >
          Call Next
        </button>
        <button
          onClick={showDialog}
          className="bg-primary text-white px-6 py-3 rounded"
        >
          Clear Queue
        </button>
        <button
          onClick={sendMessage}
          className="bg-primary text-white px-6 py-3 rounded"
        >
          Send Message
        </button>
      </div>

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
                    {p.firstName.toUpperCase()} {p.lastName.toUpperCase()}
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
