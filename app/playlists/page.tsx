import { Playlist } from "@prisma/client";
import { getPlaylists } from "@/features/playlists/actions/getPlaylists";

import PlaylistsSidebar from "@/features/playlists/components/playlistSidebar";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";

export default async function Playlists() {
  //  userIdを取得
  const userId = 1;

  //  playlistsを取得
  const playlists = await getPlaylists(userId);

  return (
    <div className="flex flex-row h-screen w-full">
      { /**** sidebar ****/ }
      <PlaylistsSidebar playlists={playlists} />

      { /**** tracks一覧 ****/ }
      <div className="flex-1 p-4">
        <h1 className="text-xl">Tracks</h1>
      </div>

    </div>
  );
}