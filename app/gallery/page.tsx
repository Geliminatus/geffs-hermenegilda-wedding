"use client";

import AnimatedSection from "@/components/AnimatedSection";
import ImageGallery from "@/components/ImageGallery";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

export default function GalleryPage() {
  const { lang } = useLanguage();

  return (
    <>
      <div className="page-top max-w-3xl">
        <AnimatedSection>
          <p className="eyebrow-gold mb-4">{tr(t.gallery.eyebrow, lang)}</p>
          <h1 className="font-playfair text-[clamp(3rem,8vw,5.5rem)] font-bold text-white leading-[1.05]">
            {tr(t.gallery.title, lang)}
          </h1>
        </AnimatedSection>
      </div>

      <div className="divider" />

      <section className="section max-w-6xl mx-auto">
        <AnimatedSection className="mb-10">
          <p className="text-zinc-400 max-w-lg">{tr(t.gallery.intro, lang)}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <ImageGallery />
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <p className="text-sm text-zinc-600">{tr(t.gallery.coming_soon, lang)}</p>
        </AnimatedSection>
      </section>
    </>
  );
}
