"use server";

import { prisma } from "@/lib/prisma";
import { Track } from "@prisma/client";
import { revalidatePath } from "next/cache";

type DeleteTrackResult = 
  | { success : true; track : Track }
  | { success : false; error : string };

export async function deleteTrack(trackId : number) : Promise<DeleteTrackResult> {
  try {
    //  セキュリティ：サーバー側で認証情報を取得（例：next-authなど）
    // const session = await getServerSession(); 
    // const userId = session.user.id;
    const userId = 1; // 一旦固定にするとしても、引数ではなくサーバー側で管理すべき

    //  track削除
    const track = await prisma.track.delete({
      where : {
        userId : userId,
        trackId : trackId,
      }
    });

    //  キャッシュを更新して画面を最新にする
    revalidatePath("/playlists");

    return { success : true, track : track };
  }
  catch (error) {
    console.error("Database Error:", error);
    return { success : false, error : "Failed to delete track" };
  }
}

