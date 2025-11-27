"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sl01 from "@/components/mainsite/manage/sl01-defcharts";
import Sl03 from "@/components/mainsite/manage/sl03-building";

export default function FloorPage() {
  const params = useParams();
  const floor = Number(params.id);

  const [time, setTime] = useState(new Date());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
  };

  // スライド構成：各階に応じて表示を切り替えることも可能
  const slides = [
    { id: 0, component: <Sl01 index={0} />, title: `Floor ${floor} - Energy` },
    { id: 1, component: <Sl03 />, title: `Floor ${floor} - Building Status` },
  ];

  // 5秒ごとに切り替え
  useEffect(() => {
    const t = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-screen-xl aspect-video bg-gradient-to-b from-white to-blue-50 shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center">
          <span className="text-lg font-bold">
            Energy Management System - Floor {floor}
          </span>
          <span className="text-sm font-medium">{formatDate(time)}</span>
        </div>

        {/* Main */}
        <div className="flex-grow p-6 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-2xl font-semibold mb-4 text-gray-800"
            >
              {slides[index].title}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex-grow flex flex-col items-center justify-center"
            >
              {slides[index].component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
