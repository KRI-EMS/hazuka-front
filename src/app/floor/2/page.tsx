"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import GridPanel from "@/components/mainsite/layout_v1.2/gridpanel";
import TwoCharts from "@/components/mainsite/layout_v1.2/twochartsmonth";
import { ComparisonByFloor } from "@/components/mainsite/floor-compared";
import { ComparisonByEquip } from "@/components/mainsite/equip-compared";
import { Horizontal } from "@/components/mainsite/barhorizontal";
import TwoChartsDay from "@/components/mainsite/layout_v1.2/twochartsday";


export default function Home() {
  const [time, setTime] = useState(new Date());
  const [index, setIndex] = useState(0);
  const [intervalMs, setIntervalMs] = useState(10000);
  const [statusValue] = useState(118); 

  const statusInfo = (() => {
    if (statusValue <= 70) {
      return { label: "良好", color: "text-green-400" };
    }
    if (statusValue <= 100) {
      return { label: "注意", color: "text-yellow-400" };
    }
    return { label: "危険", color: "text-red-500" };
  })();


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
      <div
        className="
          flex items-center justify-between
          px-6 py-2
          bg-[#0b1220]
          border border-cyan-400/30
          rounded-lg
          shadow-[0_0_20px_rgba(56,189,248,0.25)]
        "
      >
        <div className="text-lg font-semibold tracking-widest text-white">
          {title}
        </div>
        <div className="text-sm text-cyan-200 font-mono">
          {formatFull(time)}
        </div>
      </div>

      {/* ネオンライン */}
      <div className="mt-2 h-[2px] bg-cyan-400/70 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
    </div>
  );

  /* ===== スライド定義 ===== */
  const slides: React.ReactNode[] = [
    /* ===== 1枚目：今月 ===== */
    <div className="flex flex-col h-full gap-4">
      <Header title="2F - 今月のエネルギー消費量データ" />

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* 左 */}
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

        {/* 右 */}
        <div className="col-span-8 min-h-0">
          <TwoCharts />
        </div>
      </div>
    </div>,

    /* ===== 2枚目：今日 ===== */
    <div className="flex flex-col h-full gap-4">
      <Header title="2F - 今日のエネルギー消費量データ" />

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* 左 */}
        <div className="col-span-4 grid gap-4">
          <GridPanel title="今日の総消費電力量" value="0 kWh" />

          <div className="grid grid-cols-2 gap-4">
            <GridPanel title="今日の平均消費電力量" value="0 kW" />
            <GridPanel title="今日の最大消費電力量" value="0 kW" />
            <GridPanel title="CO2排出量" value="0 kg" />
            <GridPanel title="最終更新日時" value="No Data" />
          </div>

          <GridPanel title="階別消費電力量割合">
            <ComparisonByFloor />
          </GridPanel>
        </div>

        {/* 右 */}
        <div className="col-span-8 min-h-0">
          <TwoChartsDay />
        </div>
      </div>
    </div>,

    /* ===== 3枚目：部屋別（SVG） ===== */
    <div className="flex flex-col h-full gap-4 relative">
      <Header title="2F - 部屋別エネルギー消費量" />

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* 左 */}
        <div className="col-span-4 grid grid gap-4">
          <GridPanel title="201 照明" value="-- kWh" className="w-[300px]"/>
          <GridPanel title="202,WC,給湯室 照明" value="-- kWh" className="w-[300px]"/>
          <GridPanel title="204 照明" value="-- kWh" className="w-[300px]"/>
          <GridPanel title="コレクティブラウンジ,廊下 照明" value="-- kWh" className="w-[300px]"/>
        </div>

        {/* ===== 中央 SVG（4カラム） ===== */}
        <div
          className="
            col-span-4
            flex items-center justify-center
          "
        >
          <img
            src="/floors/floor002.svg"
            alt="Floor 2 Layout"
            className="absolute inset-0 object-contain pointer-events-none max-w-[60%] max-h-[60%] m-auto"
          />
        </div>


        {/* 右 */}
        <div className="col-span-4 grid gap-4 justify-self-end">
          <GridPanel title="その他 照明" value="データなし" className="w-[300px]"/>
          {/* <GridPanel title="コレクティブラウンジ 照明" value="-- kWh" className="w-[300px]"/>
          <GridPanel title="廊下 照明" value="-- kWh" className="w-[300px]"/>
          <GridPanel title="スポットライト 照明" value="-- kWh" className="w-[300px]"/> */}
        </div>
      </div>
    </div>,

    /* ===== 4枚目：用途別エネルギー消費量（横棒） ===== */
    <div className="flex flex-col h-full gap-4">
    <Header title="2F - 用途別エネルギー消費量" />

    <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* ===== 左 ===== */}
        <div className="col-span-4 grid gap-4 min-h-0">
        <GridPanel title="最終更新日時" value="No Data" />
        <GridPanel title="合計エネルギー量" value="-- kWh" />

        {/* ▼ 円グラフ（ComparisonByFloor） */}
        <GridPanel title="フロア別消費割合">
            <ComparisonByEquip />
        </GridPanel>
        </div>

        {/* ===== 右 ===== */}
        <div className="col-span-8 flex flex-col gap-4 min-h-0">
        {/* 横棒チャート */}
        <div className="flex-1 min-h-0">
            <Horizontal />
        </div>

        {/* ▼ 高さ可変の追加枠 */}
        <div
            className="
              h-[300px]
              p-3
              rounded-xl
              bg-[#0f1b2d]
              border border-cyan-400/40
              shadow-[0_0_16px_rgba(56,189,248,0.35)]
              text-white
              text-xs
              flex flex-col justify-center
              gap-6
            "
            style={{
              "--title-size": "30px",
              "--status-size": "60px",
              "--desc-size": "12px",
            } as React.CSSProperties}
        >
          {/* ===== 追加情報エリア中身 ===== */}

          {/* 題名 */}
          <div className="text-center text-white mb-2 font-semibold" style={{ fontSize: "var(--title-size)" }}>
            システム稼働状況
          </div>

          {/* ステータス行 */}
          <div className="flex justify-center items-center gap-8 mb-3">
            <span className="text-white text-[var(--status-size)]" style={{ fontSize: "var(--status-size)" }}>
              {statusValue}%
            </span>

            <span className={`${statusInfo.color} font-medium`} style={{ fontSize: "var(--status-size)" }}>
              {statusInfo.label}
            </span>
          </div>

          {/* 説明文 */}
          <div className="text-center text-white/60 text-[var(--desc-size)] leading-relaxed" style={{ fontSize: "var(--desc-size)" }}>
            ※ 0~70% - 良好, 71%~100% - 注意, 101%~ - 危険
            
          </div>

        </div>
        </div>
    </div>
</div>,

  ];

  /* ===== スライド切り替え ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  return (
    <main className="w-screen h-screen bg-[#0b1220] flex items-center justify-center">
      <div className="w-full h-full p-4">
        <div
          className="
            relative
            w-full h-full
            aspect-video
            bg-gradient-to-br from-[#0b1220] via-[#0f1b2d] to-[#0b1220]
            overflow-hidden
          "
        >
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
