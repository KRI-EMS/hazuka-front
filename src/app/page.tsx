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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-screen-xl aspect-video bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-start overflow-hidden">
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
    </main>
  );
}
