"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

export default function DetailsPage() {
  const { lang } = useLanguage();

  return (
    <>
      <div className="page-top max-w-3xl">
        <AnimatedSection>
          <p className="eyebrow-gold mb-4">{tr(t.details.eyebrow, lang)}</p>
          <h1 className="font-playfair text-[clamp(3rem,8vw,5.5rem)] font-bold text-white leading-[1.05]">
            {tr(t.details.title, lang)}
          </h1>
        </AnimatedSection>
      </div>

      <div className="divider" />

      <section className="section max-w-5xl mx-auto space-y-5">
        {/* Ceremony + Reception */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: tr(t.details.ceremony_title, lang),
                venue: tr(t.details.ceremony_venue, lang),
                time: tr(t.details.ceremony_time, lang),
                note: tr(t.details.ceremony_note, lang),
              },
              {
                title: tr(t.details.reception_title, lang),
                venue: tr(t.details.reception_venue, lang),
                time: tr(t.details.reception_time, lang),
                note: tr(t.details.reception_note, lang),
              },
            ].map((item) => (
              <div key={item.title} className="card p-7">
                <p className="eyebrow mb-3">{item.title}</p>
                <p className="font-playfair text-2xl text-white mb-1">{item.venue}</p>
                <p className="text-gold text-sm mb-3">{item.time}</p>
                <div className="divider mb-3" />
                <p className="text-sm text-zinc-500">{item.note}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Dress Code */}
        <AnimatedSection delay={0.1}>
          <div className="card p-7">
            <p className="eyebrow mb-3">{tr(t.details.dress_title, lang)}</p>
            <p className="font-playfair text-2xl text-white mb-1">{tr(t.details.dress_style, lang)}</p>
            <div className="divider my-4" />
            <p className="text-zinc-400 text-sm leading-relaxed">{tr(t.details.dress_body, lang)}</p>
          </div>
        </AnimatedSection>

        {/* Travel */}
        <AnimatedSection delay={0.15}>
          <div className="card p-7">
            <p className="eyebrow mb-3">{tr(t.details.travel_title, lang)}</p>
            <div className="divider my-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.details.travel_items.map((item, i) => (
                <div key={i}>
                  <p className="text-sm text-white font-medium mb-1">{tr(item.title, lang)}</p>
                  <p className="text-sm text-zinc-500 leading-relaxed">{tr(item.body, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Map */}
        <AnimatedSection delay={0.2}>
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <p className="eyebrow">{tr(t.details.map_label, lang)}</p>
            </div>
            <div className="aspect-[16/7]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127748.74987048428!2d39.18634355!3d-6.165919249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd0ba9a5f3f89%3A0x7e5c72d43a9b1eee!2sZanzibar%20City%2C%20Tanzania!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(92%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zanzibar"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
