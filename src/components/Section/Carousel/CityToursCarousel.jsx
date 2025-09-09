'use client';

import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Citytours } from '@/components/data/City/CityTours';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import useFadeInUp from '@/components/hooks/Fade/useFadeInUp';
import { motion } from 'framer-motion';

const CityToursCarousel = () => {
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 2,
            spacing: 6,
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: {
                    perView: 3,
                    spacing: 6,
                },
            },
            '(min-width: 768px)': {
                slides: {
                    perView: 4,
                    spacing: 6,
                },
            },
            '(min-width: 1024px)': {
                slides: {
                    perView: 6,
                    spacing: 6,
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
        <div className="w-full  py-6  relative">
            <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-6">
                    <motion.div {...containerAnim} className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="md:text-3xl text-2xl text-black font-bold">
                                <span className='animate-gradient-text'>شهر های مناسب </span>سفر
                            </h1>

                        </div>
                        <p className="text-gray-800 text-base md:text-lg mt-2">
                            در این قسمت اقامتگاه های زیبا را ببینید
                        </p>
                    </motion.div>

                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => instanceRef.current?.next()}
                            className="p-2 sm:p-3 md:p-4 cursor-pointer bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => instanceRef.current?.prev()}
                            className="p-2 sm:p-3 md:p-4 cursor-pointer bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div ref={sliderRef} className="keen-slider">
                        {Citytours.map((city) => (
                            <div
                                key={city.id}
                                className="keen-slider__slide px-1"
                            >
                                <div className="relative h-32 md:h-38 lg:h-42 rounded-lg overflow-hidden group ">
                                    <img
                                        src={city.image}
                                        alt={city.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300"></div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

                                    <div className="absolute bottom-2 right-2">
                                        <h3 className="text-white font-semibold text-sm md:text-base drop-shadow-lg">
                                            {city.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex md:hidden absolute inset-0 items-center justify-between px-2">
                        <button
                            onClick={() => instanceRef.current?.next()}
                            className="w-7 h-7 bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow flex items-center justify-center"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => instanceRef.current?.prev()}
                            className="w-7 h-7 bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow flex items-center justify-center"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CityToursCarousel;
