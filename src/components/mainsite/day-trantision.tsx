// 接続テストにつき改修中
"use client"

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

const hourlyChartData = Array.from({ length: 24 }, (_, hour) => {
  const baseYesterday = 80 + Math.sin((hour - 12) / 4) * 40 + Math.random() * 10
  const variation = (Math.random() - 0.5) * 10
  const today = baseYesterday + 10 + variation

  return {
    hour: `${hour}:00`,
    today: Math.round(today),
    yesterday: Math.round(baseYesterday),
    ratio: baseYesterday === 0 ? 0 : (today - baseYesterday) / baseYesterday,
  }
})

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

export function ChartMixedDay() {
  return (
    <Card className="pt-0">
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <ComposedChart data={hourlyChartData}>
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
  )
}
