//-----------------------------------------------------------------------------
//  playlistを作成する
//  @feature/playlists/actions/createPlaylist.ts
//-----------------------------------------------------------------------------
"use server";

import { Playlist } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreatePlaylistResult = 
  | { success : true; playlist : Playlist } 
  | { success : false; error : string };

export async function createPlaylist(name : string): Promise<CreatePlaylistResult> {
  //  バリデーション
  if (!name || name.trim().length === 0) {
    return { success : false, error : "名前を入力してください" };
  }

  //  セキュリティ：サーバー側で認証情報を取得（例：next-authなど）
  // const session = await getServerSession(); 
  // const userId = session.user.id;
  const userId = 1; // 一旦固定にするとしても、引数ではなくサーバー側で管理すべき

  try {
    //  playlist作成
    const playlist = await prisma.playlist.create({
      data : {
        name : name,
        userId : userId,
      },
    });

    //  キャッシュを更新して画面を最新にする
    revalidatePath("/playlists");

    return {
      success : true,
      playlist : playlist,
    };
  }
  catch (error : any) {
    console.error("Database Error:", error);
    return {
      success : false,
      error : "プレイリストの保存に失敗しました",
    };
  }
}