import { ChartMixedMonth } from "@/components/mainsite/month-transition";
import { ChartMixedDay } from "@/components/mainsite/day-trantision";
import { motion, AnimatePresence } from "framer-motion";

export default function Sl01({ index }: { index: number }) {
  const Chart = index === 0 ? <ChartMixedMonth /> : <ChartMixedDay />;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {Chart}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="w-[470px] bg-white border rounded-lg shadow p-4 mr-auto">
            <div className="text-sm font-medium text-muted-foreground">
              {index === 0 ? "今月の総消費電力量" : "今日の総消費電力量"}
            </div>
            <div className="text-2xl font-bold mt-1">
              {index === 0 ? "42,710 kWh" : "2,170 kWh"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {index === 0 ? "+8.2% 前月比" : "+5.4% 前日比"}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
