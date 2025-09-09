'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { tours } from '@/components/data/tours/Tours';
import Image from 'next/image';
import Link from 'next/link';

const ItemsPerPage = 6;

export default function PaginatedCarousel({ title, subtitle }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (tours && Array.isArray(tours)) {
      setTotalPages(Math.ceil(tours.length / ItemsPerPage));
    }
  }, []);

  const startIndex = (currentPage - 1) * ItemsPerPage;
  const visibleData = tours ? tours.slice(startIndex, startIndex + ItemsPerPage) : [];

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const getPageWindow = (current, total) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set();
    pages.add(1);
    pages.add(total);
    pages.add(current);
    if (current - 1 > 1) pages.add(current - 1);
    if (current + 1 < total) pages.add(current + 1);
    return Array.from(pages).sort((a, b) => a - b);
  };
  
  const withEllipses = (arr) => {
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push('…');
    }
    return out;
  };

  return (
    <div className="container mt-16 mb-8 w-full" dir="rtl">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <motion.h1
              className="text-2xl md:text-3xl text-black font-bold"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                className="text-base md:text-lg text-gray-800 mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleData.map((tour) => (
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
                    <div className="relative h-[270px] w-full overflow-hidden rounded-xl">
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
                        {tour.Date}
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

<div className="mt-6" dir="ltr">
  <div className="flex justify-start items-center gap-2">
    {currentPage > 1 && (
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="h-10 px-4 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:shadow-sm transition flex items-center gap-2"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm">Prev</span>
      </button>
    )}
    <div className="flex items-center gap-1">
      {withEllipses(getPageWindow(currentPage, totalPages)).map((p, idx) =>
        p === '…' ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400 select-none">…</span>
        ) : (
          <button
            key={`p-${p}`}
            onClick={() => handlePageChange(p)}
            aria-current={currentPage === p ? 'page' : undefined}
            className={`h-10 min-w-10 px-3 rounded-full border transition text-sm
              ${currentPage === p
                ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600'}`}
          >
            {p}
          </button>
        )
      )}
    </div>

    {currentPage < totalPages && (
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="h-10 px-4 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:shadow-sm transition flex items-center gap-2"
        aria-label="Next page"
      >
        <span className="text-sm">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    )}
  </div>
</div>

      </div>
    </div>
  );
}
