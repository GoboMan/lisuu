// lib/audio/ElevenLabsAudioGenerator.ts
import { IAudioGenerator, AudioGenerationResult } from "./IAudioGenerator";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export class ElevenLabsAudioGenerator implements IAudioGenerator {
  private client: ElevenLabsClient;

  constructor() {
    this.client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });
  }

  async generate(text: string): Promise<AudioGenerationResult> {
    const audio = await this.client.textToSpeech.convert(
      "3JDquces8E8bkmvbh6Bc",
      {
        text: text,
        modelId: "eleven_v3",
        outputFormat: "mp3_44100_128",
        // 表現力を高めるためのオプション設定
        voiceSettings: {
          stability: 0.5,
          similarityBoost: 0.8,
          style: 0.0,
          useSpeakerBoost: true,
        },
      }
    );

    // サーバーサイドでは play(audio) ではなく、
    // ストレージに保存するためにBuffer（バイナリデータ）に変換します
    const chunks: Uint8Array[] = [];
    const reader = audio.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const buffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));

    return {
      buffer,
      contentType: "audio/mpeg",
    };
  }
}