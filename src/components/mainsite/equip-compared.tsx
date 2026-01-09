"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/* ===== データ：設備用途別 ===== */
const chartData = [
  { equip: "室内照明", visitors: 45, fill: "#7dd3fc" }, // 少し薄い水色
  { equip: "廊下等照明", visitors: 20, fill: "#fb923c" }, // オレンジ
  { equip: "空調", visitors: 10, fill: "#a3e635" }, // 黄緑
  { equip: "換気", visitors: 15, fill: "#9ca3af" }, // グレー
  { equip: "その他", visitors: 10, fill: "#6b7280" }, // 濃いグレー
]

/* ===== ChartConfig ===== */
const chartConfig = {
  visitors: {
    label: "使用量",
  },
  室内照明: { label: "室内照明", color: "#7dd3fc" },
  廊下等照明: { label: "廊下等照明", color: "#fb923c" },
  空調: { label: "空調", color: "#a3e635" },
  換気: { label: "換気", color: "#9ca3af" },
  その他: { label: "その他", color: "#6b7280" },
} satisfies ChartConfig

export function ComparisonByEquip() {
  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <div className="flex h-full items-center">
          {/* 左：円グラフ */}
          <div className="flex-1 aspect-square max-h-full">
            <PieChart width={200} height={200}>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="equip"
                    hideLabel
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="equip"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
              />
            </PieChart>
          </div>

          {/* 右：凡例チップ */}
          <div className="flex flex-wrap gap-2 pl-4">
            {chartData.map((item) => (
              <div
                key={item.equip}
                className="flex items-center gap-1 text-xs text-white"
              >
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                {item.equip}
              </div>
            ))}
          </div>
        </div>
      </ChartContainer>
    </div>
  )
}
