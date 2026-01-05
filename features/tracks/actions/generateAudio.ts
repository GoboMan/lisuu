"use server";

//  import { OpenAIAudioGenerator } from "@/lib/audio/OpenAIAudioGenerator";
import { ElevenLabsAudioGenerator } from "@/lib/audio/ElevenLabsAudioGenerator";
import { prisma } from "@/lib/prisma";
import { getStorageProvider } from "@/lib/storage/getStorageProvider";
import { Track } from "@prisma/client";

type GenerateAudioResult = {
  success : boolean;
  message : string;
};

export async function generateAudio(track : Track) : Promise<GenerateAudioResult> {
  const storageProvider = getStorageProvider();
  const audioGenerator = new ElevenLabsAudioGenerator();

  //  音声テキスト
  //  MEMO : 現時点では、間を開けるために使用しているが今後はnameとdescription
  // をそれぞれ音声ファイルを作るようにする
  const audioText = `${track.name}。${track.description}。`;

  //  Audio生成
  const audioResult = await audioGenerator.generate(audioText);

  //  保存前に既存のファイルがあれば削除する
  if( track.audioUrl ) {
    await storageProvider.delete(`audio-${track.trackId}.${audioResult.contentType.split("/")[1]}`);
  }

  //  Audio保存
  const uploadResult = await storageProvider.upload(audioResult.buffer, `audio-${track.trackId}.${audioResult.contentType.split("/")[1]}`, audioResult.contentType);

  //  Audio保存に失敗時
  if( !uploadResult.success ) {
    return { success : false, message : "Audio保存に失敗しました" };
  }

  //  Track更新
  await prisma.track.update({
    where : { trackId : track.trackId },
    data : { audioUrl : uploadResult.url, status : "COMPLETE" },
  });

  return { success : true, message : "Audio生成に成功しました" };
}