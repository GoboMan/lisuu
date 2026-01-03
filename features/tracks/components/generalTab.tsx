"use client";

import { Track } from "@prisma/client";

type GeneralTabProps = {
	track : Track;
};

export default function GeneralTab({ track } : GeneralTabProps) {


  return (
    <div>
      <h1>General</h1>
    </div>
  );
}