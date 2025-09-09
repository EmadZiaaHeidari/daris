'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner({
  title = "با ما آسوده سفر کنید",
  subtitle = "همراه لحظه به لحظه سفرهای شما",
  imageSrc = "/assets/img/air.png",
  imageAlt = "هواپیما در آسمان در کنار ابرها با نقشه جهان",
  priority = false,
  primaryText = "بیشتر بدانید",
  primaryHref,
  onPrimaryClick,
  secondaryText,
  secondaryHref,
  onSecondaryClick,
  overlay = "medium",
  align = "right",    
  className = "",
}) {
  const overlayClass = {
    light: "from-slate-900/45 via-slate-900/30 to-transparent",
    medium: "from-slate-900/65 via-slate-900/45 to-transparent",
    dark: "from-slate-900/80 via-slate-900/60 to-transparent",
  }[overlay] || "from-slate-900/65 via-slate-900/45 to-transparent";

  const alignClass = {
    right: "items-center justify-end text-right",
    center: "items-center justify-center text-center",
    left: "items-center justify-start text-left",
  }[align] || "items-center justify-end text-right";

  const TitleTag = "h1";

  const PrimaryEl = primaryHref
    ? (props) => (
      <Link href={primaryHref} {...props} />
    )
    : (props) => <button type="button" {...props} onClick={onPrimaryClick} />;

  const SecondaryEl =
    secondaryText &&
    (secondaryHref
      ? (props) => <Link href={secondaryHref} {...props} />
      : (props) => (
        <button type="button" {...props} onClick={onSecondaryClick} />
      ));

  return (
    <section className={`my-8 w-full ${className}`} dir="rtl" aria-label={title}>
      <div className="relative h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-black/10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center will-change-transform"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-l ${overlayClass} z-10`}
          aria-hidden="true"
        />
        <svg
          className="pointer-events-none absolute left-6 top-6 w-48 opacity-70 text-white/70 z-20"
          viewBox="0 0 200 80"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 60 C 40 10, 120 100, 195 25"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
        <div className={`absolute inset-y-0 right-0 flex ${alignClass} z-20`}>
          <div className="max-w-xl p-6 md:p-10 text-white">
            {subtitle && (
              <p className="mb-2 text-sm md:text-base text-white/90 leading-6">
                {subtitle}
              </p>
            )}
            <TitleTag className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
              {title}
            </TitleTag>

            <Link href={'#'}>
              <div className="mt-4  flex flex-wrap items-center gap-3">
                <PrimaryEl
                  className="inline-block cursor-pointer h-10 px-4 rounded-lg bg-blue-400 text-white text-sm font-semibold leading-10 shadow-lg shadow-blue-500/25 transition-transform duration-200 hover:bg-blue-700 hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
                  aria-label={primaryText}
                >
                  {primaryText}
                </PrimaryEl>

                {SecondaryEl && (
                  <SecondaryEl
                    className="inline-block h-10 px-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/40 text-white text-sm font-semibold leading-10 transition-transform duration-200 hover:bg-white hover:text-slate-900 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    aria-label={secondaryText}
                  >
                    {secondaryText}
                  </SecondaryEl>
                )}
              </div>
            </Link>
          </div>
        </div>
        <div
          className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent z-10"
          aria-hidden="true"
        />
        <style jsx>{`
          @media (prefers-reduced-motion: no-preference) {
            .hover\\:scale-105:hover {
              transform: translateZ(0) scale(1.05);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
