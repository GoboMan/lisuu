"use server";

import { prisma } from "@/lib/prisma";
import { Playlist } from "@prisma/client";
import { revalidatePath } from "next/cache";

type DeletePlaylistResult =
  | { success : true; playlist : Playlist }
  | { success : false; error : string };

export async function deletePlaylist(playlistId : number): Promise<DeletePlaylistResult> {
  try {
    //  セキュリティ：サーバー側で認証情報を取得（例：next-authなど）
    // const session = await getServerSession(); 
    // const userId = session.user.id;
    const userId = 1; // 一旦固定にするとしても、引数ではなくサーバー側で管理すべき

    const playlist = await prisma.playlist.delete({
      where : {
        userId : userId,
        playlistId : playlistId,
      }
    });

    //  キャッシュを更新して画面を最新にする
    revalidatePath("/playlists");

    return { success : true, playlist : playlist };
  }
  catch (error) {
    console.error("Database Error:", error);
    return { success : false, error : "プレイリストの削除に失敗しました" };
  }
}