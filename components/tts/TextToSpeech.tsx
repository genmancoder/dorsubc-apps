"use client";

import { useState } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("");

  const speak = () => {
    if (!text) return;
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1;
    msg.pitch = 1;
    msg.volume = 1;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="border p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
      />

      <button onClick={speak} className="px-4 py-2 bg-blue-600 text-white">
        Speak
      </button>
    </div>
  );
}