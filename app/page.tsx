"use client";

import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

export default function HomePage() {
  const { lang } = useLanguage();

  const cards = [
    { label: t.home.card_date_label, value: t.home.card_date_value, sub: t.home.card_date_sub },
    { label: t.home.card_venue_label, value: t.home.card_venue_value, sub: t.home.card_venue_sub },
    { label: t.home.card_event_label, value: t.home.card_event_value, sub: t.home.card_event_sub },
  ];

  return (
    <>
      <Hero />

      {/* Cards strip */}
      <section className="border-y border-white/[0.06] bg-zinc-950">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
          {cards.map(({ label, value, sub }, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className="bg-zinc-950 px-8 py-8">
              <p className="eyebrow mb-2">{tr(label, lang)}</p>
              <p className="font-playfair text-2xl text-white mb-1">{tr(value, lang)}</p>
              <p className="text-sm text-zinc-600">{tr(sub, lang)}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Section 1 — Join us */}
      <section className="section max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="eyebrow-gold mb-4">{tr(t.home.section1_eyebrow, lang)}</p>
            <h2 className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] text-white whitespace-pre-line mb-6">
              {tr(t.home.section1_title, lang)}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">{tr(t.home.section1_body, lang)}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/rsvp" className="btn-primary">{tr(t.home.cta_rsvp, lang)}</Link>
              <Link href="/story" className="btn-ghost">
                {tr(t.home.cta_story, lang)} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="grid grid-cols-2 gap-3">
            {[
              { href: "/details", emoji: "📍", label: t.nav.details },
              { href: "/schedule", emoji: "🗓", label: t.nav.schedule },
              { href: "/gifts", emoji: "🎁", label: t.nav.gifts },
              { href: "/gallery", emoji: "📸", label: t.nav.gallery },
            ].map(({ href, emoji, label }) => (
              <Link
                key={href}
                href={href}
                className="card-hover flex flex-col gap-3 p-6 rounded-2xl"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-sm text-zinc-400">{tr(label, lang)}</span>
              </Link>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section-alt border-y border-white/[0.04]">
        <AnimatedSection className="max-w-3xl mx-auto text-center px-5 py-16">
          <p className="eyebrow mb-4">{tr(t.home.section2_eyebrow, lang)}</p>
          <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-bold text-white whitespace-pre-line mb-5 leading-[1.1]">
            {tr(t.home.section2_title, lang)}
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">{tr(t.home.section2_body, lang)}</p>
          <Link href="/rsvp" className="btn-primary">{tr(t.home.cta_rsvp, lang)}</Link>
        </AnimatedSection>
      </section>
    </>
  );
}
