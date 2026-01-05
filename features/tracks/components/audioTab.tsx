"use client";

import { Track } from "@prisma/client";
import { useState, useTransition } from "react";
import { generateAudio } from "@/features/tracks/actions/generateAudio"; // パスは適宜調整してください
import { useRouter } from "next/navigation";

type AudioTabProps = {
  track: Track;
};

export default function AudioTab({ track }: AudioTabProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerate = async () => {
    // サーバーアクションの実行
    startTransition(async () => {
      setMessage("音声を生成中...");
      const result = await generateAudio(track);
      
      if (result.success) {
        setMessage("生成が完了しました！");
        router.refresh(); // ページを更新して最新のaudioUrlを取得
      } else {
        setMessage(`エラー: ${result.message}`);
      }
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Audio Control</h2>
        {/* 生成ボタン：生成中や既にURLがある場合は無効化も検討 */}
        <button
          onClick={handleGenerate}
          disabled={isPending}
          className={`px-4 py-2 rounded-md font-medium transition ${
            isPending 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isPending ? "生成中..." : track.audioUrl ? "音声を再生成" : "音声を生成"}
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.includes("エラー") ? "text-red-500" : "text-gray-500"}`}>
          {message}
        </p>
      )}

      <hr className="border-gray-200" />

      {/* 音声再生セクション */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Player
        </h3>

        {track.audioUrl ? (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 mb-2 font-mono truncate">{track.audioUrl}</p>
            <audio 
              controls 
              key={track.audioUrl} // URLが変わった時にプレイヤーをリセット
              className="w-full h-10"
            >
              <source src={track.audioUrl} type="audio/mpeg" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-400 text-sm">音声ファイルがまだありません</p>
          </div>
        )}
      </div>
    </div>
  );
}