'use client'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, ChevronDown, Copy } from 'lucide-react'

export default function Error({
    error,
    reset,
}) {
    const [showDetails, setShowDetails] = useState(false)

    const errorDetails = useMemo(() => {
        const lines = [
            `message: ${error?.message ?? 'Unknown error'}`,
            error?.name ? `name: ${error.name}` : undefined,
            error?.stack ? `stack:\n${error.stack}` : undefined,
            error?.digest ? `digest: ${error.digest}` : undefined,
        ].filter(Boolean)
        return lines.join('\n')
    }, [error])

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(errorDetails)
        } catch (_) { }
    }

    return (
        <div className="relative min-h-screen w-full bg-white text-neutral-900 overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-25 bg-orange-300" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-orange-400" />
                <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            <main className="relative mx-auto flex min-h-screen max-w-3xl items-center justify-center p-6">
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full"
                >
                    <div className="mx-auto rounded-2xl border border-orange-100 bg-white/80 backdrop-blur shadow-xl">
                        <div className="flex flex-col items-center gap-4 px-8 pt-10 text-center">
                            <motion.div
                                initial={{ scale: 0.9, rotate: -8, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                                className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg"
                            >
                                <AlertTriangle className="h-10 w-10" />
                            </motion.div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                    مشکلی پیش آمد
                                </h1>
                                <p className="text-sm leading-6 text-neutral-600 sm:text-base">
                                    درخواست شما به‌درستی پردازش نشد. می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-3 px-8 pb-8 sm:flex-row sm:justify-center">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                                onClick={() => reset()}
                            >
                                <RefreshCw className="h-4 w-4" />
                                تلاش مجدد
                            </motion.button>

                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-2.5 text-orange-700 shadow-sm transition hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                            >
                                <Home className="h-4 w-4" />
                                بازگشت به خانه
                            </Link>

                            <button
                                onClick={() => setShowDetails((s) => !s)}
                                className="group inline-flex items-center gap-1 rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
                            >
                                جزئیات خطا
                                <ChevronDown className="h-4 w-4 transition group-data-[open=true]:rotate-180" />
                            </button>
                        </div>

                        <AnimatePresence initial={false}>
                            {showDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="mx-6 mb-6 overflow-hidden"
                                >
                                    <div className="rounded-xl border border-neutral-200 bg-neutral-50">
                                        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2">
                                            <span className="text-xs font-medium text-neutral-600">جزئیات فنی</span>
                                            <button
                                                onClick={copy}
                                                className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-neutral-100"
                                                title="کپی جزئیات"
                                            >
                                                <Copy className="h-3.5 w-3.5" />
                                                کپی
                                            </button>
                                        </div>
                                        <pre className="max-h-72 overflow-auto p-4 text-xs leading-6 text-neutral-800">
                                            {errorDetails}
                                        </pre>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative overflow-hidden rounded-b-2xl">
                            <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />
                        </div>
                    </div>

                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="pointer-events-none"
                    >
                        <motion.div
                            className="absolute left-8 top-8 h-3 w-3 rounded-full bg-orange-500/70 shadow"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="absolute bottom-10 right-10 h-2 w-2 rounded-full bg-orange-400/70 shadow"
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </motion.section>
            </main>
        </div>
    )
}
