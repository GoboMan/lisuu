export interface AudioGenerationResult {
  buffer : Buffer;
  contentType : string;
}

export interface IAudioGenerator {
  generate(text : string) : Promise<AudioGenerationResult>
}