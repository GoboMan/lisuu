"use server";

//-----------------------------------------------------------------------------
//  playlistを更新する
//  @feature/playlists/actions/updatePlaylist.ts
//-----------------------------------------------------------------------------
import { prisma } from "@/lib/prisma";
import { Playlist } from "@prisma/client";
import { revalidatePath } from "next/cache";

type UpdatePlaylistResult = 
  | { success : true; playlist : Playlist }
  | { success : false; error : string };

export async function updatePlaylist(playlistId : number, name : string) : Promise<UpdatePlaylistResult> {
  //  バリデーション
  if( !name || name.trim().length === 0 ) {
    return { success : false, error : "Name is Empty" };
  }

  try {
    //  セキュリティ：サーバー側で認証情報を取得（例：next-authなど）
    // const session = await getServerSession(); 
    // const userId = session.user.id;
    const userId = 1; // 一旦固定にするとしても、引数ではなくサーバー側で管理すべき

    //  playlist更新
    const playlist = await prisma.playlist.update({
      where : {
        userId : userId,
        playlistId : playlistId,
      },
      data : { name : name },
    });

    //  キャッシュを更新して画面を最新にする
    revalidatePath("/playlists");

    return { success : true, playlist : playlist };
  }
  catch (error) {
    console.error("Database Error:", error);
    return { success : false, error : "プレイリストの更新に失敗しました" };
  }
}