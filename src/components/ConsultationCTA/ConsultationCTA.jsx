"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { z } from "zod";

export default function ConsultationCTA() {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
  });

  const schema = useMemo(
    () =>
      z.object({
        firstName: z.string().min(2, "حداقل ۲ حرف").max(50, "خیلی طولانی شد"),
        lastName: z.string().min(2, "حداقل ۲ حرف").max(50, "خیلی طولانی شد"),
        phone: z
          .string()
          .trim()
          .transform((v) => v.replace(/\D/g, ""))
          .refine((v) => /^0?9\d{9}$/.test(v), { message: "شماره موبایل معتبر نیست" }),
        message: z.string().min(10, "حداقل ۱۰ کاراکتر بنویسید").max(1000),
      }),
    []
  );

  const errors = useMemo(() => {
    const out = {};
    const r = schema.safeParse(form);
    if (!r.success) {
      for (const issue of r.error.issues) {
        out[issue.path[0]] = issue.message;
      }
    }
    return out;
  }, [form, schema]);

  const hasErrors = Object.keys(errors).length > 0;
  const touchedAny = Object.values(touched).some(Boolean);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function markTouched(name) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, phone: true, message: true });
    const parsed = schema.safeParse(form);
    if (!parsed.success) return;

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setOpen(false);
      setForm({ firstName: "", lastName: "", phone: "", message: "" });
      setTouched({});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div dir="rtl" className="w-full mt-6 flex bg-white rounded-xl flex-col items-center text-right">
      <h3 className="text-lg font-bold text-black leading-tight mt-3">برای اطلاعات بیشتر تماس بگیرید</h3>
      <p className="text-md text-neutral-500">هر روز هفته از 9 صبح تا 12 شب</p>

      <motion.button
        layoutId="cta-pill"
        onClick={() => setOpen(true)}
        className="mb-5 mt-8 flex justify-center items-center gap-2 rounded-xl py-4 w-[300px] text-md cursor-pointer font-semibold bg-orange-600 text-white shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <Phone className="w-5 h-5 -rotate-90 " />
        مشاوره رایگان
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <div className="fixed inset-0 z-[70] grid place-items-center p-3">
              <motion.div
                layoutId="cta-pill"
                initial={{ borderRadius: 9999 }}
                animate={{ borderRadius: 20 }}
                exit={{ borderRadius: 9999 }}
                className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <h4 className="text-xl font-bold text-black">فرم مشاوره رایگان</h4>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      بستن
                    </button>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5 text-base">
                    <div className="grid grid-cols-2 gap-5">
                      <Field
                        label="نام"
                        name="firstName"
                        value={form.firstName}
                        onChange={(v) => updateField("firstName", v)}
                        onBlur={() => markTouched("firstName")}
                        error={touched["firstName"] ? errors.firstName : undefined}
                      />
                      <Field
                        label="نام خانوادگی"
                        name="lastName"
                        value={form.lastName}
                        onChange={(v) => updateField("lastName", v)}
                        onBlur={() => markTouched("lastName")}
                        error={touched["lastName"] ? errors.lastName : undefined}
                      />
                    </div>

                    <Field
                      label="شماره موبایل"
                      name="phone"
                      inputMode="tel"
                      placeholder="مثلاً 0912xxxxxxx"
                      value={form.phone}
                      onChange={(v) => updateField("phone", v)}
                      onBlur={() => markTouched("phone")}
                      error={touched["phone"] ? errors.phone : undefined}
                    />
                    
                    <Field
                      label="متن مشاوره"
                      name="message"
                      textarea
                      rows={5}
                      placeholder="سوال یا توضیحات خود را بنویسید"
                      value={form.message}
                      onChange={(v) => updateField("message", v)}
                      onBlur={() => markTouched("message")}
                      error={touched["message"] ? errors.message : undefined}
                    />

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-sm text-neutral-500">
                        با ارسال فرم، قوانین حریم خصوصی را می‌پذیرم.
                      </span>
                      <button
                        type="submit"
                        disabled={submitting || (touchedAny && hasErrors)}
                        className="inline-flex items-center rounded-md px-5 py-2.5 text-base font-semibold bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? "در حال ارسال…" : "ارسال"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  textarea = false,
  rows = 3,
  inputMode,
  placeholder,
}) {
  const id = name;
  const common = {
    id,
    name,
    value,
    onChange: (e) => onChange(e.target.value),
    onBlur,
    placeholder,
    className:
      "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400",
  };

  return (
    <div className="text-right">
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-black">
        {label}
      </label>
      {textarea ? <textarea {...common} rows={rows} /> : <input {...common} inputMode={inputMode} />}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
