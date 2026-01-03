"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { Track } from "@prisma/client";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import TrackDetail from "@/features/tracks/components/trackDetail";

import { createTrack } from "@/features/tracks/actions/createTrack";

type TrackInputs = {
  trackId?: number;
  name: string;
  description?: string;
};

type TracksProps = {
  tracks: Track[];
  playlistId: number; // どのプレイリストの曲かを知るために追加
};

export default function Tracks({ tracks, playlistId }: TracksProps) {
  //-----------------------------------------------------------------------------
  //  パラメータ関連
  //-----------------------------------------------------------------------------
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTrackId = searchParams.get("trackId");
  const selectedTrack = tracks.find((track) => track.trackId === parseInt(selectedTrackId));

  //-----------------------------------------------------------------------------
  //  state関連
  //-----------------------------------------------------------------------------
  const [isCreateDialogShown, setIsCreateDialogShown] = useState(false);

  //-----------------------------------------------------------------------------
  //  Form関連 (Create/Updateで共有または分離)
  //-----------------------------------------------------------------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrackInputs>();

  // 作成ダイアログ表示
  const openCreateDialog = () => {
    reset({ name: "", description: "" });
    setIsCreateDialogShown(true);
  };

  //-----------------------------------------------------------------------------
  //  Handlers (Action呼び出し)
  //-----------------------------------------------------------------------------
  const handleSelectTrack = (trackId : number) => {
    const params = new URLSearchParams(searchParams);
    params.set("trackId", trackId.toString());
    router.push(`/playlists?${params.toString()}`, { scroll : false });
  };
  const handleCreate: SubmitHandler<TrackInputs> = async (data : TrackInputs) => {
    //  track作成
    const result = await createTrack({ playlistId, ...data });

    if( result.success ) {
      toast.success("Track added!");
      setIsCreateDialogShown(false);
      reset();
    }
    else {
      toast.error(result.error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 overflow-y-hidden">
      {/**** ヘッダーエリア ****/}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tracks</h2>
        <Button variant="primary" onClick={openCreateDialog}>+ Add Track</Button>
      </div>

      {/**** 一覧表示エリア ****/}
      <div className=
        {`
          w-full
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
          overflow-y-auto
        `}
      >
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <div
              key={track.trackId}
              className="group flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSelectTrack(track.trackId)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                  ♪
                </div>
                <span className="font-medium text-gray-700">{track.name}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 italic">
            <p>No tracks found in this playlist.</p>
          </div>
        )}
      </div>

      {/**** 詳細表示エリア ****/}
      {selectedTrack && <TrackDetail track={selectedTrack} />}

      {/**** 作成ダイアログ ****/}
      <Dialog
        isOpen={isCreateDialogShown}
        onClose={() => setIsCreateDialogShown(false)}
        onDone={handleSubmit(handleCreate)}
      >
        <h1 className="text-xl font-bold mb-4">Add New Track</h1>
        <Input 
          label="Track Name" 
          error={errors.name?.message}
          {...register("name", { required: "Track name is required" })}
          className="mb-4"
        />
        <Input 
          label="Track Description" 
          error={errors.description?.message}
          {...register("description")} 
        />
      </Dialog>
    </div>
  );
}