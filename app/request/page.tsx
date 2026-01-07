"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

type QueeWindow = {
  id: number;
  windowTitle: string;
  windowDescription: string;
};

export default function Request() {
  const [open, setOpen] = useState(false);
  const [windows, setWindows] = useState<QueeWindow[]>([]);

  const closeDialog = () => setOpen(false);

  const [ticket, setTicket] = useState<number | null>(null);
  const [form, setForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    windowId: "",
  });

  const fetchWindows = async () => {
    const res = await fetch("/api/window/list");
    if (res.ok) {
      const data = await res.json();
      setWindows(data);
    }
  };

  const [error, setError] = useState<string>("");

  const validateForm = () => {
    const { studentId, firstName, lastName, windowId } = form;

    if (!studentId || !firstName || !lastName) {
      return "All fields are required.";
    }
    if (!windowId) {
      return "Please select a window.";
    }
    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
      return "First name must contain only letters and spaces.";
    }

    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      return "Last name must contain only letters and spaces.";
    }

    if (!/^[0-9]{4}-[0-9]{4}$/.test(studentId)) {
      return "Invalid Student ID format. (e.g. 2016-0112)";
    }

    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateTicket = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    const res = await fetch("/api/queue/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: form.studentId,
        firstName: form.firstName,
        lastName: form.lastName,
        windowId: Number(form.windowId),
      }),
    });

    console.log("form", form);

    const data = await res.json();
    setTicket(data.ticketNumber);
    setOpen(true);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      studentId: "",
      firstName: "",
      lastName: "",
      windowId: "",
    });
    // setTicket(null);
  };
  useEffect(() => {
    fetchWindows();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-white rounded-md p-4">
        <div className="max-w-md mx-auto mt-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Get a Queue Ticket</h1>
          <select
            name="windowId"
            value={form.windowId}
            onChange={handleChange}
            className="border p-2 mb-4 w-full"
          >
            <option value="">Select a Window</option>

            {windows?.length > 0 ? (
              windows?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.windowTitle}
                </option>
              ))
            ) : (
              <p>No windows avaialable</p>
            )}

            {/* You can dynamically populate these if you have a window list */}
          </select>

          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border p-2 mb-4 w-full"
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={generateTicket}
            className="bg-primary text-white px-6 py-3 rounded"
          >
            Generate Ticket
          </button>

          {ticket && (
            <h2 className="mt-8 text-xl">
              Your Ticket Number:{" "}
              <span className="text-blue-500 font-bold">{ticket}</span>
            </h2>
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ticket Generated!</DialogTitle>
              <DialogDescription>
                {ticket && (
                  <h2 className="mt-8 text-xl">
                    Your Ticket Number:{" "}
                    <span className="text-blue-500 font-bold">{ticket}</span>
                  </h2>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={closeDialog}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          href="/"
          passHref
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Current Queue
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/request"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Request Number
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          DOrSU Banaybanay Campus - SRIS
        </Link>
      </footer>
    </div>
  );
}
