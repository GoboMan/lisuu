"use client";

import { Track } from "@prisma/client";

type SlideTabProps = {
	track : Track;
};

export default function SlideTab({ track } : SlideTabProps) {


  return (
    <div>
      <h1>Slide</h1>
    </div>
  );
}