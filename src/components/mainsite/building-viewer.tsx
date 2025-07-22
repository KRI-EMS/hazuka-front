// components/mainsite/building-viewer.tsx

"use client";

import { useEffect, useState } from "react";

export default function BuildingViewer() {
  const svgList = [
    "/floors/floor001.svg",
    "/floors/floor002.svg",
    "/floors/floor003.svg",
    "/floors/floor004.svg",
    "/floors/floor005.svg",
    "/floors/floor006.svg",
    "/floors/floor007.svg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= svgList.length - 1) return;

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 5000); 

    return () => clearTimeout(timer);
  }, [index]);

  const currentSvg = svgList[index];

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <img
        src={currentSvg}
        alt={`Floor ${index + 1}`}
        className="w-[600px] h-auto object-contain"
      />
    </div>
  );
}
