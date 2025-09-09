"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowRight, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-300/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-400/25 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="mb-6 flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2"
        >
          <Sparkles className="h-4 w-4 text-orange-600" />
          <span className="text-xs text-orange-700">متأسفیم! این صفحه پیدا نشد</span>
        </motion.div>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="select-none text-center text-[9rem] font-black leading-none tracking-tighter text-transparent sm:text-[12rem]"
            style={{ WebkitTextStroke: "6px #0f172a" }}
          >
            <span className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text drop-shadow-[0_10px_30px_rgba(255,115,0,0.35)]">
              ۴۰۴
            </span>
          </motion.h1>
          <div className="pointer-events-none absolute -inset-x-16 bottom-4 h-24 rounded-full bg-gradient-to-r from-orange-500/30 via-orange-400/20 to-orange-500/30 blur-3xl" />
        </div>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 w-full max-w-2xl rounded-3xl border border-orange-200 bg-white p-6 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]"
        >
          <p className="text-base leading-8 text-slate-700">
            صفحه‌ای که دنبالش می‌گردی وجود ندارد یا منتقل شده است. می‌تونی از دکمه‌های زیر استفاده کنی و سریع برگردی.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="بازگشت به خانه"
            >
              <Home className="h-5 w-5" />
              <span>بازگشت به خانه</span>
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-2xl border border-orange-300 bg-white px-5 py-3 font-semibold text-orange-600 shadow-sm transition hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="برو به مقالات"
            >
              <span>مقالات</span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-3 font-semibold text-orange-700 transition hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="ارتباط با ما"
            >
              <span>ارتباط با ما</span>
            </Link>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center text-sm text-orange-700"
        >
          <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
            کد خطا: <b className="font-semibold">NF-404</b>
          </span>
        </motion.div>
      </main>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-orange-100 to-transparent" />
    </div>
  );
}
