"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-5">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(212,175,55,0.04),transparent)]" />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="eyebrow-gold"
        >
          {tr(t.hero.eyebrow, lang)}
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-playfair text-[clamp(3rem,10vw,7rem)] font-bold leading-[1.05] text-white"
        >
          Geff <span className="text-gold italic">&</span> Hermenegilda
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease }}
          className="text-zinc-400 text-lg md:text-xl"
        >
          {tr(t.hero.subtitle, lang)}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="w-24 h-px bg-gold/30"
        />

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease }}
          className="flex flex-col items-center gap-3"
        >
          <p className="eyebrow">{tr(t.hero.countdown_label, lang)}</p>
          <Countdown />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.54, ease }}
          className="flex items-center gap-3 mt-2"
        >
          <Link href="/rsvp" className="btn-primary">
            {tr(t.hero.cta_rsvp, lang)}
          </Link>
          <Link href="/details" className="btn-ghost">
            {tr(t.hero.cta_details, lang)} <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-0.5 h-2.5 bg-zinc-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
