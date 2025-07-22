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


    </>
  );
}
