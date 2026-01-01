"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

type Props = {
  isOpen : boolean;
  children : React.ReactNode;
  //  サイズ指定: sm(384px), md(448px), lg(672px) ※スマホ時は画面幅に追従
  size? : "sm" | "md" | "lg";
  //  画面中央に固定するかどうか
  isFixed? : boolean;
  //  背景を暗くするかどうか
  hasBackdrop? : boolean;
  className? : string;
  onDone? : () => void;
  onClose? : () => void;
};

export default function Dialog({
  isOpen,
  children,
  onDone,
  onClose,
  size = "md",
  isFixed = true,
  hasBackdrop = true,
  className = "",
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // すでに開いている場合は二重に呼ばないためのチェック
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  //  1. 基本スタイル
  const baseStyle = "bg-white rounded-2xl shadow-2xl p-6 border-none outline-none";

  //  2. サイズのバリエーション
  const sizeStyle = {
    sm: "w-[90vw] max-w-sm", // max-w-sm = 384px
    md: "w-[95vw] max-w-md", // max-w-md = 448px
    lg: "w-[95vw] max-w-2xl", // max-w-2xl = 672px
  };

  //  3. 配置（中央固定か、標準位置か）
  const positionStyle = isFixed
    ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0"
    : "";

  //  4. 背景（Backdrop）のスタイル
  const backdropStyle = hasBackdrop
    ? "backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    : "backdrop:bg-transparent";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`${baseStyle} ${sizeStyle[size]} ${positionStyle} ${backdropStyle} ${className}`}
    >
      <div className="flex flex-col gap-6">
        {/* コンテンツエリア */}
        <div className="flex-1 text-gray-800">{children}</div>

        {/* フッター：ボタンエリア */}
        {(onClose || onDone) && (
          <div className="flex justify-end items-center gap-3 pt-2">
            {onClose && (
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            )}
            {onDone && (
              <Button variant="primary" onClick={onDone}>
                Done
              </Button>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}