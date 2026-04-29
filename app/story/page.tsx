"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

const imgSeeds = [
  { src: "/gallery/couple-boat.jpg", personal: true },
  { src: "/gallery/couple-hands.jpg", personal: true },
  { src: "/gallery/family.jpg", personal: true },
  { src: "https://picsum.photos/seed/zanzibar-proposal/700/500", personal: false },
  { src: "https://picsum.photos/seed/zanzibar-wedding-forever/700/500", personal: false },
];

export default function StoryPage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Top */}
      <div className="page-top max-w-3xl">
        <AnimatedSection>
          <p className="eyebrow-gold mb-4">{tr(t.story.eyebrow, lang)}</p>
          <h1 className="font-playfair text-[clamp(3rem,8vw,5.5rem)] font-bold text-white leading-[1.05]">
            {tr(t.story.title, lang)}
          </h1>
        </AnimatedSection>
      </div>

      <div className="divider" />

      {/* Timeline */}
      <section className="section max-w-5xl mx-auto">
        <div className="space-y-28">
          {t.story.timeline.map((item, idx) => (
            <AnimatedSection key={idx} delay={0.05}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${idx % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
                {/* Image */}
                <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${idx % 2 !== 0 ? "lg:[direction:ltr]" : ""}`}>
                  <Image
                    src={imgSeeds[idx].src}
                    alt={tr(item.title, lang)}
                    fill
                    className={`object-cover ${imgSeeds[idx].personal ? "grayscale" : ""}`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-playfair text-gold text-2xl font-bold">{tr(item.year, lang)}</span>
                  </div>
                </div>

                {/* Text */}
                <div className={idx % 2 !== 0 ? "lg:[direction:ltr]" : ""}>
                  <p className="eyebrow mb-3">{tr(item.sub, lang)}</p>
                  <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4 leading-tight">
                    {tr(item.title, lang)}
                  </h2>
                  <div className="w-10 h-px bg-gold/40 mb-5" />
                  <p className="text-zinc-400 leading-relaxed">{tr(item.body, lang)}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="section-alt border-t border-white/[0.04]">
        <AnimatedSection className="max-w-2xl mx-auto text-center px-5 py-16">
          <blockquote className="font-playfair text-2xl md:text-3xl text-white/80 italic leading-relaxed mb-4">
            {tr(t.story.quote, lang)}
          </blockquote>
          <p className="text-zinc-600 text-sm">{tr(t.story.quote_attr, lang)}</p>
        </AnimatedSection>
      </section>
    </>
  );
}
