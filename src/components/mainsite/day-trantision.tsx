// 接続テストにつき改修中
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
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A combined bar and line chart: today vs yesterday"

const API = process.env.NEXT_PUBLIC_API_URL;

interface HourItem {
  datetime: string; // 例: "2025-07-21 13:00"
  total: number;
}

interface HourlyComparison {
  hour: string;
  today: number;
  yesterday: number;
  ratio: number;
}

const chartConfig = {
  today: {
    label: "今日",
    color: "#60a5fa",
  },
  yesterday: {
    label: "前日",
    color: "#2563eb",
  },
  ratio: {
    label: "前日比",
    color: "#f97316"
  },
} satisfies ChartConfig

// グラフ例として使った固定データ、必要がなくなれば削除
// const hourlyChartData = Array.from({ length: 24 }, (_, hour) => {
//   const baseYesterday = 80 + Math.sin((hour - 12) / 4) * 40 + Math.random() * 10
//   const variation = (Math.random() - 0.5) * 10
//   const today = baseYesterday + 10 + variation

//   return {
//     hour: `${hour}:00`,
//     today: Math.round(today),
//     yesterday: Math.round(baseYesterday),
//     ratio: baseYesterday === 0 ? 0 : (today - baseYesterday) / baseYesterday,
//   }
// })

// const chartConfig = {
//   today: {
//     label: "今日",
//     color: "#60a5fa",
//   },
//   yesterday: {
//     label: "前日",
//     color: "#2563eb",
//   },
//   ratio: {
//     label: "前日比",
//     color: "#f97316"
//   },
// } satisfies ChartConfig

export function ChartMixedDay() {
  const [chartData, setChartData] = useState<HourlyComparison[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [resToday, resYesterday] = await Promise.all([
        fetch(`${API}/api/today`),
        fetch(`${API}/api/yesterday`)
      ])

      const [todayData, yesterdayData]: [HourItem[], HourItem[]] = await Promise.all([
        resToday.json(),
        resYesterday.json()
      ])

      const parsed = todayData.map((todayItem) => {
        const hour = todayItem.datetime.split(" ")[1]; // "13:00"
        const yesterdayItem = yesterdayData.find((y) => y.datetime.endsWith(hour))
        const today = todayItem.total;
        const yesterday = yesterdayItem?.total ?? 0;
        const ratio = yesterday === 0 ? 0 : (today - yesterday) / yesterday;

        return {
          hour,
          today,
          yesterday,
          ratio
        }
      })

      setChartData(parsed)
    }

    fetchData()
  }, [])


  return (
    <>
      <Card className="pt-0">
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <ComposedChart data={chartData}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={12}
                interval={1}
              />

              <YAxis
                yAxisId={1}
                domain={[0, 300]}
                ticks={[0, 100, 200, 300]}
                tickFormatter={(value) => `${value} kWh`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={76}
              />

              <YAxis
                yAxisId={2}
                orientation="right"
                domain={[-0.2, 0.2]}
                ticks={[-0.2, -0.1, 0, 0.1, 0.2]}
                tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => `${value}`}
                    indicator="dot"
                  />
                }
              />

              <Bar yAxisId={1} dataKey="today" fill="var(--color-current)" radius={4} />
              <Bar yAxisId={1} dataKey="yesterday" fill="var(--color-previous)" radius={4} />

              <Line
                yAxisId={2}
                type="linear"
                dataKey="ratio"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
              />

              <ChartLegend content={<ChartLegendContent />} />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="w-[470px] bg-white border rounded-lg shadow p-4 mt-4 mr-auto">
        <div className="text-sm font-medium text-muted-foreground">
          今日の総消費電力量
        </div>
        <div className="text-2xl font-bold mt-1">
          0 kWh
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          0.0% 前月比
        </div>
      </div>
    </>
  )
}
