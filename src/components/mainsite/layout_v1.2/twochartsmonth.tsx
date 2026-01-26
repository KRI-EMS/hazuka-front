"use client";

import { useState, useEffect } from "react";
import { ChartMixedMonth } from "@/components/mainsite/month-transition";
import { ChartMixedDay } from "@/components/mainsite/day-trantision";
import { ChartBarStackedMonth } from "@/components/mainsite/barstackedmonth";

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
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export default function TwoCharts() {
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
        <ChartPanel title="今月,前月の日別総消費エネルギー量と推移">
          <ChartMixedMonth />
        </ChartPanel>
      ) : (
        <ChartPanel title="設備別・今月の消費エネルギー量">
          <ChartBarStackedMonth />
        </ChartPanel>
      )}
    </div>
  );
}
