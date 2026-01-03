"use server";

import { prisma } from "@/lib/prisma";
import { Track } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateTrackResult =
  | { success : true; track : Track }
  | { success : false; error : string };

type TrackInputs = {
  playlistId : number;
  name : string;
  description? : string;
};

export async function createTrack(data : TrackInputs) : Promise<CreateTrackResult> {
  //  バリデーション
  if (!data.name || data.name.trim().length === 0) {
    return { success : false, error : "Name is Empty" };
  }

  //  セキュリティ：サーバー側で認証情報を取得（例：next-authなど）
  // const session = await getServerSession(); 
  // const userId = session.user.id;
  const userId = 1; // 一旦固定にするとしても、引数ではなくサーバー側で管理すべき

  try {
    //  track作成
    const track = await prisma.track.create({
      data : {
        name : data.name,
        description : data.description,
        userId : userId,

        //  playlistTrack作成
        playlistTracks : {
          create : {
            playlistId : data.playlistId,
          },
        },
      }
    });

    //  キャッシュを更新して画面を最新にする
    revalidatePath("/playlists");

    return { success : true, track : track };
  }
  catch (error : any) {
    console.error("Database Error:", error);
    return { success : false, error : "トラックの保存に失敗しました" };
  }
}