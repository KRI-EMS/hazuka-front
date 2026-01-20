"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const sliderSteps = [5, 10, 20, 30];

  const [floor, setFloor] = useState(1);
  const [sliderIndex, setSliderIndex] = useState(1);

  const storageKey = `slideInterval_floor${floor}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const sec = Number(saved);
      const idx = sliderSteps.indexOf(sec);
      if (idx !== -1) setSliderIndex(idx);
    } else {
      setSliderIndex(1);
    }
  }, [floor]);

  const applySettings = () => {
    const seconds = sliderSteps[sliderIndex];
    localStorage.setItem(storageKey, String(seconds));
    alert(`${floor}階のスライド表示時間を ${seconds} 秒に設定しました`);
  };

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="space-y-2">
        <span className="font-medium">設定する階</span>
        <select
          value={floor}
          onChange={(e) => setFloor(Number(e.target.value))}
          className="w-full p-2 rounded border"
        >
          {[1,2,3,4,5,6,7].map((f) => (
            <option key={f} value={f}>{f} 階</option>
          ))}
        </select>
      </div>

      <p className="text-gray-600">
        {floor}階の現在の間隔:{" "}
        <span className="font-semibold">
          {sliderSteps[sliderIndex]} 秒
        </span>
      </p>

      <div className="space-y-3">
        <span className="font-medium">スライド間隔（秒）</span>
        <Slider
          value={[sliderIndex]}
          min={0}
          max={3}
          step={1}
          onValueChange={(v) => setSliderIndex(v[0])}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>5s</span>
          <span>10s</span>
          <span>20s</span>
          <span>30s</span>
        </div>
      </div>

      <Button onClick={applySettings} className="w-full">
        設定を適用する
      </Button>
    </div>
  );
}
