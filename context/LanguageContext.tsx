"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "@/lib/i18n";

type CtxType = { lang: Lang; setLang: (l: Lang) => void };

const Ctx = createContext<CtxType>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("wedding-lang") as Lang;
    if (saved === "en" || saved === "sw") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("wedding-lang", l);
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}
