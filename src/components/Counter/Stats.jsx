"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, label, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  return (
    <div ref={ref} className="flex  flex-col items-center text-center ">
      <div className="flex items-baseline gap-1">
        <motion.span className="text-3xl sm:text-4xl font-extrabold text-white">
          {rounded}
        </motion.span>
        <span className="text-2xl sm:text-3xl font-bold text-white">+</span>
      </div>
      <span className="mt-2 text-white text-md sm:text-xl">{label}</span>
    </div>
  );
}

export default function StatsBar() {
  const data = [
    { value: 14, label: "سال تجربه" },
    { value: 102, label: "تورهای داخلی" },
    { value: 752, label: "مسافر ایرانی" },
    { value: 980, label: "سفر داخلی" },
  ];

  return (
    <section className="bg-orange-600 rounded-md mt-16  sm:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-8 relative">
          {data.map((item, i) => (
            <div key={i} className="relative">
              <Counter value={item.value} label={item.label} />
              {i < data.length - 1 && (
                <span className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-0 h-10 w-px bg-white/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
