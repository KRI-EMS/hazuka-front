"use client";

import { useState, useEffect } from "react";
import { ChartMixedDay } from "@/components/mainsite/day-trantision";
import { ChartBarStackedDay } from "@/components/mainsite/barstackedday";

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="
        h-full flex flex-col p-3 rounded-xl
        bg-[#0f1b2d]
        border border-cyan-400/40
        shadow-[0_0_16px_rgba(56,189,248,0.35)]
      "
    >
      {/* タイトル */}
      <div className="text-xs text-white border-l-4 border-cyan-400 pl-2 mb-2">
        {title}
      </div>

      {/* チャート本体 */}
      <div className="flex-1">{children}</div>
    </div>
  );
}



export default function TwoChartsDay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 2);
    }, 10000); // 10秒ごとに切り替え
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full">
      {index === 0 ? (
        <ChartPanel title="今日,前日の時間別総消費エネルギー量と推移">
          <ChartMixedDay />
        </ChartPanel>
      ) : (
        <ChartPanel title="設備別・今日の消費エネルギー量">
          <ChartBarStackedDay />
        </ChartPanel>
      )}
    </div>
  );
}
