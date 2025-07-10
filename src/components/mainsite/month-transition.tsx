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

export const description = "A combined bar and line chart"

const exChartData = [
    { date: "2024-04-01", current: 1420, previous: 1240 },
    { date: "2024-04-02", current: 1390, previous: 1195 },
    { date: "2024-04-03", current: 1475, previous: 1300 },
    { date: "2024-04-04", current: 1530, previous: 1350 },
    { date: "2024-04-05", current: 1602, previous: 1410 },
    { date: "2024-04-06", current: 1205, previous: 1010 }, 
    { date: "2024-04-07", current: 985, previous: 880 },   
    { date: "2024-04-08", current: 1555, previous: 1360 },
    { date: "2024-04-09", current: 1400, previous: 1230 },
    { date: "2024-04-10", current: 1510, previous: 1315 },
    { date: "2024-04-11", current: 1580, previous: 1390 },
    { date: "2024-04-12", current: 1620, previous: 1430 },
    { date: "2024-04-13", current: 1225, previous: 1070 }, 
    { date: "2024-04-14", current: 980, previous: 860 },   
    { date: "2024-04-15", current: 1480, previous: 1280 },
    { date: "2024-04-16", current: 1440, previous: 1265 },
    { date: "2024-04-17", current: 1670, previous: 1505 },
    { date: "2024-04-18", current: 1590, previous: 1415 },
    { date: "2024-04-19", current: 1505, previous: 1310 },
    { date: "2024-04-20", current: 1150, previous: 990 },  
    { date: "2024-04-21", current: 980, previous: 860 },   
    { date: "2024-04-22", current: 1435, previous: 1250 },
    { date: "2024-04-23", current: 1380, previous: 1210 },
    { date: "2024-04-24", current: 1610, previous: 1430 },
    { date: "2024-04-25", current: 1500, previous: 1320 },
    { date: "2024-04-26", current: 1330, previous: 1170 },
    { date: "2024-04-27", current: 1170, previous: 1015 }, 
    { date: "2024-04-28", current: 970, previous: 850 },   
    { date: "2024-04-29", current: 1480, previous: 1290 },
    { date: "2024-04-30", current: 1650, previous: 1465 },
  ]
  

const chartData = exChartData.map((d) => ({
  ...d,
  ratio: d.previous === 0 ? 0 : (d.current - d.previous) / d.previous,
}))

const chartConfig = {
  current: {
    label: "今月",
    color: "#60a5fa",
  },
  previous: {
    label: "前月",
    color: "#2563eb",
  },
  ratio: {
    label: "前月比",
    color: "#f97316"
  },
} satisfies ChartConfig

export function ChartMixedMonth() {
  return (
    <Card className="pt-0">
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
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
                domain={[0, 2000]}
                ticks={[0, 500, 1000, 1500, 2000]}
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
