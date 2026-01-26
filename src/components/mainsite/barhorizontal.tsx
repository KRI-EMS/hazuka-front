"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

/* ===== データ（要素数：3） ===== */
const chartData = [
  { name: "現フロア", value: 220 },
  { name: "全フロア合計（現在）", value: 900 },
  { name: "全フロア合計（目標）", value: 760 },
]


/* ===== ChartConfig ===== */
const chartConfig = {
  value: {
    label: "使用量",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function Horizontal() {
  return (
    <div
      className="
        h-full flex flex-col p-3 rounded-xl
        bg-[#0f1b2d]
        border border-cyan-400/40
        shadow-[0_0_16px_rgba(56,189,248,0.35)]
      "
    >
      {/* タイトル */}
      <div className="text-xs text-white border-l-4 border-cyan-400 pl-2 mb-2">
        用途別エネルギー使用量
      </div>

      {/* チャート本体 */}
      <div className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="w-full max-h-[280px] text-white"
        >
          <BarChart
            data={chartData}
            layout="vertical"
            barCategoryGap={0}
            margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
          >
            <CartesianGrid horizontal={false} />

            {/* 左側：要素名（白・右揃え） */}
            <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={140}
            tick={{
                fill: "#ffffff",
                fontSize: 12,
                textAnchor: "end",
                fontWeight: 500,
            }}
            style={{
                opacity: 1,
            }}
            />


            <XAxis type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar
              dataKey="value"
              layout="vertical"
              fill="var(--color-value)"
              radius={4}
              barSize={12}
            >
              {/* 右側：数値（白） */}
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
