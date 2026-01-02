"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import { createPlaylist } from "@/features/playlists/actions/createPlaylist";
import { updatePlaylist } from "@/features/playlists/actions/updatePlaylist";
import { Playlist } from "@prisma/client";

type CreateInputs = {
  name : string;
};
type UpdateInputs = {
  playlistId : number;
  name : string;
};

export default function PlaylistsSidebar({ playlists } : { playlists : Playlist[] }) {
  //  state関連
  const [isCreatePlaylistDialogShown, setIsCreatePlaylistDialogShown] = useState(false);
  const [isUpdatePlaylistDialogShown, setIsUpdatePlaylistDialogShown] = useState(false);

  //  create form関連
  const {
    register : registerCreate,
    handleSubmit : handleSubmitCreate,
    reset : resetCreate,
    formState: { errors : errorsCreate },
  } = useForm<CreateInputs>();
  const handleCreate: SubmitHandler<CreateInputs> = async (data : CreateInputs) => {
    //  playlist作成
    const result = await createPlaylist(data.name);

    if( result.success ) {
      //  ダイアログを閉じて、入力内容をリセット
      setIsCreatePlaylistDialogShown(false);
      resetCreate();
      toast.success("Playlist created successfully");
    }
    else {
      //  エラーメッセージを表示
      toast.error(result.error);
    }
  };

  //  update form関連
  const {
    register : registerUpdate,
    handleSubmit : handleSubmitUpdate,
    reset : resetUpdate,
    formState: { errors : errorsUpdate },
  } = useForm<UpdateInputs>();

  const handleUpdate: SubmitHandler<UpdateInputs> = async (data : UpdateInputs) => {
    //  playlist更新
    const result = await updatePlaylist(data.playlistId, data.name);

    if( result.success ) {
      //  ダイアログを閉じて、入力内容をリセット
      setIsUpdatePlaylistDialogShown(false);
      resetUpdate();
      toast.success("Playlist updated successfully");
    }
    else {
      //  エラーメッセージを表示
      toast.error(result.error);
    }
  };

  const handleEdit = (playlist : Playlist) => {
    //  入力内容をセットして、ダイアログを表示
    resetUpdate({ playlistId : playlist.playlistId, name : playlist.name });
    setIsUpdatePlaylistDialogShown(true);
  };

  return (
    <div className="h-full scroll-auto w-70 bg-gray-200 p-4">
      <div className="flex items-center w-full mb-4">
        <h1 className="text-xl">Playlists</h1>
        <div className="flex-1"></div>
        <Button variant="primary" onClick={() => setIsCreatePlaylistDialogShown(true)}>+ Add</Button>
      </div>

      { /**** playlists一覧 ****/ }
      <div className="flex flex-col gap-4">
        {playlists.length > 0 ? (
          playlists.map((playlist : Playlist) => (
            <div key={playlist.playlistId} className="group flex items-center w-full bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-100">
              <h2 className="text-sm">{playlist.name}</h2>
              <div className="flex-1"></div>
              <Button variant="custom" onClick={() => handleEdit(playlist)} className="invisible group-hover:visible">
                <img src="/edit.svg" className="w-4 h-4 opacity-80"/>
              </Button>

            </div>
          ))
        ) : (
          <div className="flex items-center w-full bg-white p-2 rounded-lg text-gray-400 italic">
            <h2>No playlists found</h2>
          </div>
        )}
      </div>

      { /**** 作成ダイアログ ****/ }
      <Dialog
        isOpen={isCreatePlaylistDialogShown}
        size="lg"
        isFixed={true}
        hasBackdrop={true}
        onClose={() => {
          setIsCreatePlaylistDialogShown(false);
          resetCreate();
        }}
        onDone={handleSubmitCreate(handleCreate)}
      >
        <h1 className="text-xl font-bold mb-4">Create Playlist</h1>
        <Input label="Name"
          error={errorsCreate.name?.message}
          {...registerCreate( "name", {
              required: "Enter a name for your playlist",
            }
          )}
        />
      </Dialog>

      { /**** 更新ダイアログ ****/ }
      <Dialog
        isOpen={isUpdatePlaylistDialogShown}
        size="lg"
        isFixed={true}
        hasBackdrop={true}
        onClose={() => {
          setIsUpdatePlaylistDialogShown(false);
          resetUpdate();
        }}
        onDone={handleSubmitUpdate(handleUpdate)}
      >
        <h1 className="text-xl font-bold mb-4">Update Playlist</h1>
        <Input label="Name"
          error={errorsUpdate.name?.message}
          {...registerUpdate( "name", {
              required: "Enter a name for your playlist",
            }
          )}
        />
      </Dialog>
    </div>
  );
}