"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides as slideData } from "@/data/slides";

import Sl01 from "@/components/mainsite/manage/sl01-defcharts";
import Sl03 from "@/components/mainsite/manage/sl03-building";

type SlideIndex = 0 | 1 | 2 | "transition";

export default function Home() {
  const [index, setIndex] = useState<SlideIndex>(0);
  const [time, setTime] = useState(new Date());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // スライド表示時間
    let displayDuration = 10000;

    if (index === 2) {
      displayDuration = 35000;
    }

    // memo:transition用に別途短時間（100ms）を入れたい場合はここで分ける処理を書く

    timeoutRef.current = setTimeout(() => {
      if (index === 1) {
        setIndex("transition");
        setTimeout(() => {
          setIndex(2);
        }, 100); // transition
      } else if (index === 2) {
        setIndex(0);
      } else if (typeof index === "number") {
        setIndex(((index + 1) % 3) as SlideIndex);
      }
    }, displayDuration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);


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
      <div className="w-full max-w-screen-xl aspect-video bg-gradient-to-b from-white to-blue-50 shadow-lg flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-blue-400 text-white px-6 py-3 flex justify-between items-center">
          <span className="text-lg font-bold">Energy Management System</span>
          <span className="text-sm font-medium">{formatDate(time)}</span>
        </div>

        {/* メイン */}
        <div className="flex-grow p-6 flex flex-col justify-start">
          {/* タイトル */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-2xl font-semibold mb-4 text-gray-800"
            >
              {index === 0 && slideData[0].title}
              {index === 1 && slideData[1].title}
              {index === 2 && slideData[2].title}
            </motion.h2>
          </AnimatePresence>

          {/* スライド表示 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex-grow flex flex-col items-center justify-center space-y-6"
            >
              {index === 0 && <Sl01 index={0} />}
              {index === 1 && <Sl01 index={1} />}
              {index === 2 && <Sl03 />}
              {index === "transition" && null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
