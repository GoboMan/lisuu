"use server";

import { prisma } from "@/lib/prisma";
import { Track } from "@prisma/client";
import { revalidatePath } from "next/cache";

type UpdateTrackResult = 
  | { success : true; track : Track }
  | { success : false; error : string };

export async function updateTrack(
  trackId : number, 
  name : string, 
  description? : string
) : Promise<UpdateTrackResult> {
  //  バリデーション
  if( !name || name.trim().length === 0 ) {
    return { success : false, error : "Name is Empty" };
  }

  try {
    //  セキュリティ：サーバー側で認証情報を取得（例：next-authなど）
    // const session = await getServerSession(); 
    // const userId = session.user.id;
    const userId = 1; // 一旦固定にするとしても、引数ではなくサーバー側で管理すべき

    //  track更新
    const track = await prisma.track.update({
      where : {
        userId : userId,
        trackId : trackId,
      },
      data : { 
        name : name,
        description : description,
      },
    });

    //  キャッシュを更新して画面を最新にする
    revalidatePath("/playlists");

    return { success : true, track : track };
  }
  catch (error) {
    console.error("Database Error:", error);
    return { success : false, error : "Failed to update track" };
  }
}

