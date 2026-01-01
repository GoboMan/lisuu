import Button from "@/components/ui/Button";
import { Playlist } from "@prisma/client";
import { getPlaylists } from "@/features/playlists/actions/getPlaylists";

export default async function Playlists() {
  //  userIdを取得
  const userId = 1;
  const playlists = await getPlaylists(userId);

  return (
    <div className="flex flex-row h-screen w-full">
      { /**** sidebar ****/ }
      <div className="h-full scroll-auto w-70 bg-gray-200 p-4">
        <div className="flex items-center w-full mb-4">
         <h1 className="text-xl">Playlists</h1>
         <div className="flex-1"></div>
         <Button variant="primary">+ Add</Button>
        </div>

        { /**** playlists一覧 ****/ }
        <div className="flex flex-col gap-4">
          {Object.keys(playlists).length > 0 ? (

            // playlistがある場合
            Object.values(playlists).map((playlist : Playlist) => (
              <div
                key={playlist.playlistId}
                className="flex items-center w-full bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <h2 className="text-sm">{playlist.name}</h2>
              </div>
            ))
          ) : (

            // playlistがない場合
            <div className="flex items-center w-full bg-white p-2 rounded-lg text-gray-400 italic">
              <h2 className="">No playlists found</h2>
            </div>
          )}
        </div>
      </div>

      { /**** tracks一覧 ****/ }
      <div className="flex-1 p-4">
        <h1 className="text-xl">Tracks</h1>
      </div>
    </div>
  );
}