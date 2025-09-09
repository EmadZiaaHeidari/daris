'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useFadeInUp from '@/components/hooks/Fade/useFadeInUp';
const AUTO_INTERVAL_MS = 3000;

const GenericCarousel = ({ title, subtitle, data }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredTour, setHoveredTour] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isClient, setIsClient] = useState(false);
  const timeoutRef = useRef(null);

  const resetInterval = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => advance(1), AUTO_INTERVAL_MS);
  };

  useEffect(() => {
    setIsClient(true);
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    resetInterval();
    return () => {
      window.removeEventListener('resize', updateVisibleCount);
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  const advance = (delta) => {
    setStartIndex((prev) => (prev + delta + data.length) % data.length);
  };

  const getVisible = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(data[(startIndex + i) % data.length]);
    }
    return result;
  };
  
  const containerAnim = useFadeInUp({
    y: 80,
    amount: 0.2,
    rootMargin: "0px 0px -10% 0px",
    delay: 0,
    duration: 0.6,
    respectReducedMotion: false,
  });

  if (!isClient) {
    return (
      <div className="mt-10 w-full">
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl text-black font-bold">{title}</h1>
              <p className="text-gray-800 mt-2">{subtitle}</p>
            </div>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative bg-white border rounded-xl p-3 overflow-hidden shadow-sm">
                  <div className="h-[270px] bg-gray-200 animate-pulse rounded-t-xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 w-full">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <motion.div {...containerAnim}>
            <h1 className="text-2xl md:text-3xl text-black font-bold">
              {title}
            </h1>
            <p className="text-base md:text-lg text-gray-800 mt-2">
              {subtitle}
            </p>
          </motion.div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => { advance(-1); resetInterval(); }} className="p-2 sm:p-3 md:p-4 cursor-pointer bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow" aria-label="قبلی">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button onClick={() => { advance(1); resetInterval(); }} className="p-2 sm:p-3 md:p-4 cursor-pointer bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow" aria-label="بعدی">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="md:hidden">
            <button onClick={() => { advance(-1); resetInterval(); }} className="absolute top-1/2 cursor-pointer -translate-y-1/2 right-2 bg-white/90 text-gray-600 rounded-full p-2 sm:p-3 md:p-4 hover:bg-orange-600 hover:text-white transition z-10" aria-label="قبلی">
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button onClick={() => { advance(1); resetInterval(); }} className="absolute top-1/2 cursor-pointer -translate-y-1/2 left-2 bg-white/90 text-gray-600 rounded-full p-2 sm:p-3 md:p-4 hover:bg-orange-600 hover:text-white transition z-10" aria-label="بعدی">
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            key={startIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {getVisible().map((tour) => (
              <Link key={tour.id} href={`/tours/${tour.id}`} className="block">
                <div className="relative rounded-xl overflow-hidden">
                  <motion.div
                    onMouseEnter={() => {
                      setHoveredTour(tour.id);
                      if (timeoutRef.current) clearInterval(timeoutRef.current);
                    }}
                    onMouseLeave={() => {
                      setHoveredTour(null);
                      resetInterval();
                    }}
                    className="relative bg-white border p-3 overflow-hidden shadow-sm rounded-none"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  >
                    {hoveredTour === tour.id && (
                      <div
                        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
                        style={{
                          backgroundImage: `url(/${tour.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'brightness(0.7)',
                          opacity: 1,
                          transition: 'opacity 0.4s ease-in-out'
                        }}
                        aria-hidden="true"
                      />
                    )}

                    <div className="relative z-10">
                      <div className="relative h-[270px] cursor-pointer w-full overflow-hidden rounded-xl">
                        {hoveredTour !== tour.id && (
                          <Image
                            src={`/${tour.image}`}
                            alt={tour.title}
                            fill
                            className="object-cover rounded-[inherit] transition-all duration-700"
                          />
                        )}
                        <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {tour.description}
                        </div>
                      </div>

                      <div className="p-4 text-right">
                        <p className={`text-md ${hoveredTour === tour.id ? 'text-gray-200' : 'text-gray-500'}`}>
                          {tour.Date}
                        </p>
                        <h3 className={`text-xl font-semibold ${hoveredTour === tour.id ? 'text-white' : 'text-black'}`}>
                          {tour.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GenericCarousel;
