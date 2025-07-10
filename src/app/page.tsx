"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// お試しで作ったグラフ
import { ChartAreaInteractive as AreaChart } from "@/components/ex-chart/ex01area";
import { ChartBarMultiple as BarChart } from "@/components/ex-chart/ex02bar";
import { ChartLineMultiple as LineChart } from "@/components/ex-chart/ex03line";
import { ChartMixedBarLine as MixedExample } from "@/components/ex-chart/ex04mixed";
import { ChartPieLabelList as PieChart } from "@/components/ex-chart/ex05pie";

// 本番使用グラフ
import { ChartMixedMonth as TransitionMonth } from "@/components/mainsite/month-transition";
import { ChartMixedDay as TransitionDay } from "@/components/mainsite/day-trantision";
import { ComparisonByFloor as PieChartFloor } from "@/components/mainsite/floor-compared";

// 使用例
// const slides = [
//   { title: "面グラフ例", component: <AreaChart /> },
//   { title: "棒グラフ例", component: <BarChart /> },
//   { title: "折れ線グラフ例", component: <LineChart /> },
//   { title: "その他例1", component: <MixedExample /> },
//   { title: "円グラフ例", component: <PieChart /> },
// ];

const slides = [
  { title: "今月の14号館全体の消費電力量", component: <TransitionMonth /> },
  { title: "今日の14号館全体の消費電力量", component: <TransitionDay />},
  { title: "各階の消費電力量の割合", component: <PieChartFloor />},
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(slideTimer);
  }, []);

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-screen-xl aspect-video bg-white shadow-lg flex flex-col overflow-hidden">
        
        <div className="bg-blue-400 text-white px-6 py-3 flex justify-between items-center">
          <span className="text-lg font-bold">Energy Management System</span>
          <span className="text-sm font-medium">{formatDate(time)}</span>
        </div>

        <div className="flex-grow p-6 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-semibold mb-4 text-gray-800"
          >
            {slides[index].title}
          </motion.h2>
        </AnimatePresence>
          <div className="relative flex-grow flex flex-col items-center justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className={`w-full ${index === 2 ? "max-w-lg mr-auto" : ""}`}
              >
                {slides[index].component}
              </motion.div>
            </AnimatePresence>
            <div className="w-full max-w-md bg-white border rounded-lg shadow p-4 mr-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-sm font-medium text-muted-foreground">
                    {index === 0 ? "今月の総消費電力量" : "今日の総消費電力量"}
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {index === 0 ? "42,710 kWh" : "2,170 kWh"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {index === 0 ? "+8.2% 前月比" : "+5.4% 前日比"}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
