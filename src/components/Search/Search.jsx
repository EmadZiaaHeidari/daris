'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search as SearchIcon, MapPin, X, ArrowDownAZ, ArrowUpAZ, CalendarClock, Sparkles, Filter, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours } from '../data/tours/Tours';

export default function SearchPage() {
    const sp = useSearchParams?.() || { get: () => '' };
    const initialQ = sp.get('q') ?? '';
    const initialSort = sp.get('sort') ?? 'newest';

    const [q, setQ] = useState(initialQ);
    const [sort, setSort] = useState(initialSort);
    const [hoveredId, setHoveredId] = useState(null);
    const [focused, setFocused] = useState(false);
    const [recent, setRecent] = useState([]);

    const inputRef = useRef(null);

    const normalizeFa = (s = '') =>
        s.toString().trim().replace(/\s+/g, ' ').replace(/ي/g, 'ی').replace(/ك/g, 'ک').toLowerCase();

    const monthIdx = {
        فروردین: 1,
        اردیبهشت: 2,
        خرداد: 3,
        تیر: 4,
        مرداد: 5,
        شهریور: 6,
        مهر: 7,
        آبان: 8,
        آذر: 9,
        دی: 10,
        بهمن: 11,
        اسفند: 12,
    };

    const parseJalali = (dateStr = '') => {
        const s = normalizeFa(dateStr);
        const parts = s.split(' ').filter(Boolean);
        const y = parseInt(parts[0]?.replace(/[^\d]/g, ''), 10) || 0;
        const m = monthIdx[parts[1]] ?? 0;
        return y * 100 + m;
    };

    useEffect(() => setQ(initialQ), [initialQ]);
    useEffect(() => setSort(initialSort), [initialSort]);

    useEffect(() => {
        try {
            const r = JSON.parse(localStorage.getItem('recent-searches') || '[]');
            if (Array.isArray(r)) setRecent(r.slice(0, 8));
        } catch { }
    }, []);

    const saveRecent = useCallback((term) => {
        const t = (term || '').trim();
        if (!t) return;
        try {
            const r = JSON.parse(localStorage.getItem('recent-searches') || '[]');
            const next = [t, ...r.filter((x) => x !== t)].slice(0, 8);
            localStorage.setItem('recent-searches', JSON.stringify(next));
            setRecent(next);
        } catch { }
    }, []);

    useEffect(() => {
        const onSlash = (e) => {
            if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                if (inputRef.current) inputRef.current.focus();
            }
        };
        window.addEventListener('keydown', onSlash);
        return () => window.removeEventListener('keydown', onSlash);
    }, []);

    const results = useMemo(() => {
        const nq = normalizeFa(q);
        const filtered = nq
            ? tours.filter((it) => {
                const hay = `${normalizeFa(it.title)} ${normalizeFa(it.description)} ${normalizeFa(it.Date)}`;
                return hay.includes(nq);
            })
            : [];

        const sorted = [...filtered].sort((a, b) => {
            if (sort === 'az' || sort === 'za') {
                const cmp = normalizeFa(a.title).localeCompare(normalizeFa(b.title), 'fa');
                return sort === 'az' ? cmp : -cmp;
            }
            const da = parseJalali(a.Date);
            const db = parseJalali(b.Date);
            return sort === 'newest' ? db - da : da - db;
        });

        return sorted;
    }, [q, sort]);

    const onSubmit = (e) => {
        if (e) e.preventDefault();
        const url = `/search?q=${encodeURIComponent(q)}&sort=${sort}`;
        window.history.replaceState(null, '', url);
        saveRecent(q);
        if (inputRef.current) inputRef.current.blur();
    };

    const clearQuery = () => {
        setQ('');
        const url = `/search?sort=${sort}`;
        window.history.replaceState(null, '', url);
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <div className="container min-h-screen border-t-4 border-orange-600 bg-gradient-to-b from-orange-50 via-white to-white selection:bg-orange-200/70 selection:text-black" dir="rtl">
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_20%,transparent_70%)]">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[90rem] rounded-full bg-gradient-to-r from-orange-200 via-amber-100 to-rose-100 blur-3xl opacity-70" />
                </div>
                <div className="max-w-6xl mx-auto px-3 pt-10 pb-6">
                    <div className="mb-4 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span>برای فوکوس سریع کلید / را بزنید</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                   bg-orange-100 text-orange-800 border border-orange-300">
                            <span className="font-medium">تعداد نتایج:</span>
                            <span className="font-bold">{results.length}</span>
                        </span>
                    </div>
                    <form onSubmit={onSubmit} className="relative">
                        <div
                            className={[
                                'group flex items-center gap-2 rounded-2xl border backdrop-blur-xl transition-all shadow-sm',
                                focused ? 'border-orange-400/70 shadow-orange-100/80' : 'border-gray-200/80',
                                'bg-white/70 hover:bg-white/80',
                                'px-3 sm:px-4 py-2 sm:py-3',
                            ].join(' ')}
                        >
                            <button type="submit" aria-label="جستجو" className="shrink-0 rounded-xl p-2 hover:bg-orange-50 transition">
                                <SearchIcon className="w-5 h-5 text-orange-600" />
                            </button>
                            <input
                                ref={inputRef}
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder="جستجو تور، شهر، ماه…"
                                className="flex-1 bg-transparent text-black outline-none placeholder:text-gray-400 text-[15px] sm:text-base"
                                aria-label="عبارت جستجو"
                            />
                            <div className="flex items-center gap-2">
                                {!!q && (
                                    <button
                                        type="button"
                                        onClick={clearQuery}
                                        className="hidden sm:inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
                                    >
                                        <X className="w-4 h-4" /> پاک‌سازی
                                    </button>
                                )}
                                <SortSegmented value={sort} onChange={setSort} />
                            </div>
                        </div>
                    </form>
                    <AnimatePresence initial={false}>
                        {!q && recent.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="mt-3 flex flex-wrap items-center gap-2"
                            >
                                {recent.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setQ(item);
                                            setTimeout(() => onSubmit(), 0);
                                        }}
                                        className="px-3 py-1.5 rounded-full border text-gray-700 bg-white hover:bg-orange-50 hover:border-orange-300 transition text-sm"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="mt-3 text-sm text-gray-600">
                        {q?.trim()
                            ? results.length
                                ? (
                                    <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-900 px-3 py-1 rounded-full">
                                        <Filter className="w-4 h-4" />
                                        {results.length} نتیجه برای «{q}»
                                    </span>
                                )
                                : 'نتیجه‌ای یافت نشد'
                            : 'عبارتی را برای جستجو وارد کنید'}
                    </div>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-3 pb-12">
                {q?.trim() && results.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {results.map((tour) => (
                            <Link key={tour.id} href={`/tours/${tour.id}`} className="block group">
                                <div className="relative rounded-2xl overflow-hidden">
                                    <motion.div
                                        onMouseEnter={() => setHoveredId(tour.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className="relative bg-white border border-gray-200 p-2 overflow-hidden shadow-sm rounded-2xl"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                                    >
                                        {hoveredId === tour.id && (
                                            <div
                                                className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(/${String(tour.image).replace(/^\/?/, '')})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    filter: 'brightness(0.7) blur(1.5px)',
                                                    opacity: 1,
                                                    transition: 'opacity 0.4s ease-in-out',
                                                }}
                                                aria-hidden="true"
                                            />
                                        )}
                                        <div className="relative z-10">
                                            <div className="relative h-[260px] w-full overflow-hidden rounded-xl">
                                                {hoveredId !== tour.id && (
                                                    <Image
                                                        src={`/${String(tour.image).replace(/^\/?/, '')}`}
                                                        alt={tour.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover rounded-[inherit] transition-all duration-700 group-hover:scale-[1.03]"
                                                    />
                                                )}
                                                <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="truncate max-w-[12rem]">{tour.description}</span>
                                                </div>
                                            </div>
                                            <div className="p-4 text-right">
                                                <p className={`flex items-center gap-1 text-sm ${hoveredId === tour.id ? 'text-gray-200' : 'text-gray-500'}`}>
                                                    <CalendarClock className="w-4 h-4" /> {tour.Date}
                                                </p>
                                                <h3 className={`mt-1 text-[18px] leading-snug font-semibold ${hoveredId === tour.id ? 'text-white' : 'text-gray-900'}`}>
                                                    {tour.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {q?.trim() && results.length === 0 && (
                    <EmptyState onReset={() => { setQ(''); window.history.replaceState(null, '', '/search'); }} />
                )}
            </main>
            <BottomBar q={q} setQ={setQ} sort={sort} setSort={setSort} onSubmit={onSubmit} />
        </div>
    );
}

function SortSegmented({ value, onChange }) {
    const options = [
        { value: 'newest', label: 'جدیدترین', icon: <ArrowLeftRight className="w-4 h-4" /> },
        { value: 'oldest', label: 'قدیمی‌ترین', icon: <ArrowLeftRight className="w-4 h-4 rotate-180" /> },
        { value: 'az', label: 'الف ← ی', icon: <ArrowDownAZ className="w-4 h-4" /> },
        { value: 'za', label: 'ی ← الف', icon: <ArrowUpAZ className="w-4 h-4" /> },
    ];

    return (
        <div className="hidden md:flex items-center rounded-xl border bg-white/80">
            {options.map((opt, i) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(opt.value)}
                    className={[
                        'flex items-center gap-1.5 px-3 py-2 text-sm transition',
                        i !== 0 ? 'border-r' : '',
                        value === opt.value
                            ? 'bg-orange-600 text-white hover:bg-orange-700'
                            : 'text-gray-700 hover:bg-orange-50',
                    ].join(' ')}
                    aria-pressed={value === opt.value}
                >
                    {opt.icon}
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

function EmptyState({ onReset }) {
    return (
        <div className="mt-10 mx-auto max-w-xl text-center bg-white/70 backdrop-blur rounded-2xl border p-8">
            <div className="mx-auto w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <SearchIcon className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">چیزی پیدا نشد</h2>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                عبارت دیگری را امتحان کنید، از کلیدواژه‌های کوتاه استفاده کنید، یا مرتب‌سازی را تغییر دهید.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
                <button
                    onClick={onReset}
                    className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-orange-50"
                >
                    شروع دوباره
                </button>
                <a
                    href="/alltours"
                    className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                    مشاهده همه تورها
                </a>
            </div>
        </div>
    );
}

function BottomBar({ q, setQ, sort, setSort, onSubmit }) {
    return (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t bg-white/95 backdrop-blور">
            <div className="max-w-6xl mx-auto px-3 py-2 flex items-center gap-2">
                <form
                    onSubmit={(e) => onSubmit(e)}
                    className="flex-1 flex items-center gap-2 bg-gray-50 border rounded-xl px-2 py-1"
                >
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="جستجو…"
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                    <button type="submit" className="rounded-lg p-2 bg-orange-600 text-white">
                        <SearchIcon className="w-4 h-4" />
                    </button>
                </form>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-10 px-2 border bg-white rounded-lg text-[13px]"
                >
                    <option value="newest">جدیدترین</option>
                    <option value="oldest">قدیمی‌ترین</option>
                    <option value="az">الف ← ی</option>
                    <option value="za">ی ← الف</option>
                </select>
            </div>
        </div>
    );
}
