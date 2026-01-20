"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import GridPanel from "@/components/mainsite/layout_v1.2/gridpanel";
import TwoCharts from "@/components/mainsite/layout_v1.2/twochartsmonth";
import TwoChartsDay from "@/components/mainsite/layout_v1.2/twochartsday";
import { ComparisonByFloor } from "@/components/mainsite/floor-compared";
import { ComparisonByEquip } from "@/components/mainsite/equip-compared";
import { Horizontal } from "@/components/mainsite/barhorizontal";

import { DaySummary } from "@/types/energy";

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [index, setIndex] = useState(0);
  const [intervalMs, setIntervalMs] = useState(10000);

  /* ===== 今日サマリー ===== */
  const [daySummary, setDaySummary] = useState<DaySummary | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("slideInterval_floor2");
    if (saved) {
      setIntervalMs(Number(saved) * 1000);
    }
  }, []);

  /* ===== 時刻更新 ===== */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatFull = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
  };

  /* ===== 共通ヘッダー ===== */
  const Header = ({ title }: { title: string }) => (
    <div>
      <div className="flex items-center justify-between px-6 py-2 bg-[#0b1220] border border-cyan-400/30 rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.25)]">
        <div className="text-lg font-semibold tracking-widest text-white">
          {title}
        </div>
        <div className="text-sm text-cyan-200 font-mono">
          {formatFull(time)}
        </div>
      </div>
      <div className="mt-2 h-[2px] bg-cyan-400/70 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
    </div>
  );

  /* ===== スライド ===== */
  const slides: React.ReactNode[] = [
    /* ===== 1枚目：今月 ===== */
    <div className="flex flex-col h-full gap-4">
      <Header title="2F - 今月のエネルギー消費量データ" />
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="col-span-4 grid gap-4">
          <GridPanel title="今月の総消費電力量" value="0 kWh" />
          <div className="grid grid-cols-2 gap-4">
            <GridPanel title="今月の平均消費電力量" value="0 kW" />
            <GridPanel title="今月の最大消費電力量" value="0 kW" />
            <GridPanel title="CO2排出量" value="0 kg" />
            <GridPanel title="最終更新日時" value="No Data" />
          </div>
          <GridPanel title="階別消費電力量割合">
            <ComparisonByFloor />
          </GridPanel>
        </div>
        <div className="col-span-8 min-h-0">
          <TwoCharts />
        </div>
      </div>
    </div>,

    /* ===== 2枚目：今日 ===== */
    <div className="flex flex-col h-full gap-4">
      <Header title="2F - 今日のエネルギー消費量データ" />
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="col-span-4 grid gap-4">
          <GridPanel
            title="今日の総エネルギー消費量"
            value={daySummary ? `${daySummary.total.toFixed(0)} kWh` : "--"}
          />
          <div className="grid grid-cols-2 gap-4">
            <GridPanel
              title="今日の平均エネルギー消費量"
              value={daySummary ? `${daySummary.average.toFixed(1)} kW` : "--"}
            />
            <GridPanel
              title="今日の最大エネルギー消費量"
              value={daySummary ? `${daySummary.max.toFixed(0)} kW` : "--"}
            />
            <GridPanel
              title="CO2排出量"
              value={
                daySummary
                  ? `${(daySummary.total * 0.4).toFixed(1)} kg`
                  : "--"
              }
            />
            {/* CO2排出量計算 - 参照: https://policies.env.go.jp/earth/ghg-santeikohyo/files/calc/itiran_2023_rev4.pdf */}
            <GridPanel
              title="最終更新日時"
              value="2026/01/01 23:59:59"
            />
          </div>
          <GridPanel title="階別消費電力量割合">
            <ComparisonByFloor />
          </GridPanel>
        </div>

        <div className="col-span-8 min-h-0">
          <TwoChartsDay onSummaryChange={setDaySummary} />
        </div>
      </div>
    </div>,

    /* ===== 3枚目：部屋別 ===== */
    <div className="flex flex-col h-full gap-4">
      <Header title="1F - 部屋別エネルギー消費量" />
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="col-span-4 grid gap-4">
          <GridPanel title="101,102,103 照明" value="-- kWh" />
          <GridPanel title="104,105,106 照明" value="-- kWh" />
          <GridPanel title="107,108,109 照明" value="-- kWh" />
          <GridPanel title="110,111,112 照明" value="-- kWh" />
        </div>

        <div className="col-span-4 flex items-center justify-center">
          <img
            src="/floors/floor001.svg"
            alt="Floor 1 Layout"
            className="w-full h-full max-w-[95%] max-h-[95%] object-contain"
          />
        </div>

        <div className="col-span-4 grid gap-4">
          <GridPanel title="113,114,115 照明" value="-- kWh" />
          <GridPanel title="エントランス 照明" value="-- kWh" />
          <GridPanel title="廊下 照明" value="-- kWh" />
          <GridPanel title="スポットライト 照明" value="-- kWh" />
        </div>
      </div>
    </div>,

    /* ===== 4枚目：用途別 ===== */
    <div className="flex flex-col h-full gap-4">
      <Header title="1F - 用途別エネルギー消費量" />
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="col-span-4 grid gap-4 min-h-0">
          <GridPanel title="最終更新日時" value="2026/01/01 23:59:59" />
          <GridPanel title="合計エネルギー量" value="-- kWh" />
          <GridPanel title="用途別消費割合">
            <ComparisonByEquip />
          </GridPanel>
        </div>

        <div className="col-span-8 flex flex-col gap-4 min-h-0">
          <div className="flex-1 min-h-0">
            <Horizontal />
          </div>
          <div className="h-[400px] p-3 rounded-xl bg-[#0f1b2d] border border-cyan-400/40 shadow-[0_0_16px_rgba(56,189,248,0.35)] text-white text-xs">
            追加情報エリア（省エネ目標・基準比較・注意喚起）
          </div>
        </div>
      </div>
    </div>,
  ];

  /* ===== スライド切替 ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  return (
    <main className="w-screen h-screen bg-[#0b1220] flex items-center justify-center">
      <div className="w-full h-full p-4">
        <div className="relative w-full h-full aspect-video bg-gradient-to-br from-[#0b1220] via-[#0f1b2d] to-[#0b1220] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 p-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {slides[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
