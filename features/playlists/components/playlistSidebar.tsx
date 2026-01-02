"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import { createPlaylist } from "@/features/playlists/actions/createPlaylist";
import { updatePlaylist } from "@/features/playlists/actions/updatePlaylist";
import { deletePlaylist } from "@/features/playlists/actions/deletePlaylist";
import { Playlist } from "@prisma/client";

type CreateInputs = {
  name : string;
};
type UpdateInputs = {
  playlistId : number;
  name : string;
};
type DeleteInputs = {
  playlistId : number;
};

export default function PlaylistsSidebar({ playlists } : { playlists : Playlist[] }) {
  //  state関連
  const [isCreatePlaylistDialogShown, setIsCreatePlaylistDialogShown] = useState(false);
  const [isUpdatePlaylistDialogShown, setIsUpdatePlaylistDialogShown] = useState(false);
  const [isDeletePlaylistDialogShown, setIsDeletePlaylistDialogShown] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  //  create form関連
  const {
    register : registerCreate,
    handleSubmit : handleSubmitCreate,
    reset : resetCreate,
    formState: { errors : errorsCreate },
  } = useForm<CreateInputs>();
  const onCreate = () => {
    resetCreate();
    setIsCreatePlaylistDialogShown(true);
  };
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

  const onEdit = (playlist : Playlist) => {
    //  入力内容をセットして、ダイアログを表示
    resetUpdate({ playlistId : playlist.playlistId, name : playlist.name });
    setIsUpdatePlaylistDialogShown(true);
  };

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

  //  delete関連
  const {
    register : registerDelete,
    handleSubmit : handleSubmitDelete,
    reset : resetDelete,
    formState: { errors : errorsDelete },
  } = useForm<DeleteInputs>();

  const onDelete = (playlistId : number) => {
    resetDelete({ playlistId : playlistId });
    setIsDeletePlaylistDialogShown(true);
  }
  const handleDelete: SubmitHandler<DeleteInputs> = async (data : DeleteInputs) => {
    //  playlist削除
    const result = await deletePlaylist(data.playlistId);

    if( result.success ) {
      //  ダイアログを閉じて、入力内容をリセット
      setIsDeletePlaylistDialogShown(false);
      resetDelete();
      toast.success("Playlist deleted successfully");
    }
    else {
      //  エラーメッジを表示
      toast.error(result.error);
    }
  }

  return (
    <div className="h-full scroll-auto w-72 bg-gray-200 p-4">
      <div className="flex items-center w-full mb-4">
        <h1 className="text-xl">Playlists</h1>
        <div className="flex-1"></div>
        <Button variant="primary" onClick={onCreate}>+ Add</Button>
      </div>

      { /**** playlists一覧 ****/ }
      <div className="flex flex-col gap-4">
        {playlists.length > 0 ? (
          playlists.map((playlist : Playlist) => {
            const isSelected = selectedPlaylist?.playlistId === playlist.playlistId;

            return (
              <div
                key={playlist.playlistId}
                className={`
                  group flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all
                  ${isSelected
                    ? "bg-blue-200"
                    : "bg-white hover:bg-gray-100"
                  }
                `}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <h2 className="text-sm">{playlist.name}</h2>
                <div className="flex-1"></div>
                <Button
                  variant="custom"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(playlist)
                  }}
                  className="invisible group-hover:visible"
                  aria-label="Edit Playlist"
                >
                  <img src="/edit.svg" className="w-4 h-4 opacity-80" alt="edit" />
                </Button>

                <Button
                  variant="custom"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(playlist.playlistId)
                  }}
                  className="invisible group-hover:visible bg-red-200"
                  aria-label="Delete Playlist"
                >
                  <img src="/delete.svg" className="w-4 h-4 opacity-80" alt="delete" />
                </Button>

              </div>
            );
          })
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

      { /**** 削除ダイアログ ****/ }
      <Dialog
        isOpen={isDeletePlaylistDialogShown}
        size="lg"
        isFixed={true}
        hasBackdrop={true}
        onClose={() => {
          setIsDeletePlaylistDialogShown(false);
        }}
        onDone={handleSubmitDelete(handleDelete)}
        { ...registerDelete( "playlistId", {
          required: "Select a playlist to delete",
        })}
      >
        <h1 className="text-xl font-bold mb-4">Delete Playlist</h1>
        <p className="text-sm mb-4">Are you sure you want to delete this playlist?</p>
      </Dialog>
    </div>
  );
}