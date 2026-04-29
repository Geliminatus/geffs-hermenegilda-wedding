"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";
import { Users, HeartHandshake, Wine, Utensils, Music } from "lucide-react";

const icons = [
  <Users size={18} key="users" />,
  <HeartHandshake size={18} key="heart" />,
  <Wine size={18} key="wine" />,
  <Utensils size={18} key="food" />,
  <Music size={18} key="music" />,
];

export default function SchedulePage() {
  const { lang } = useLanguage();

  return (
    <>
      <div className="page-top max-w-3xl">
        <AnimatedSection>
          <p className="eyebrow-gold mb-4">{tr(t.schedule.eyebrow, lang)}</p>
          <h1 className="font-playfair text-[clamp(3rem,8vw,5.5rem)] font-bold text-white leading-[1.05]">
            {tr(t.schedule.title, lang)}
          </h1>
        </AnimatedSection>
      </div>

      <div className="divider" />

      <section className="section max-w-3xl mx-auto">
        {/* Date pill */}
        <AnimatedSection className="mb-14">
          <div className="inline-flex items-center gap-4 card px-6 py-3 flex-wrap">
            <span className="text-gold text-xs">{tr(t.schedule.saturday, lang)}</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="font-playfair text-white">August 8, 2026</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-zinc-500 text-xs">Zanzibar</span>
          </div>
        </AnimatedSection>

        {/* Events */}
        <div className="relative">
          {/* Left line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-white/[0.06]" />

          <div className="space-y-3">
            {t.schedule.events.map((ev, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.08}>
                <div className="flex gap-5">
                  {/* Dot */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-5">
                    <div className={`w-[10px] h-[10px] rounded-full z-10 mt-0.5 ${ev.featured ? "bg-gold ring-2 ring-gold/20" : "bg-zinc-700"}`} />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 rounded-2xl p-5 border transition-colors mb-1 ${
                    ev.featured
                      ? "bg-zinc-900 border-gold/20"
                      : "bg-zinc-950 border-white/[0.05]"
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${ev.featured ? "bg-gold/15 text-gold" : "bg-white/[0.04] text-zinc-600"}`}>
                        {icons[idx]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className={`font-playfair text-xl ${ev.featured ? "text-gold" : "text-white"}`}>
                            {ev.time}
                          </span>
                          {ev.featured && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold uppercase tracking-widest">
                              {tr(t.schedule.main_event, lang)}
                            </span>
                          )}
                        </div>
                        <p className="text-white text-sm font-medium mb-1">{tr(ev.title, lang)}</p>
                        <p className="text-zinc-500 text-sm leading-relaxed">{tr(ev.body, lang)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.5} className="mt-12">
          <p className="text-sm text-zinc-600 text-center">{tr(t.schedule.note, lang)}</p>
        </AnimatedSection>
      </section>
    </>
  );
}
