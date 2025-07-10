"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart comparing power usage by floor"

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
    <Card className="pt-0">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>各階の使用電力量の割合</CardTitle>
      </CardHeader> */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
            <LabelList
              dataKey="floor"
              className="fill-background animate-fade-in"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
