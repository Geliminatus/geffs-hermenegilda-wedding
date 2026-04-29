"use client";

import AnimatedSection from "@/components/AnimatedSection";
import PaymentCards from "@/components/PaymentCards";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

export default function GiftsPage() {
  const { lang } = useLanguage();

  return (
    <>
      <div className="page-top max-w-3xl">
        <AnimatedSection>
          <p className="eyebrow-gold mb-4">{tr(t.gifts.eyebrow, lang)}</p>
          <h1 className="font-playfair text-[clamp(2.5rem,7vw,5rem)] font-bold text-white leading-[1.05] whitespace-pre-line">
            {tr(t.gifts.title, lang)}
          </h1>
        </AnimatedSection>
      </div>

      <div className="divider" />

      <section className="section max-w-4xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="text-zinc-400 leading-relaxed max-w-xl">{tr(t.gifts.intro, lang)}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <PaymentCards />
        </AnimatedSection>

        <AnimatedSection delay={0.25} className="mt-12">
          <div className="card p-8 text-center">
            <p className="eyebrow mb-3">{tr(t.gifts.gratitude_title, lang)}</p>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto mb-4">
              {tr(t.gifts.gratitude_body, lang)}
            </p>
            <p className="font-playfair text-gold text-lg italic">{tr(t.gifts.signature, lang)}</p>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
