"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr } from "@/lib/i18n";

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(tr(t.gifts.copied, lang));
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <button onClick={copy}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
        copied ? "border-gold/40 text-gold bg-gold/8" : "border-white/[0.08] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
      }`}>
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? tr(t.gifts.copied, lang) : tr(t.gifts.copy, lang)}
    </button>
  );
}

type Row = { label: string; value: string; copyable?: boolean };

function PaymentCard({ title, sub, rows }: { title: string; sub: string; rows: Row[] }) {
  return (
    <div className="card p-6 md:p-8 flex-1">
      <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1">{sub}</p>
      <h3 className="font-playfair text-xl text-white mb-5">{title}</h3>
      <div className="divider mb-5" />
      <div className="space-y-4">
        {rows.map(({ label, value, copyable }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-0.5">{label}</p>
              <p className="text-sm text-white truncate">{value}</p>
            </div>
            {copyable && <CopyBtn value={value} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PaymentCards() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <PaymentCard
          title={tr(t.gifts.bank_title, lang)}
          sub={tr(t.gifts.bank_sub, lang)}
          rows={[
            { label: tr(t.gifts.bank_label, lang), value: "CRDB BANK" },
            { label: tr(t.gifts.acc_name_label, lang), value: "Geofrey Eliminatus Mfoy" },
            { label: tr(t.gifts.acc_num_label, lang), value: "0152481259300", copyable: true },
          ]}
        />
        <PaymentCard
          title={tr(t.gifts.mpesa_title, lang)}
          sub={tr(t.gifts.mpesa_sub, lang)}
          rows={[
            { label: tr(t.gifts.service_label, lang), value: "M-Pesa" },
            { label: tr(t.gifts.phone_label, lang), value: "0759945036", copyable: true },
            { label: tr(t.gifts.name_label, lang), value: "Geofrey Eliminatus Mfoy" },
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-start gap-3 bg-zinc-950 border border-white/[0.06] rounded-xl px-5 py-4"
      >
        <AlertCircle size={14} className="text-gold flex-shrink-0 mt-0.5" />
        <p className="text-sm text-zinc-400 leading-relaxed">
          <span className="text-white">{tr(t.gifts.warning, lang)}</span>
        </p>
      </motion.div>
    </div>
  );
}
