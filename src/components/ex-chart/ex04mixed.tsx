"use client"

import { TrendingUp } from "lucide-react"
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A combined bar and line chart"

const exChartData = [
  { date: "2024-04-01", current: 222, previous: 150 },
  { date: "2024-04-02", current: 97, previous: 180 },
  { date: "2024-04-03", current: 167, previous: 120 },
  { date: "2024-04-04", current: 242, previous: 260 },
  { date: "2024-04-05", current: 373, previous: 290 },
  { date: "2024-04-06", current: 301, previous: 340 },
  { date: "2024-04-07", current: 245, previous: 180 },
  { date: "2024-04-08", current: 409, previous: 320 },
  { date: "2024-04-09", current: 59, previous: 110 },
  { date: "2024-04-10", current: 261, previous: 190 },
  { date: "2024-04-11", current: 327, previous: 350 },
  { date: "2024-04-12", current: 292, previous: 210 },
  { date: "2024-04-13", current: 342, previous: 380 },
  { date: "2024-04-14", current: 137, previous: 220 },
  { date: "2024-04-15", current: 120, previous: 170 },
  { date: "2024-04-16", current: 138, previous: 190 },
  { date: "2024-04-17", current: 446, previous: 360 },
  { date: "2024-04-18", current: 364, previous: 410 },
  { date: "2024-04-19", current: 243, previous: 180 },
  { date: "2024-04-20", current: 89, previous: 150 },
  { date: "2024-04-21", current: 137, previous: 200 },
  { date: "2024-04-22", current: 224, previous: 170 },
  { date: "2024-04-23", current: 138, previous: 230 },
  { date: "2024-04-24", current: 387, previous: 290 },
  { date: "2024-04-25", current: 215, previous: 250 },
  { date: "2024-04-26", current: 75, previous: 130 },
  { date: "2024-04-27", current: 383, previous: 420 },
  { date: "2024-04-28", current: 122, previous: 180 },
  { date: "2024-04-29", current: 315, previous: 240 },
  { date: "2024-04-30", current: 454, previous: 380 },
]

const chartData = exChartData.map((d) => ({
  ...d,
  ratio: d.previous === 0 ? 0 : (d.current - d.previous) / d.previous,
}))

const chartConfig = {
  current: {
    label: "Current",
    color: "#60a5fa",
  },
  previous: {
    label: "Previous",
    color: "#2563eb",
  },
  ratio: {
    label: "Ratio",
    color: "#f97316"
  },
} satisfies ChartConfig

export function ChartMixedBarLine() {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Mixed Chart - Bar + Line</CardTitle>
          <CardDescription>
            Current values shown as both bars and lines
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[450px] w-full"
        >
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-current)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-current)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-previous)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-previous)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              yAxisId={1}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <YAxis
              yAxisId={2}
              orientation="right"
              domain={[-1, 0]}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            {/* Bars */}
            <Bar yAxisId={1} dataKey="current" fill="var(--color-current)" radius={4} />
            <Bar yAxisId={1} dataKey="previous" fill="var(--color-previous)" radius={4} />

            {/* Line for current values */}
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
