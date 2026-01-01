"use client"; // ここでClient Component宣言

import { useState } from "react";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import { Playlist } from "@prisma/client";

export default function PlaylistsSidebar({ playlists }: { playlists: Playlist[] }) {
  const [isCreatePlaylistDialogShown, setIsCreatePlaylistDialogShown] = useState(false);

  return (
    <div className="h-full scroll-auto w-70 bg-gray-200 p-4">
      <div className="flex items-center w-full mb-4">
        <h1 className="text-xl">Playlists</h1>
        <div className="flex-1"></div>
        <Button variant="primary" onClick={() => setIsCreatePlaylistDialogShown(true)}>+ Add</Button>
      </div>

      <div className="flex flex-col gap-4">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.playlistId} className="flex items-center w-full bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-100">
              <h2 className="text-sm">{playlist.name}</h2>
            </div>
          ))
        ) : (
          <div className="flex items-center w-full bg-white p-2 rounded-lg text-gray-400 italic">
            <h2>No playlists found</h2>
          </div>
        )}
      </div>

      { /**** ダイアログ ****/ }
      <Dialog
        isOpen={isCreatePlaylistDialogShown}
        size="lg"
        isFixed={true}
        hasBackdrop={true}
        onClose={() => setIsCreatePlaylistDialogShown(false)}
        onDone={() => {
          setIsCreatePlaylistDialogShown(false);
        }}
      >
        <h1 className="text-xl font-bold">Create Playlist</h1>
        <p className="text-gray-600 mt-2">新しいプレイリストの名前を入力してください。</p>
      </Dialog>
    </div>
  );
}