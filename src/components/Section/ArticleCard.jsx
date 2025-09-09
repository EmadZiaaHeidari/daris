'use client'
import { useState, useEffect } from 'react';
import { AImage } from '../data/ArticleImage/ArticleImage';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight, Star, Smartphone } from "lucide-react";
import { FaAirbnb } from "react-icons/fa";
import Link from 'next/link';
import useFadeInUp from '../hooks/Fade/useFadeInUp';
import { motion } from 'framer-motion';
const ArticleCart = () => {
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 2, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3, spacing: 20 },
            },
        },
        slides: { perView: 1, spacing: 20 },
        slideChanged(s) {
            console.log(s.track.details.rel);
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            slider.current?.next()
        }, 3000);

        return () => clearInterval(interval);
    }, [slider]);

        const containerAnim = useFadeInUp({
          y: 80,
          amount: 0.2,
          rootMargin: "0px 0px -10% 0px",
          delay: 0,
          duration: 0.6,
          respectReducedMotion: false,
        });

    return (
        <div className="bg-orange-600 h-[460px] md:mt-[6rem] mt-[9rem] py-8 relative">
            <div className="relative max-w-screen-xl mx-auto px-4 transform translate-y-[-50%]">
                <div className="flex justify-between items-center mb-6">
                    <motion.div {...containerAnim} className='flex flex-col'>
                        <h1 className="text-black text-2xl lg:text-3xl font-bold">همه ی <span className='animate-gradient-text'>مقالات</span> اینجا هستند</h1>
                        <p className='text-gray-700 text-base md:text-lg mt-2'>خواندن اخبار و مقاله ی داریس در اینجا !</p>
                    </motion.div>
                    <div className="gap-2 hidden md:flex">
                        <button
                            onClick={() => {
                                slider.current?.prev();
                            }}
                            className="p-2 sm:p-3 md:p-4 cursor-pointer bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow"
                            aria-label="قبلی"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </button>
                        <button
                            onClick={() => {
                                slider.current?.next();
                            }}
                            className="p-2 sm:p-3 md:p-4 cursor-pointer bg-white/90 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow"
                            aria-label="بعدی"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div ref={sliderRef} className="keen-slider">
                        {AImage.map((article) => (
                            <div key={article.id} className="keen-slider__slide flex gap-3">
                                <div className="bg-white rounded-lg shadow-lg p-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className='flex items-center w-full'>
                                            <img
                                                src='/assets/img/section/testimonal-person-1.png'
                                                alt='daris'
                                                className="w-12 h-12 object-cover rounded-full"
                                            />
                                            <div className="flex mr-2 items-center space-x-3">
                                                <p className="my-1 text-gray-600 text-sm">Daris@</p>
                                                <div className="border-l-2 border-gray-300 h-6"></div>
                                                <p className="my-1 text-gray-600 text-sm">{article.Date}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-72 object-cover rounded-lg"
                                    />

                                    <div className="mt-4">
                                        <h2 className="text-md font-semibold text-gray-900">{article.title}</h2>
                                        <Link href={`/travelbenefits/${article.id}`}>
                                            <button className="mt-4 cursor-pointer text-white bg-orange-600 p-3 rounded-lg text-sm">
                                                ادامه مطلب
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="md:hidden absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2 pointer-events-none">
                        <button
                            onClick={() => {
                                slider.current?.prev();
                            }}
                            className="bg-white/90 text-gray-600 rounded-full p-2 hover:bg-orange-600 hover:text-white transition shadow-lg pointer-events-auto z-10"
                            aria-label="قبلی"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => {
                                slider.current?.next();
                            }}
                            className="bg-white/90 text-gray-600 rounded-full p-2 hover:bg-orange-600 hover:text-white transition shadow-lg pointer-events-auto z-10"
                            aria-label="بعدی"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex md:justify-between justify-center items-center  gap-5 mx-5 md:mt-16 mt-8 flex-col md:flex-row">

                    <div className="flex items-center mb-4 sm:mb-0 justify-center">
                        <Star className="w-10 h-10 mb-2" />
                        <div className="flex flex-col mr-2">
                            <p className="text-2xl font-semibold">رتبه یک سفر</p>
                            <p className="text-base">معتبرترین عرضه‌کننده محصولات گردشگری</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 sm:mb-0 justify-center">
                        <FaAirbnb className="w-10 h-10 mb-2" />
                        <div className="flex flex-col mr-2">
                            <p className="text-2xl font-semibold">همسفر هر سفر</p>
                            <p className="text-base">ارائه خدمات سفر (پرواز، قطار، اتوبوس، هتل )</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 sm:mb-0 justify-center">
                        <Smartphone className="w-10 h-10 mb-2" />
                        <div className="flex flex-col mr-2">
                            <p className="text-2xl font-semibold">همسفر همه لحظات سفر</p>
                            <p className="text-base">پشتیبانی ساعته در تمامی مراحل سفر</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ArticleCart;