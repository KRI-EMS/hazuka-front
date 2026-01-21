"use client"

import { Pie, PieChart, Label } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/* ===== データ：設備用途別 ===== */
const chartData = [
  { equip: "室内照明", visitors: 45, fill: "#7dd3fc" },
  { equip: "廊下等照明", visitors: 20, fill: "#fb923c" },
  { equip: "空調", visitors: 10, fill: "#a3e635" },
  { equip: "換気", visitors: 15, fill: "#9ca3af" },
  { equip: "その他", visitors: 10, fill: "#6b7280" },
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
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                  const RADIAN = Math.PI / 180
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.6
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-white text-xs font-medium"
                    >
                      {value}
                    </text>
                  )
                }}
              >
                {/* 円の中心に単位のみ表示 */}
                <Label
                  value="kWh"
                  position="center"
                  className="fill-slate-400 text-xs"
                />
              </Pie>
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
