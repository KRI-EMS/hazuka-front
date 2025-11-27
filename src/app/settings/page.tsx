"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider"; // あなたが作成した slider.tsx
import { Button } from "@/components/ui/button";

export default function Settings() {
  // スライダーの4段階（インデックス）
  // 0=5s, 1=10s, 2=20s, 3=30s
  const sliderSteps = [5, 10, 20, 30];

  // 表示用の内部状態（インデックス）
  const [sliderIndex, setSliderIndex] = useState(1); // 初期は10秒にしておく

  // localStorage に保存されている設定を読み込む
  useEffect(() => {
    const saved = localStorage.getItem("slideInterval");
    if (saved) {
      const seconds = Number(saved);
      const initialIndex = sliderSteps.indexOf(seconds);
      if (initialIndex !== -1) {
        setSliderIndex(initialIndex);
      }
    }
  }, []);

  // 適用ボタン
  const applySettings = () => {
    const seconds = sliderSteps[sliderIndex];
    localStorage.setItem("slideInterval", String(seconds));
    alert(`スライド表示時間を ${seconds} 秒に設定しました`);
  };

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* 現在設定の表示 */}
      <p className="text-gray-600">
        現在のスライド切り替え間隔:{" "}
        <span className="font-semibold">{sliderSteps[sliderIndex]} 秒</span>
      </p>

      {/* スライダー（4段階） */}
      <div className="space-y-3">
        <span className="font-medium">スライド間隔（秒）</span>

        <Slider
          value={[sliderIndex]}
          min={0}
          max={3}
          step={1}
          onValueChange={(v) => setSliderIndex(v[0])}
          className="w-full"
        />

        <div className="flex justify-between text-sm text-gray-500">
          <span>5s</span>
          <span>10s</span>
          <span>20s</span>
          <span>30s</span>
        </div>
      </div>

      {/* 適用ボタン */}
      <Button onClick={applySettings} className="w-full">
        設定を適用する
      </Button>
    </div>
  );
}
