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

// const API = process.env.NEXT_PUBLIC_API_URL;

interface EnergyItem {
  day: string;
  energy_kwh: number;
}

interface ComparisonItem {
  date: string;
  current: number;
  previous: number;
  ratio: number;
}

const chartConfig = {
  current: { label: "今月", color: "#60a5fa" },
  previous: { label: "前月", color: "#2563eb" },
  ratio: { label: "前月比", color: "#f97316" },
} satisfies ChartConfig;

export function ChartMixedMonth() {
  const [chartData, setChartData] = useState<ComparisonItem[]>([]);

  useEffect(() => {
    // ---- API データ取得部分をコメントアウト ----
    /*
    const fetchData = async () => {
      const currentMonth = "2025-07";
      const previousMonth = "2025-06";

      const [resNow, resPrev] = await Promise.all([
        fetch(`${API}/api/monthly?month=${currentMonth}`),
        fetch(`${API}/api/monthly?month=${previousMonth}`)
      ]);

      const [nowData, prevData]: [EnergyItem[], EnergyItem[]] = await Promise.all([
        resNow.json(),
        resPrev.json()
      ]);

      const merged = nowData.map((now) => {
        const prev = prevData.find(p => p.day.slice(-2) === now.day.slice(-2));
        const current = now.energy_kwh;
        const previous = prev?.energy_kwh ?? 0;
        const ratio = previous === 0 ? 0 : (current - previous) / previous;

        return {
          date: now.day,
          current,
          previous,
          ratio
        };
      });

      setChartData(merged);
    };

    fetchData();
    */

    // ---- ダミーデータを作成 ----
    const dummyData: ComparisonItem[] = Array.from({ length: 30 }, (_, i) => {
      const day = (i + 1).toString().padStart(2, "0");
      const current = Math.floor(1000 + Math.random() * 800); // 今月
      const previous = Math.floor(900 + Math.random() * 700); // 前月
      const ratio = previous === 0 ? 0 : (current - previous) / previous;

      return {
        date: `2025-07-${day}`,
        current,
        previous,
        ratio
      };
    });

    setChartData(dummyData);
  }, []);

  return (
    <ChartContainer config={chartConfig} className="text-white w-full h-full pt-4 ">
      <ComposedChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
      >
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
          interval={0} 
          tickFormatter={(value, index) => {
            if (index % 3 === 0) {
              const day = value.slice(-2).replace(/^0/, ""); 
              return `Day${day}`;
            }
            return "";
          }}
        />


        <YAxis
          yAxisId={1}
          domain={[0, 2000]}
          tickFormatter={(value) => `${value} kWh`}
          tickLine={false}
          axisLine={false}
          width={60}
        />

        <YAxis
          yAxisId={2}
          orientation="right"
          domain={[-0.2, 0.2]}
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          axisLine={false}
          tickLine={false}
          width={50}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dot"
            />
          }
        />

        <Bar yAxisId={1} dataKey="current" fill="var(--color-current)" radius={2} />
        <Bar yAxisId={1} dataKey="previous" fill="var(--color-previous)" radius={2} />

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
  );
}
