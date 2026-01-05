import { IAudioGenerator, AudioGenerationResult } from "./IAudioGenerator";
import { OpenAI } from "openai";

const openai = new OpenAI();

export class OpenAIAudioGenerator implements IAudioGenerator {
  async generate(text : string) : Promise<AudioGenerationResult> {
    const response = await openai.audio.speech.create({
      model : "tts-1-hd",
      input : text,
      voice : "alloy",
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "audio/mpeg";
    return { buffer, contentType };
  }
}