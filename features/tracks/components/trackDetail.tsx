"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Track } from "@prisma/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/textarea";
import Dialog from "@/components/ui/Dialog";
import { updateTrack } from "@/features/tracks/actions/updateTrack";
import { deleteTrack } from "@/features/tracks/actions/deleteTrack";

type TrackDetailProps = {
  track : Track;
};

export default function TrackDetail({ track } : TrackDetailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(track.name);
  const [description, setDescription] = useState(track.description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Enter track name");
      return;
    }

    setIsSaving(true);
    const result = await updateTrack(track.trackId, name, description);

    if (result.success) {
      toast.success("Updated track successfully");
      setIsEditing(false);
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setName(track.name);
    setDescription(track.description || "");
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteTrack(track.trackId);

    if (result.success) {
      toast.success("Track deleted successfully");
      // サイドパネルを閉じる（trackIdをURLから削除）
      const params = new URLSearchParams(searchParams);
      params.delete("trackId");
      router.push(`/playlists?${params.toString()}`, { scroll : false });
      router.refresh();
    } else {
      toast.error(result.error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="
      bg-white
      rounded-xl
      border border-gray-200
      p-6
      transition-shadow duration-200
    ">
      {/**** 編集・削除ボタン ****/}
      <div className="flex justify-end mb-2 gap-2">
        {!isEditing ? (
          <>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <img src="/edit.svg" alt="edit" className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <img src="/delete.svg" alt="delete" className="w-4 h-4" />
              Delete
            </Button>
          </>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>

      {/**** track name ****/}
      <div className="mb-4">
        {isEditing ? (
          <Input
            label="Track Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2"
          />
        ) : (
          <h2 className="
            text-3xl font-bold
            text-gray-900
            mb-1
          ">
            {track.name}
          </h2>
        )}
      </div>

      {/**** track description ****/}
      <div className={isEditing || track.description ? "pt-4 border-t border-gray-100" : ""}>
        {isEditing ? (
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="min-h-[120px] resize-y"
          />
        ) : (
          track.description && (
            <p className="
              text-gray-700
              leading-relaxed
              whitespace-pre-wrap
              text-base
            ">
              {track.description}
            </p>
          )
        )}
      </div>

      {/**** 削除確認ダイアログ ****/}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => !isDeleting && setIsDeleteDialogOpen(false)}
        onDone={handleDelete}
        size="sm"
      >
        <h1 className="text-xl font-bold mb-4">Delete Track</h1>
        <p className="text-sm mb-4">Are you sure you want to delete this track?</p>
      </Dialog>
    </div>
  );
}