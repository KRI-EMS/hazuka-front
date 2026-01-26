"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

export const description = "A stacked bar chart (hourly)"

const chartData = [
  { hour: "00", energy: 8,  gas: 3,  ghp: 6,  other: 2 },
  { hour: "01", energy: 7,  gas: 2,  ghp: 6,  other: 2 },
  { hour: "02", energy: 6,  gas: 2,  ghp: 5,  other: 2 },
  { hour: "03", energy: 6,  gas: 2,  ghp: 5,  other: 2 },
  { hour: "04", energy: 7,  gas: 3,  ghp: 6,  other: 2 },
  { hour: "05", energy: 9,  gas: 4,  ghp: 7,  other: 3 },
  { hour: "06", energy: 12, gas: 6,  ghp: 9,  other: 3 },
  { hour: "07", energy: 14, gas: 8,  ghp: 10, other: 4 },
  { hour: "08", energy: 13, gas: 6,  ghp: 12, other: 4 },
  { hour: "09", energy: 11, gas: 4,  ghp: 14, other: 4 },
  { hour: "10", energy: 10, gas: 3,  ghp: 15, other: 4 },
  { hour: "11", energy: 11, gas: 3,  ghp: 16, other: 4 },
  { hour: "12", energy: 12, gas: 4,  ghp: 17, other: 5 },
  { hour: "13", energy: 12, gas: 4,  ghp: 18, other: 5 },
  { hour: "14", energy: 11, gas: 3,  ghp: 18, other: 5 },
  { hour: "15", energy: 11, gas: 3,  ghp: 17, other: 4 },
  { hour: "16", energy: 12, gas: 4,  ghp: 16, other: 4 },
  { hour: "17", energy: 14, gas: 6,  ghp: 15, other: 5 },
  { hour: "18", energy: 16, gas: 9,  ghp: 14, other: 5 },
  { hour: "19", energy: 18, gas: 10, ghp: 13, other: 5 },
  { hour: "20", energy: 17, gas: 8,  ghp: 12, other: 4 },
  { hour: "21", energy: 15, gas: 6,  ghp: 11, other: 4 },
  { hour: "22", energy: 12, gas: 4,  ghp: 9,  other: 3 },
  { hour: "23", energy: 10, gas: 3,  ghp: 8,  other: 3 },
]

const chartConfig = {
  energy: {
    label: "照明",
    color: "#60a5fa",
  },
  gas: {
    label: "ガス",
    color: "#f97316",
  },
  ghp: {
    label: "空調",
    color: "#84cc16",
  },
  other: {
    label: "その他",
    color: "#9ca3af",
  },
} satisfies ChartConfig

export function ChartBarStackedDay() {
  return (
    <ChartContainer config={chartConfig} className="text-white w-full h-full pt-4">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />

        <XAxis
        dataKey="hour"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        interval={1}
        tickFormatter={(value) => `${value}:00`}
        />


        <YAxis
          tickFormatter={(value) => `${value} kWh`}
          tickLine={false}
          axisLine={false}
        />

        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />

        <Bar
          dataKey="energy"
          stackId="a"
          fill="#60a5fa"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="gas"
          stackId="a"
          fill="#f97316"
        />
        <Bar
          dataKey="ghp"
          stackId="a"
          fill="#84cc16"
        />
        <Bar
          dataKey="other"
          stackId="a"
          fill="#9ca3af"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}
