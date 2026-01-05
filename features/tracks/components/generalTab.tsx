"use client";

import { Track } from "@prisma/client";
import TrackDetail from "@/features/tracks/components/trackDetail";

type GeneralTabProps = {
	track : Track;
};

export default function GeneralTab({ track } : GeneralTabProps) {

  return (
    <TrackDetail track={track} />
  );
}