import type { NextApiRequest, NextApiResponse } from "next";

interface TTSRequestBody {
  text: string;
  voice_id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, voice_id } = req.body as TTSRequestBody;

    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;
    const apiKey = process.env.ELEVENLABS_API_KEY ?? "";

    const headers = {
      Accept: "audio/mpeg",
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    };

    const requestBody = JSON.stringify({
      text,
      model_id: "eleven_monolingual_v1",
    });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: requestBody,
    });

    if (!response.ok) {
      console.error("ElevenLabs Error:", await response.text());
      return res
        .status(response.status)
        .json({ error: "Error generating text-to-speech" });
    }

    const audioBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.status(200).send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error("Error generating text-to-speech:", error);
    return res
      .status(500)
      .json({ error: "Error generating text-to-speech" });
  }
}
