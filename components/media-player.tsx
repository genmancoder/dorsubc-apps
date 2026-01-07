"use client";

import { useState, useEffect } from "react";
import { string } from "zod";

type Queue = {
  ticketNumber: number;
  firstName: string;
  lastName: string;
};

export function MediaPlayer() {
  const [, setCurrent] = useState<Queue | null>(null);
  const [pending, setPending] = useState<Queue[]>([]);

  const fetchCurrent = async () => {
    const res = await fetch("/api/queue/current");
    if (res.ok) {
      const data = await res.json();
      setCurrent(data);
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

  const refreshData = () => {
    fetchCurrent();
    fetchPending();
  };

  useEffect(() => {
    refreshData();

    const interval = setInterval(refreshData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const onquee = pending.slice(0, 2);
  console.log(onquee.length);

  return (
    <div className="border rounded-md p-8 h-screen w-[450px] bg-black shadow">
      <div className="flex flex-col justify-center"></div>
    </div>
  );
}
