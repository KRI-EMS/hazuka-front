// components/mainsite/building-viewer.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BuildingViewer() {
  const [svgUrl, setSvgUrl] = useState<string>("");

  useEffect(() => {
    // public フォルダ内のファイルにアクセスする場合は、/から始めます
    setSvgUrl("/floors/floor001.svg");
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {svgUrl ? (
        <img
          src={svgUrl}
          alt="Floor 001"
          className="w-[600px] h-auto object-contain"
        />
      ) : (
        <div>読み込み中...</div>
      )}
    </div>
  );
}
