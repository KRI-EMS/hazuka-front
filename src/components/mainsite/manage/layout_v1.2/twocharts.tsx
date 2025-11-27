import { ChartMixedMonth } from "@/components/mainsite/month-transition";
import { ChartMixedDay } from "@/components/mainsite/day-trantision";

export default function TwoCharts() {
  return (
    <div className="w-full h-full grid grid-rows-2 gap-4">
      <div className="bg-neutral-800 rounded-lg p-2 flex items-center justify-center">
        <ChartMixedMonth />
      </div>

      <div className="bg-neutral-800 rounded-lg p-2 flex items-center justify-center">
        <ChartMixedDay />
      </div>
    </div>
  );
}
