"use client";

import AnimatedSection from "@/components/AnimatedSection";
import RSVPForm from "@/components/RSVPForm";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

export default function RSVPPage() {
  const { lang } = useLanguage();

  return (
    <>
      <div className="page-top max-w-3xl">
        <AnimatedSection>
          <p className="eyebrow-gold mb-4">{tr(t.rsvp.eyebrow, lang)}</p>
          <h1 className="font-playfair text-[clamp(3rem,8vw,5.5rem)] font-bold text-white leading-[1.05]">
            {tr(t.rsvp.title, lang)}
          </h1>
        </AnimatedSection>
      </div>

      <div className="divider" />

      <section className="section max-w-3xl mx-auto">
        <AnimatedSection className="mb-10">
          <p className="text-zinc-400 leading-relaxed">
            {tr(t.rsvp.intro, lang)}{" "}
            <span className="text-white">{tr(t.rsvp.deadline, lang)}</span>
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <RSVPForm />
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-8 text-center">
          <p className="text-xs text-zinc-700">
            {tr(t.rsvp.contact_help, lang)}{" "}
            <a href="mailto:geofreyeliminatus@gmail.com" className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">
              geofreyeliminatus@gmail.com
            </a>
          </p>
        </AnimatedSection>
      </section>
    </>
  );
}
