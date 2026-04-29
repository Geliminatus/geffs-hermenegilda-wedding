"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLanguage();

  const links = [
    { href: "/", key: t.nav.home },
    { href: "/story", key: t.nav.story },
    { href: "/details", key: t.nav.details },
    { href: "/schedule", key: t.nav.schedule },
    { href: "/rsvp", key: t.nav.rsvp },
    { href: "/gifts", key: t.nav.gifts },
    { href: "/gallery", key: t.nav.gallery },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-playfair text-gold text-xl font-bold tracking-widest mb-1">G & H</p>
            <p className="text-sm text-zinc-600">{tr(t.footer.tagline, lang)}</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map(({ href, key }) => (
              <Link key={href} href={href} className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
                {tr(key, lang)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="divider mt-10 mb-6" />
        <p className="text-xs text-zinc-700 text-center">{tr(t.footer.made_with, lang)}</p>
      </div>
    </footer>
  );
}
