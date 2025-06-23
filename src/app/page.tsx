"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Component as ExampleChart } from "@/components/example-chart";

import { ChartAreaInteractive as AreaChart } from "@/components/ex-chart/ex01area"
import { ChartBarMultiple as BarChart} from "@/components/ex-chart/ex02bar"
import { ChartLineMultiple as LineChart} from "@/components/ex-chart/ex03line"

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 space-y-8">
      {/* <Button>Click</Button> */}

      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-2">チャート例</h2>
        <ExampleChart />
      </div>


      <Separator className="w-full" />

      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      /> */}

      <div className="w-full max w 3xl">
        <h2 className="text-xl font-semibold mb-2">面グラフ例</h2>
        <AreaChart />
      </div>

      <Separator className="w-full" />

      <div className="w-full max w 3xl">
        <h2 className="text-xl font-semibold mb-2">棒グラフ例</h2>
        <BarChart />
      </div>

      <Separator className="w-full" />

      <div className="w-full max w 3xl">
        <h2 className="text-xl font-semibold mb-2">棒グラフ例</h2>
        <LineChart />
      </div>

      {/* <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet> */}
    </main>
  );
}
