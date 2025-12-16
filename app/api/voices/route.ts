import type { NextApiRequest, NextApiResponse } from "next";

interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, unknown>;
  description?: string;
  preview_url?: string;
}

interface ElevenLabsVoicesResponse {
  voices: ElevenLabsVoice[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ElevenLabsVoicesResponse | { error: string }>
) {
  const apiUrl = "https://api.elevenlabs.io/v1/voices";
  const apiKey = process.env.ELEVENLABS_API_KEY;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "xi-api-key": apiKey ?? "",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch voices" });
    }

    const voices: ElevenLabsVoicesResponse = await response.json();
    return res.status(200).json(voices);

  } catch (error) {
    return res.status(500).json({ error: "Error fetching voices" });
  }
}
