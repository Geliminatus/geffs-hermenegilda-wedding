"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

const TARGET = new Date("2026-08-08T15:00:00");

function calc() {
  const d = TARGET.getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export default function Countdown() {
  // Start with zeros so server HTML matches client HTML on first render.
  // useEffect updates to real values after hydration — no mismatch.
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { lang } = useLanguage();

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: t.hero.days, value: time.days },
    { label: t.hero.hours, value: time.hours },
    { label: t.hero.minutes, value: time.minutes },
    { label: t.hero.seconds, value: time.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-5 justify-center">
      {units.map(({ label, value }, i) => (
        <motion.div
          key={tr(label, lang)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl w-[68px] h-[68px] md:w-[90px] md:h-[90px] flex items-center justify-center">
            <motion.span
              key={value}
              initial={{ opacity: 0.4, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="font-playfair text-2xl md:text-4xl text-gold font-bold tabular-nums"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </div>
          <span className="text-[10px] text-zinc-600 uppercase tracking-[0.18em]">
            {tr(label, lang)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
