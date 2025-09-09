import { notFound } from "next/navigation";
import Image from "next/image";
import MiniTourCarousel from "@/components/Section/Carousel/MiniTourCarousel";
import { AImage } from "@/components/data/ArticleImage/ArticleImage";
import { Clock, Hotel, Utensils, Bus } from "lucide-react";
import ConsultationCTA from "@/components/ConsultationCTA/ConsultationCTA";

export default function TourDetails({ params }) {
  const { id } = params;

  // پیدا کردن آیتم متناظر با id
  const tour = AImage.find((t) => String(t.id) === String(id));
  if (!tour) return notFound();

  const carouselItems = [
    { src: "/assets/img/MiniCarousel/Mini1.jpg", date: "28 فروردین", passengers: 4 },
    { src: "/assets/img/MiniCarousel/Mini2.jpg", date: "26 اسفند", passengers: 14 },
    { src: "/assets/img/MiniCarousel/Mini3.jpg", date: "12 مرداد", passengers: 23 },
    { src: "/assets/img/MiniCarousel/Mini4.jpg", date: "14 شهریور", passengers: 12 },
  ];

  const features = [
    { icon: Clock, label: "مدت زمان برنامه" },
    { icon: Hotel, label: "اقامت" },
    { icon: Utensils, label: "وعده های غذایی" },
    { icon: Bus, label: "وسیله حمل و نقل" },
  ];

  return (
    <main className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
        <div className="md:col-span-2">
          <h1 className="mb-4 text-right text-lg sm:text-xl md:text-2xl font-bold text-black">
            {tour.title}
          </h1>

          <div className="relative mb-4 w-full overflow-hidden rounded-xl aspect-[16/9] md:aspect-[4/3]">
            <Image
              src={tour.image.startsWith("/") ? tour.image : `/${tour.image}`}
              alt={tour.title || "تصویر مقاله"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 66vw"
              priority
            />
          </div>

          <div className="mb-5 flex items-center gap-3">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full ring-2 ring-white shadow">
              <Image
                src="/assets/img/section/testimonal-person-1.png"
                alt="Daris"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm sm:text-base font-semibold text-black">Daris@</span>
            <span className="text-sm sm:text-lg text-gray-600 ">{tour.Date}</span>
          </div>

          <div className="mb-8 max-w-full md:max-w-3xl text-neutral-700">
            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-10">
              تعریف گردشگری موضوع ساده‌ای نیست، زیرا صنعت پیچیده‌ای است که از مشاغل مختلف تشکیل‌شده است و موضوع مشترک این است که در همه آن‌ها محصولات و خدمات را به گردشگران/ بازدیدکنندگان ارائه می‌دهند.گردشگری در ساده‌‌ترین تعریف ممکن یعنی سفر برای اهداف تجاری یا تفریحی به مکانی دور از زادگاه یا منطقه معمولی شما. به‌عنوان یک گردشگر، شما از مکانی دیدن می‌کنید که از منطقه عادی شما دور است. سازمان جهانی گردشگری (WTO) به‌طور خاص گردشگری را به‌عنوان ماندن در خارج از محیط معمولی خود برای یک سال یا کمتر برای اهداف تفریحی، یا 24 ساعت یا کمتر برای اهداف تجاری تعریف می‌کند.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center gap-2 sm:gap-3 rounded-xl p-4 sm:p-6 bg-gray-100 text-black hover:bg-orange-600 hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500 group-hover:text-white transition-colors duration-300" />
                  <span className="text-xs sm:text-sm font-semibold">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="lg:col-span-1 overflow-hidden">
          <MiniTourCarousel items={carouselItems} className="w-full max-w-full" />
          <ConsultationCTA />
        </aside>
      </div>
    </main>
  );
}
