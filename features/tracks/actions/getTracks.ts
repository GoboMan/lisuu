"use server";

import { prisma } from "@/lib/prisma";
import { Track } from "@prisma/client";

export async function getTracks(userId : number, playlistId : number): Promise<Track[]> {
  // Trackテーブルから検索を開始する
  const tracks = await prisma.track.findMany({
    where : {
      playlistTracks : {
        some : {
          playlistId : playlistId,
          playlist : {
            userId : userId,
          }
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return tracks;
}