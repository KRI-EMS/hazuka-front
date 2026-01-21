"use client"

import { Pie, PieChart, Label } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { floor: "1F", visitors: 100, fill: "var(--color-blue-900)" },
  { floor: "2F", visitors: 90, fill: "var(--color-blue-800)" },
  { floor: "3F", visitors: 80, fill: "var(--color-blue-700)" },
  { floor: "4F", visitors: 70, fill: "var(--color-blue-600)" },
  { floor: "5F", visitors: 60, fill: "var(--color-blue-500)" },
  { floor: "6F", visitors: 50, fill: "var(--color-blue-400)" },
  { floor: "7F", visitors: 40, fill: "var(--color-blue-300)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  "1F": { label: "1F", color: "var(--color-blue-900)" },
  "2F": { label: "2F", color: "var(--color-blue-800)" },
  "3F": { label: "3F", color: "var(--color-blue-700)" },
  "4F": { label: "4F", color: "var(--color-blue-600)" },
  "5F": { label: "5F", color: "var(--color-blue-500)" },
  "6F": { label: "6F", color: "var(--color-blue-400)" },
  "7F": { label: "7F", color: "var(--color-blue-300)" },
} satisfies ChartConfig

export function ComparisonByFloor() {
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
                    nameKey="visitors"
                    hideLabel
                  />
                }
              />

              <Pie
                data={chartData}
                dataKey="visitors"
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
                {/* 中央に単位のみ表示 */}
                <Label
                  value="kWh"
                  position="center"
                  className="fill-slate-400 text-xs"
                />
              </Pie>
            </PieChart>
          </div>

          {/* 右：凡例 */}
          <div className="flex flex-wrap gap-2 pl-4">
            {chartData.map((item) => (
              <div
                key={item.floor}
                className="flex items-center gap-1 text-xs text-white"
              >
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                {item.floor}
              </div>
            ))}
          </div>
        </div>
      </ChartContainer>
    </div>
  )
}
