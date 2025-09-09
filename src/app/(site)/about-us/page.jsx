import Image from "next/image";
import Stats from "@/components/Counter/Stats";
import GalleryImage from "@/components/Gallery/GalleryImage";
export default function Aboutus() {
  const stats = [
    {
      label: "تورهای داخلی",
      value: 65,
      img: "/assets/img/about/gallery-6.png",
    },
    {
      label: "رضایت مشتری",
      value: 78,
      img: "/assets/img/about/gallery-5.png",
    },
  ];

  return (
    <section className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 gap-8 items-center">

        <div className="flex flex-col gap-6 md:col-span-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            ما را بهتر <span className="animate-gradient-text">بشناسید</span>
          </h2>
          <p className="text-gray-700 leading-8  text-base sm:text-lg">
          تعریف گردشگری موضوع ساده‌ای نیست، زیرا صنعت پیچیده‌ای است که از مشاغل مختلف تشکیل‌شده است و موضوع مشترک این است که در همه آن‌ها محصولات و خدمات را به گردشگران/ بازدیدکنندگان ارائه می‌دهند.گردشگری در ساده‌‌ترین تعریف ممکن یعنی سفر برای اهداف تجاری یا تفریحی به مکانی دور از زادگاه یا منطقه معمولی شما. به‌عنوان یک گردشگر، شما از مکانی دیدن می‌کنید که از منطقه عادی شما دور است. سازمان جهانی گردشگری (WTO) به‌طور خاص گردشگری را به‌عنوان ماندن در خارج از محیط معمولی خود برای یک سال یا کمتر برای اهداف تفریحی، یا 24 ساعت یا کمتر برای اهداف تجاری تعریف می‌کند.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-black">
                  {s.label}
                </h3>
                <div className="w-full bg-neutral-300 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-orange-600 h-4 rounded-full text-white text-sm flex items-center justify-end pr-2"
                    style={{ width: `${s.value}%` }}
                  >
                    {s.value}%
                  </div>
                </div>

                <div className="relative w-full h-56 rounded-xl overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.label}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full h-[460px] md:col-span-1 rounded-2xl overflow-hidden">
          <Image
            src="/assets/img/about/about-us-pic.png"
            alt="About Us"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div>
      <Stats/>
      <GalleryImage/>
      </div>
    </section>
  );
}
