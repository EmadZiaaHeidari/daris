"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/img/about/gallery/gallery-1.png",
  "/assets/img/about/gallery/gallery-2.png",
  "/assets/img/about/gallery/gallery-3.png",
  "/assets/img/about/gallery/gallery-4.png",
  "/assets/img/about/gallery/gallery-5.png",
];

function GalleryImage() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const hoverTimer = useRef(null);
  const touchStartX = useRef(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => goToNext(), 3000);
    return () => clearInterval(id);
  }, [isPaused, goToNext]);

  const pause = () => setIsPaused(true);
  const resume = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setIsPaused(false), 200);
  };

  const onTouchStart = (e) => {
    pause();
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) {
      if (dx > 0) goToPrevious();
      else goToNext();
    }
    resume();
  };

  const goToSlide = (index) => setCurrentIndex(index);

  const getVisibleImages = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + images.length) % images.length;
      visible.push({ src: images[index], index, position: i });
    }
    return visible;
  };

  const getStyleByPosition = (position) => {
    const abs = Math.abs(position);
    const scale = position === 0 ? 1 : abs === 1 ? 0.8 : 0.65;
    const opacity = position === 0 ? 1 : abs === 1 ? 0.85 : 0.55;
    const zIndex = position === 0 ? 50 : abs === 1 ? 40 : 30;
    const translateX = position * 50; 
    const rotateY = position === 0 ? 0 : position < 0 ? -30 * abs : 30 * abs;
    const translateZ = position === 0 ? 80 : 0;
    return { scale, opacity, zIndex, translateX, rotateY, translateZ };
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">گالری تصاویر ما</h2>
        <div className="w-24 h-[3px] bg-orange-500 mx-auto rounded-full" />
      </div>

      <div
        className="relative max-w-6xl mx-auto px-4 select-none overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-[360px] md:h-[420px] lg:h-[500px]" style={{ perspective: 1200 }}>
          <div className="flex items-center justify-center h-full relative">
            <AnimatePresence initial={false}>
              {getVisibleImages().map(({ src, index, position }) => {
                const { scale, opacity, zIndex, translateX, rotateY, translateZ } = getStyleByPosition(position);
                return (
                  <motion.div
                    key={`${index}-${position}`}
                    className="absolute cursor-pointer will-change-transform [transform-style:preserve-3d]"
                    style={{ zIndex }}
                    initial={{ opacity: 0, transform: "translate3d(0,0,0) rotateY(0deg) scale(0.9)" }}
                    animate={{
                      opacity,
                      transform: `translate3d(${translateX}%,0,${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.7 }}
                    onClick={() => position !== 0 && goToSlide(index)}
                  >
                    <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white">
                      <img
                        src={src}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/600x600/111827/ffffff?text=Image+${index + 1}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 md:p-3 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 md:p-3 transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-8 bg-orange-500" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryImage;