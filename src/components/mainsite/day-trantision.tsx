"use client"

import { useEffect, useState } from "react"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Line,
  ComposedChart,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { DaySummary } from "@/types/energy"

interface HourlyComparison {
  hours: string
  today: number
  yesterday: number
  comp: number
}

interface Props {
  onSummaryChange?: (summary: DaySummary) => void
}

/* ===== ダミー日次データ生成 ===== */
const generateHourlyData = (): HourlyComparison[] => {
  const data: HourlyComparison[] = []

  for (let h = 0; h < 24; h++) {
    const base =
      h < 6 ? 20 :
      h < 9 ? 60 :
      h < 18 ? 120 :
      h < 22 ? 80 : 40

    const today = Math.round(base + Math.random() * 20 - 10)
    const yesterday = Math.round(base + Math.random() * 20 - 10)
    const comp = yesterday === 0 ? 0 : (today - yesterday) / yesterday

    data.push({
      hours: String(h),
      today,
      yesterday,
      comp,
    })
  }

  return data
}

const chartConfig = {
  today: { label: "当日", color: "#60a5fa" },
  yesterday: { label: "前日", color: "#2563eb" },
  comp: { label: "前日比", color: "#f97316" },
} satisfies ChartConfig

export function ChartMixedDay({ onSummaryChange }: Props) {
  const [data, setData] = useState<HourlyComparison[]>([])

  useEffect(() => {
    const d = generateHourlyData()
    setData(d)

    const total = d.reduce((sum, v) => sum + v.today, 0)
    const average = total / d.length
    const max = Math.max(...d.map(v => v.today))

    onSummaryChange?.({ total, average, max })
  }, [onSummaryChange])

  return (
    <ChartContainer config={chartConfig} className="w-full h-full text-white">
      <ComposedChart data={data}>
        {/* 横グリッドのみ表示（縦線は消す） */}
        <CartesianGrid vertical={false} strokeOpacity={0.3} />

        {/* X軸：1時間飛ばし表示 */}
        <XAxis
          dataKey="hours"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#fff" }}
          interval={0}
          tickFormatter={(v) =>
            Number(v) % 2 === 0 ? `${v}:00` : ""
          }
        />

        {/* 左Y軸（消費量） */}
        <YAxis
          yAxisId={1}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#fff" }}
          tickFormatter={(value) => `${value} kWh`}
        />

        {/* 右Y軸（前日比） */}
        <YAxis
          yAxisId={2}
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#fff" }}
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
        />

        <Bar yAxisId={1} dataKey="today" fill="#60a5fa" />
        <Bar yAxisId={1} dataKey="yesterday" fill="#2563eb" />
        <Line
          yAxisId={2}
          dataKey="comp"
          stroke="#f97316"
          dot={false}
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}
