"use client";

import { useState } from "react";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";

export default function TTSButton() {
  const [loading, setLoading] = useState(false);

  // Initialize the client (client-side only)
  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "", 
  });

  const speak = async () => {
    try {
      setLoading(true);

      const audio = await elevenlabs.textToSpeech.convert(
        "JBFqnCBsd6RMkjVDRZzb", // voice_id
        {
          text: "The first move is what sets everything in motion.",
          modelId: "eleven_multilingual_v2",
          outputFormat: "mp3_44100_128",
        }
      );

      // Play using ElevenLabs helper
      await play(audio);
    } catch (err) {      
      console.log("api", process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY);  
      console.error("TTS Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={speak}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading ? "Generating..." : "Speak Text"}
    </button>
  );
}
