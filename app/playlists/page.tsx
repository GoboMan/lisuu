import { Playlist, Track } from "@prisma/client";
import { getPlaylists } from "@/features/playlists/actions/getPlaylists";
import { getTracks } from "@/features/tracks/actions/getTracks";

import PlaylistsSidebar from "@/features/playlists/components/playlistSidebar";
import Tracks from "@/features/playlists/components/tracks";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";

type PlaylistsProps = {
  searchParams : Promise<{ playlistId? : string }>;
};

export default async function Playlists({ searchParams } : PlaylistsProps) {
  //  urlのパラメータを取得
  const params = await searchParams;
  const playlistId = params.playlistId ? parseInt(params.playlistId) : undefined;

  //  userIdを取得
  const userId = 1;

  let playlists: Playlist[] = [];
  let tracks: Track[] = [];
  try {
    const [p, t] = await Promise.all([
      getPlaylists(userId),
      playlistId ? getTracks(userId, playlistId) : Promise.resolve([])
    ]);
    playlists = p;
    tracks = t;
  }
  catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-row w-full h-screen">
      { /**** sidebar ****/ }
      <PlaylistsSidebar playlists={playlists} />

      { /**** tracks一覧 ****/ }
      <Tracks tracks={tracks} playlistId={playlistId} />

    </div>
  );
}