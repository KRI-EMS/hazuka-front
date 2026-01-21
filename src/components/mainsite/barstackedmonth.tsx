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

export const description = "A stacked bar chart with a legend"

const chartData = [
  { datetime: "20251001", energy: 320, gas: 80,  ghp: 150, other: 40 },
  { datetime: "20251002", energy: 280, gas: 70,  ghp: 140, other: 35 },
  { datetime: "20251003", energy: 310, gas: 75,  ghp: 160, other: 50 },
  { datetime: "20251004", energy: 290, gas: 68,  ghp: 155, other: 45 },
  { datetime: "20251005", energy: 330, gas: 82,  ghp: 170, other: 55 },
  { datetime: "20251006", energy: 305, gas: 77,  ghp: 165, other: 42 },
  { datetime: "20251007", energy: 295, gas: 72,  ghp: 158, other: 38 },
  { datetime: "20251008", energy: 315, gas: 79,  ghp: 162, other: 47 },
  { datetime: "20251009", energy: 300, gas: 74,  ghp: 150, other: 44 },
  { datetime: "20251010", energy: 325, gas: 83,  ghp: 168, other: 52 },
  { datetime: "20251011", energy: 285, gas: 69,  ghp: 145, other: 36 },
  { datetime: "20251012", energy: 298, gas: 71,  ghp: 152, other: 39 },
  { datetime: "20251013", energy: 310, gas: 76,  ghp: 160, other: 41 },
  { datetime: "20251014", energy: 320, gas: 80,  ghp: 166, other: 48 },
  { datetime: "20251015", energy: 305, gas: 73,  ghp: 157, other: 43 },
  { datetime: "20251016", energy: 295, gas: 70,  ghp: 149, other: 37 },
  { datetime: "20251017", energy: 315, gas: 78,  ghp: 165, other: 49 },
  { datetime: "20251018", energy: 290, gas: 67,  ghp: 146, other: 34 },
  { datetime: "20251019", energy: 300, gas: 72,  ghp: 151, other: 40 },
  { datetime: "20251020", energy: 335, gas: 85,  ghp: 172, other: 53 },
  { datetime: "20251021", energy: 310, gas: 79,  ghp: 160, other: 46 },
  { datetime: "20251022", energy: 302, gas: 74,  ghp: 155, other: 42 },
  { datetime: "20251023", energy: 288, gas: 68,  ghp: 147, other: 38 },
  { datetime: "20251024", energy: 318, gas: 81,  ghp: 167, other: 51 },
  { datetime: "20251025", energy: 292, gas: 69,  ghp: 148, other: 35 },
  { datetime: "20251026", energy: 305, gas: 75,  ghp: 159, other: 44 },
  { datetime: "20251027", energy: 297, gas: 71,  ghp: 153, other: 39 },
  { datetime: "20251028", energy: 322, gas: 82,  ghp: 169, other: 50 },
  { datetime: "20251029", energy: 309, gas: 77,  ghp: 161, other: 45 },
  { datetime: "20251030", energy: 295, gas: 70,  ghp: 150, other: 37 },
  { datetime: "20251031", energy: 330, gas: 84,  ghp: 173, other: 54 },
];


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

export function ChartBarStackedMonth() {
  return (
        <ChartContainer config={chartConfig} className="text-white">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="datetime"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={2}
              tickFormatter={(value) => `Day ${Number(value.slice(6, 8))}`}
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
