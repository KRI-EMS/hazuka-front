"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ChartAreaInteractive as AreaChart } from "@/components/ex-chart/ex01area";
import { ChartBarMultiple as BarChart } from "@/components/ex-chart/ex02bar";
import { ChartLineMultiple as LineChart } from "@/components/ex-chart/ex03line";
import { ChartMixedBarLine as MixedExample } from "@/components/ex-chart/ex04mixed";
import { ChartPieLabelList as PieChart } from "@/components/ex-chart/ex05pie";

const slides = [
  { title: "面グラフ例", component: <AreaChart /> },
  { title: "棒グラフ例", component: <BarChart /> },
  { title: "折れ線グラフ例", component: <LineChart /> },
  { title: "その他例1", component: <MixedExample /> },
  { title: "円グラフ例", component: <PieChart /> },
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {slides[index].title}
          </h2>

          <div className="relative flex-grow flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="absolute w-full h-full"
              >
                {slides[index].component}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
