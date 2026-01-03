"use client";

import { Track } from "@prisma/client";

type AudioTabProps = {
	track : Track;
};

export default function AudioTab({ track } : AudioTabProps) {


  return (
    <div>
      <h1>Audio</h1>
    </div>
  );
}