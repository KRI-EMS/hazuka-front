"use client";

import { useState, useEffect } from "react";
import { ChartMixedDay } from "@/components/mainsite/day-trantision";
import { ChartBarStackedDay } from "@/components/mainsite/barstackedday";
import { DaySummary } from "@/types/energy";

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col p-3 rounded-xl bg-[#0f1b2d] border border-cyan-400/40">
      <div className="text-xs text-white border-l-4 border-cyan-400 pl-2 mb-2">
        {title}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

interface Props {
  onSummaryChange?: (summary: DaySummary) => void
}

export default function TwoChartsDay({ onSummaryChange }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(p => (p + 1) % 2), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full">
      {index === 0 ? (
        <ChartPanel title="24時間毎の消費エネルギー量（日次比較）">
          <ChartMixedDay onSummaryChange={onSummaryChange} />
        </ChartPanel>
      ) : (
        <ChartPanel title="日次比較チャート">
          <ChartBarStackedDay />
        </ChartPanel>
      )}
    </div>
  );
}
