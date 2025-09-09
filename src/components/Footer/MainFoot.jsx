'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Send, Loader2, Twitter, Instagram, Facebook, Phone } from 'lucide-react';
import ScrollToTop from "../scroll/ScrollToTop";

export default function MainFoot() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (!email.trim()) {
            setMessage('لطفاً ایمیل خود را وارد کنید');
            return;
        }

        if (!validateEmail(email)) {
            setMessage('فرمت ایمیل صحیح نیست');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setMessage('ایمیل شما با موفقیت ارسال شد');
            setEmail('');
        } catch (error) {
            setMessage('خطا در ارسال ایمیل');
        } finally {
            setIsLoading(false);
        }
    };

    const handleIconClick = () => {
        handleSubmit();
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="max-w-5xl xl:max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0 text-center lg:text-right">

                    <div className="flex flex-col sm:flex-row items-center justify-center text-gray-800 gap-3">
                        <h3 className="text-lg md:text-xl font-semibold">شبکه های اجتماعی ما :</h3>
                        <div className="flex gap-3 sm:ml-3">
                            <a href="#" className="text-gray-500 bg-white p-3 rounded-full hover:text-orange-600 transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 bg-white p-3 rounded-full hover:text-orange-600 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 bg-white p-3 rounded-full hover:text-orange-600 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <h3 className="text-lg md:text-xl text-black font-semibold whitespace-nowrap">
                            از جدیدترین اخبار ما :
                        </h3>
                        {message && (
                            <p className={`text-sm ${message.includes('موفقیت') ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}

                        <div className="flex items-stretch">
                            <div className="relative">
                                <input
                                    type="email"
                                    className="bg-white p-3 text-black px-10 rounded-r-md w-64 sm:w-72 focus:outline-none h-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ایمیل خود را وارد کنید"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                    disabled={isLoading}
                                />
                                <div
                                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                    onClick={handleIconClick}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 text-orange-600 animate-spin" />
                                    ) : (
                                        <Mail className="w-4 h-4 text-gray-500 hover:text-orange-600 transition-colors" />
                                    )}
                                </div>
                            </div>

                            <motion.button
                                className="bg-orange-600 text-white px-4 py-2 rounded-l-md flex items-center hover:bg-orange-700 transition-colors disabled:opacity-50"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>



                <div className="mt-12  border-b border-gray-500 pb-8">

                    <div className="text-gray-800 text-center md:text-right max-w-4xl mx-auto md:mx-0">
                        <h4 className="text-3xl md:text-4xl font-bold">داریس</h4>
                        <p className="mt-4  text-gray-600">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 text-center md:text-right">

                        <div className="text-gray-800">
                            <h4 className="text-lg md:text-xl font-bold">با وبسایت من</h4>
                            <ul className="mt-4 text-sm md:text-base font-semibold space-y-3 text-neutral-500">
                                <li><a href="#" className="hover:text-orange-600">نحوه ثبت سفارش</a></li>
                                <li><a href="#" className="hover:text-orange-600">رویه های ارسال فروش</a></li>
                                <li><a href="#" className="hover:text-orange-600">شرایط استفاده</a></li>
                                <li><a href="#" className="hover:text-orange-600">شیوه ی پرداخت</a></li>
                                <li><a href="#" className="hover:text-orange-600">حریم خصوصی</a></li>
                            </ul>
                        </div>

                        <div className="text-gray-800">
                            <h4 className="text-lg md:text-xl font-bold">خدمات مشتریان</h4>
                            <ul className="mt-4 text-sm md:text-base font-semibold space-y-3 text-neutral-500">
                                <li><a href="#" className="hover:text-orange-600">پاسخ به پرسش های متداول</a></li>
                                <li><a href="#" className="hover:text-orange-600">رویه های بازگرداندن کالا</a></li>
                                <li><a href="#" className="hover:text-orange-600">شرایط استفاده</a></li>
                                <li><a href="#" className="hover:text-orange-600">گزارش پاک</a></li>
                                <li><a href="#" className="hover:text-orange-600">حریم خصوصی</a></li>
                            </ul>
                        </div>

                        <div className="text-gray-800 col-span-2 md:col-span-1">
                            <h4 className="text-lg md:text-xl font-bold">تماس با فروشگاه</h4>
                            <ul className="mt-4 text-sm md:text-base font-semibold space-y-3 text-neutral-500">
                                <li><a href="#" className="hover:text-orange-600">درباره فروشگاه</a></li>
                                <li><a href="#" className="hover:text-orange-600">تماس با فروشگاه</a></li>
                                <li><a href="#" className="hover:text-orange-600">ساعات کاری</a></li>
                                <li><a href="#" className="hover:text-orange-600">آدرس فروشگاه</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="mt-12 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 text-center lg:text-right">

                    <div className="flex flex-wrap justify-center lg:justify-start lg:gap-x-8 gap-x-8 sm:gap-x-24 gap-y-2 lg:text-sm font-semibold text-neutral-500">
                        <p><a href="#" className="hover:text-orange-600">درباره ما</a></p>
                        <p><a href="#" className="hover:text-orange-600">فروشنده شو</a></p>
                        <p><a href="#" className="hover:text-orange-600">سوالی دارید</a></p>
                        <p><a href="#" className="hover:text-orange-600">ارسال کمپرس مرسوله</a></p>
                    </div>

                    <div className="flex flex-col lg:mt-0 mt-4 lg:flex-row items-center justify-center lg:justify-end gap-10">
                        <p className="text-neutral-500 font-semibold text-md">دانلود اپلیکیشن</p>
                        <div className="flex items-center gap-10">
                            <Image src="/assets/img/myket.png" alt="myket Image" width={90} height={90} className="h-7 w-auto" />
                            <Image src="/assets/img/googleplay.png" alt="googleplay Image" width={90} height={90} className="h-7 w-auto" />
                            <Image src="/assets/img/bazar.png" alt="bazar Image" width={90} height={90} className="h-7 w-auto" />
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="ml-0 sm:ml-2">
                                    <ScrollToTop />
                                </div>

                                <div className="flex items-center">
                                    <div className="p-3 bg-white rounded-full">
                                        <Mail className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div className="flex flex-col mr-4 text-center sm:text-right">
                                        <p className="text-black text-sm font-semibold">پست الکترونیکی :</p>
                                        <p className="text-black text-sm font-semibold mt-1">daris@test.com</p>
                                    </div>
                                </div>

                                <div className="flex lg:gap-0 items-center">
                                    <div className="p-3 bg-white rounded-full">
                                        <Phone className="w-6 h-6 -rotate-90 text-gray-600" />
                                    </div>
                                    <div className="flex flex-col mr-4 text-center sm:text-right">
                                        <p className="text-black text-sm font-semibold">تلفن پشتیبانی کالا :</p>
                                        <p className="text-black text-sm font-semibold mt-1">021-0000000</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex lg:mx-0 sm:mx-6 mx-4 justify-between  lg:justify-end gap-4">
                            <div className="py-1 px-8 rounded-md bg-white">
                                <Image src="/assets/img/foooticon3.png" alt="Certification" width={100} height={70} />
                            </div>
                            <div className="py-3 px-8 rounded-md bg-white">
                                <Image src="/assets/img/foooticon2.png" alt="Certification" width={100} height={70} />
                            </div>
                            <div className="py-3 px-8 rounded-md bg-white">
                                <Image src="/assets/img/foooticon1.png" alt="Market Image" width={100} height={70} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}