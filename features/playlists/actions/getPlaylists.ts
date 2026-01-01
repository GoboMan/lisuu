import { prisma } from "@/lib/prisma";
import { Playlist } from "@prisma/client";

export async function getPlaylists(userId_ : number): Promise<Playlist[]> {
  // ユーザーのプレイリストを取得
  const playlists = await prisma.playlist.findMany({
    where : {
      userId : userId_
    },
    orderBy : {
      updatedAt : "desc"
    }
  });

  return playlists;
}