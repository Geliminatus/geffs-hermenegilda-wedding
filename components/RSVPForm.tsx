"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { submitRSVP } from "@/lib/supabase";
import { CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t, tr, type Lang } from "@/lib/i18n";

/* ─── types ─────────────────────────────────────────────────────────────── */
type Form = {
  name: string;
  contact: string;
  attending: "yes" | "no" | "";
  guests: string;
  message: string;
};
type Errors = Partial<Record<keyof Form, string>>;
const INITIAL: Form = { name: "", contact: "", attending: "", guests: "1", message: "" };

/* ─── Field wrapper — MUST live outside RSVPForm so React never unmounts it ─ */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-zinc-500 uppercase tracking-widest mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ─── validation ────────────────────────────────────────────────────────── */
function validate(form: Form, lang: Lang): Errors {
  const e: Errors = {};
  if (!form.name.trim()) e.name = tr(t.rsvp.err_name, lang);
  if (!form.contact.trim()) {
    e.contact = tr(t.rsvp.err_contact_req, lang);
  } else {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact);
    const phoneOk = /^[+]?[\d\s\-().]{7,20}$/.test(form.contact);
    if (!emailOk && !phoneOk) e.contact = tr(t.rsvp.err_contact_invalid, lang);
  }
  if (!form.attending) e.attending = tr(t.rsvp.err_attending, lang);
  if (form.attending === "yes") {
    const g = parseInt(form.guests, 10);
    if (isNaN(g) || g < 1 || g > 20) e.guests = tr(t.rsvp.err_guests, lang);
  }
  return e;
}

/* ─── main component ────────────────────────────────────────────────────── */
export default function RSVPForm() {
  const { lang } = useLanguage();
  const [form, setForm] = useState<Form>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function setField(k: keyof Form, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form, lang);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await submitRSVP({
        name: form.name.trim(),
        contact: form.contact.trim(),
        attending: form.attending === "yes",
        guests: form.attending === "yes" ? parseInt(form.guests, 10) : 0,
        message: form.message.trim() || undefined,
      });
      setDone(true);
      toast.success(
        lang === "en"
          ? "RSVP submitted! See you in Zanzibar 🎉"
          : "Jibu limetumwa! Tutaonana Zanzibar 🎉"
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("not configured") || msg.includes("supabaseUrl")) {
        toast.error(
          lang === "en"
            ? "RSVP service not connected yet — please set Supabase keys in Vercel."
            : "Huduma ya RSVP haijaunganishwa bado — weka funguo za Supabase kwenye Vercel."
        );
      } else {
        toast.error(
          lang === "en"
            ? "Something went wrong. Please try again."
            : "Hitilafu imetokea. Jaribu tena."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /* ── success screen ───────────────────────────────────────────────────── */
  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-10 md:p-14 text-center max-w-lg mx-auto"
      >
        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-gold" />
        </div>
        <h3 className="font-playfair text-3xl text-white mb-2">
          {tr(t.rsvp.success_title, lang)}
        </h3>
        <p className="text-zinc-400 text-sm mb-1">
          {tr(t.rsvp.success_body, lang)}{" "}
          <span className="text-white">{form.name}</span>.
        </p>
        <p className="text-zinc-600 text-sm">{tr(t.rsvp.success_note, lang)}</p>
        <button
          onClick={() => {
            setDone(false);
            setForm(INITIAL);
          }}
          className="btn-secondary mt-8"
        >
          {tr(t.rsvp.submit_another, lang)}
        </button>
      </motion.div>
    );
  }

  /* ── form ─────────────────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card p-6 md:p-10 max-w-2xl mx-auto space-y-6"
    >
      {/* Name */}
      <Field label={tr(t.rsvp.name_label, lang)} error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder={tr(t.rsvp.name_ph, lang)}
          autoComplete="name"
          className={`input ${errors.name ? "input-error" : ""}`}
        />
      </Field>

      {/* Contact */}
      <Field label={tr(t.rsvp.contact_label, lang)} error={errors.contact}>
        <input
          type="text"
          value={form.contact}
          onChange={(e) => setField("contact", e.target.value)}
          placeholder={tr(t.rsvp.contact_ph, lang)}
          autoComplete="email tel"
          className={`input ${errors.contact ? "input-error" : ""}`}
        />
      </Field>

      {/* Attendance */}
      <Field label={tr(t.rsvp.attending_label, lang)} error={errors.attending}>
        <div className="grid grid-cols-2 gap-3">
          {(["yes", "no"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setField("attending", v)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm transition-all duration-200 ${
                form.attending === v
                  ? v === "yes"
                    ? "border-gold/50 bg-gold/10 text-gold"
                    : "border-red-500/40 bg-red-500/[0.08] text-red-400"
                  : "border-white/[0.06] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300"
              }`}
            >
              {v === "yes" ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
              {v === "yes" ? tr(t.rsvp.accept, lang) : tr(t.rsvp.decline, lang)}
            </button>
          ))}
        </div>
      </Field>

      {/* Number of guests — animated reveal */}
      {form.attending === "yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Field label={tr(t.rsvp.guests_label, lang)} error={errors.guests}>
            <input
              type="number"
              min={1}
              max={20}
              value={form.guests}
              onChange={(e) => setField("guests", e.target.value)}
              className={`input ${errors.guests ? "input-error" : ""}`}
            />
          </Field>
        </motion.div>
      )}

      {/* Message */}
      <Field
        label={`${tr(t.rsvp.message_label, lang)} (${tr(t.rsvp.message_opt, lang)})`}
      >
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder={tr(t.rsvp.message_ph, lang)}
          className="input resize-none"
        />
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            {tr(t.rsvp.submitting, lang)}
          </span>
        ) : (
          tr(t.rsvp.submit, lang)
        )}
      </button>
    </form>
  );
}
