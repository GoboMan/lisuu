import { prisma } from "@/lib/prisma";
import { Playlist } from "@prisma/client";

export async function createPlaylist(data_: { name: string, userId: number }): Promise<Playlist> {
  const playlist = await prisma.playlist.create({
    data: {
      name: data_.name,
      userId: data_.userId,
    },
    include: {
      user: true,
    },
  });

  return playlist;
}