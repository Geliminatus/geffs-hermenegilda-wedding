"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

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
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-playfair text-gold text-lg font-bold tracking-widest hover:text-gold-light transition-colors"
          >
            G&H
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={`text-[13px] transition-colors duration-200 ${
                  pathname === href ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {tr(key, lang)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "sw" : "en")}
              className="hidden sm:flex items-center gap-1 text-[12px] font-medium rounded-full border border-white/10 px-3 py-1.5 transition-all duration-200 hover:border-white/20"
            >
              <span className={lang === "en" ? "text-gold" : "text-zinc-600"}>EN</span>
              <span className="text-zinc-700 text-[10px]">/</span>
              <span className={lang === "sw" ? "text-gold" : "text-zinc-600"}>SW</span>
            </button>

            {/* Mobile menu btn */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden text-zinc-400 hover:text-white transition-colors p-1"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 right-0 z-50 w-64 bg-zinc-950 border-l border-white/[0.06] flex flex-col pt-16 pb-8 px-5 lg:hidden"
            >
              <nav className="flex flex-col gap-0.5">
                {links.map(({ href, key }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`py-3 px-3 rounded-lg text-sm transition-colors duration-200 ${
                      pathname === href
                        ? "text-white bg-white/[0.06]"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {tr(key, lang)}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <div className="divider mb-5" />
                {/* Language toggle in mobile */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600">Language</span>
                  <button
                    onClick={() => setLang("en")}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${lang === "en" ? "border-gold text-gold" : "border-white/10 text-zinc-500"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang("sw")}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${lang === "sw" ? "border-gold text-gold" : "border-white/10 text-zinc-500"}`}
                  >
                    Kiswahili
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
