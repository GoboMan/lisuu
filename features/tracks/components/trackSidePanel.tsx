import { Track } from "@prisma/client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import GeneralTab from "@/features/tracks/components/generalTab";
import AudioTab from "@/features/tracks/components/audioTab";
import SlideTab from "@/features/tracks/components/slideTab";

import { useRouter, useSearchParams } from "next/navigation";

type TrackSidePanelProps = {
  track : Track;
};

const tabs = [
  { tabId : "general", label : "General" },
  { tabId : "audio", label : "Audio" },
  { tabId : "slide", label : "Slide" },
];

export default function TrackSidePanel({ track } : TrackSidePanelProps) {
  //-----------------------------------------------------------------------------
  //  URLパラメータ関連
  //-----------------------------------------------------------------------------
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  //-----------------------------------------------------------------------------
  //  handler関連
  //-----------------------------------------------------------------------------
  const changeTab = (tabId : string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tabId);
    router.push(`/playlists?${params.toString()}`, { scroll : false });
  };

  const closeTrackDetail = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("trackId");
    router.push(`/playlists?${params.toString()}`, { scroll : false });
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration : 0.15, ease : "easeInOut" }}
      className="
        fixed top-0 right-0
        h-full w-1/2
        bg-white
        shadow-2xl z-50
        flex flex-col
        border-l border-gray-100
        px-6 py-2
      "
    >
      { /**** tabs ****/ }
      <div className="flex border-b border-gray-200 mb-4">
        { tabs.map((tab) => (
          <Button
            key={tab.tabId}
            onClick={() => changeTab(tab.tabId)}
            variant="custom"
            className={`
              ${activeTab === tab.tabId
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-transparent"
              }
            `}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      { /**** contents ****/ }
      { activeTab === "general" && (
        <GeneralTab track={track} />
      )}
      { activeTab === "audio" && (
        <AudioTab track={track} />
      )}
      { activeTab === "slide" && (
        <SlideTab track={track} />
      )}

      { /**** close button ****/ }
      <Button
        variant="custom"
        onClick={() => closeTrackDetail()}
        className="
          absolute top-4 left-0
          -translate-x-full
          bg-gray-200 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]
          border border-r-0 border-gray-100
          rounded-l-xl
        "
      >
        <img src="/close.svg" alt="close" className="w-6 h-6" />
      </Button>
    </motion.div>
  );
}