"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { tours } from "../data/tours/Tours";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
import useFadeInUp from "../hooks/Fade/useFadeInUp";

const TourCarousel = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 481px) and (max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(min-width: 1025px)": {
        slides: {
          perView: 4,
          spacing: 15,
        },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const containerAnim = useFadeInUp({
    y: 80,
    amount: 0.2,
    rootMargin: "0px 0px -10% 0px",
    delay: 0,
    duration: 0.6,
    respectReducedMotion: false,
  });

  return (
    <div className="w-full mt-16 relative">
      <motion.div {...containerAnim} className="mb-14 text-center">
        <h1 className="text-2xl md:text-4xl text-black font-bold">
          <span className="animate-gradient-text">هوشمندانه</span> سفر کن
        </h1>
        <p className="text-gray-800 text-base md:text-lg mt-2">اینجا انتخاب و سفرهای محبوبت رو پیدا کن</p>
      </motion.div>

      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute z-10 left-4 top-[60%] -translate-y-1/2 bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow p-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute z-10 right-4 top-[60%] -translate-y-1/2 bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow p-2"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div ref={sliderRef} className="keen-slider">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="keen-slider__slide overflow-hidden rounded-2xl relative"
          >
            <div className="relative w-full h-52 rounded-xl overflow-hidden">
              <Image
                src={`/${tour.image}`}
                alt={tour.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{tour.description}</span>
              </div>
            </div>

            <div className="p-3 text-right">
              <p className="text-sm text-gray-500">{tour.Date}</p>
              <h3 className="text-md font-semibold text-black mt-1">{tour.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCarousel;
