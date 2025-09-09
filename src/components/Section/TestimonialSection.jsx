'use client'
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion";
import useFadeInUp from "../hooks/Fade/useFadeInUp";

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "مهران جعفرنژاد",
      title: "مدیر محصول شرکت فناوری نور",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
      image: "/assets/img/section/testimonal-person-1.png"
    },
    {
      id: 2,
      name: "محمد احمدی",
      title: "مدیر بازاریابی شرکت دیجیتال",
      text: "نمونه‌ای از نوشته آزمایشی برای استفاده در طراحی صفحه و ایجاد هماهنگی بین بخش‌های مختلف طرح است. استفاده از این نوع نوشته به طراحان کمک می‌کند تا پیش از وارد کردن متن اصلی، شکل و ظاهر نهایی کار را مشاهده و بررسی نمایند و ساختار کلی آن را اصلاح کنند.",
      image: "/assets/img/section/3143c2d9-dbd5-4d53-a40c-27f866d58cef.png"
    },
    {
      id: 3,
      name: "نازی اسدی",
      title: "بنیانگذار استارتاپ تک‌نو",
      text: "این پاراگراف ساختگی تنها برای پر کردن فضای خالی صفحات مورد استفاده قرار می‌گیرد تا بتوان شکل کلی و ترکیب اجزای گرافیکی را بهتر سنجید. استفاده از این متن در مراحل اولیه طراحی باعث می‌شود توجه طراح به جای محتوای واقعی، بر چیدمان و قالب‌بندی متمرکز بماند.",
      image: "/assets/img/section/82f014c0-87dc-47ed-863c-8592e3162298.png"
    }
  ];


  const changeTestimonial = (newIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial(newIndex);
      setIsAnimating(false);
    }, 150);
  };

  const nextTestimonial = () => {
    const newIndex = (currentTestimonial + 1) % testimonials.length;
    changeTestimonial(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    changeTestimonial(newIndex);
  };

    const containerAnim = useFadeInUp({
      y: 80,
      amount: 0.2,
      rootMargin: "0px 0px -10% 0px",
      delay: 0,
      duration: 0.6,
      respectReducedMotion: false,
    });

  return (
    <div className="h-[800px] py-8">
      <div className="w-full mx-auto">
        <motion.div {...containerAnim} className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className='animate-gradient-text ml-1'>مشتریان </span> چه می گویند ؟
          </h2>
          <p className="text-gray-600 text-xl">مشتریان ما درباره تجربه با ما چه می‌گویند؟</p>
        </motion.div>
        
        <div className="grid mt-5 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-6 left-6 text-red-500 text-6xl opacity-80">
                "
              </div>
               <div className={`space-y-6 relative z-10 transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover transition-all duration-300"
                    />
                  </div>
                  <div className='mr-3'>
                    <h3 className="font-bold text-gray-900 text-lg transition-all duration-300">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-gray-600 transition-all duration-300">
                      {testimonials[currentTestimonial].title}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg transition-all duration-300">
                  {testimonials[currentTestimonial].text}
                </p>

                {/* Navigation buttons below text */}
                <div className="flex justify-start gap-2">
                  <button
                    onClick={prevTestimonial}
                    disabled={isAnimating}
                    className="bg-white/90 text-gray-600 rounded-full p-3 hover:bg-orange-600 hover:text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    disabled={isAnimating}
                    className="bg-white/90 text-gray-600 rounded-full p-3 hover:bg-orange-600 hover:text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Slide indicator dots */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeTestimonial(index)}
                    disabled={isAnimating}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-orange-600 w-6' : 'bg-gray-300 hover:bg-orange-400'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative md:block hidden h-[340px]">
              <Image
                src='/assets/img/section/map.png'
                fill
                alt='map'
                className='w-full h-full rounded-2xl'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
