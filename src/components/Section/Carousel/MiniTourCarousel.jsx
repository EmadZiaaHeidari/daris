"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

export default function MiniTourCarousel({
  items = [],
  title = "تور ۶ روزه، پرواز، هتل ۴ ستاره",
  className = "w-[320px]",
  interval = 3000,
}) {
  const [idx, setIdx] = useState(0);
  const containerRef = useRef(null);
  const pauseRef = useRef(false);

  const autoplay = (slider) => {
    let timer;
    function clear() {
      timer && clearTimeout(timer);
    }
    function next() {
      clear();
      if (pauseRef.current) return;
      timer = setTimeout(() => slider.next(), interval);
    }
    slider.on("created", next);
    slider.on("dragStarted", () => {
      pauseRef.current = true;
      clear();
    });
    slider.on("animationEnded", next);
    slider.on("updated", next);
  };

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      rtl: true,
      slideChanged(s) {
        setIdx(s.track.details.rel);
      },
      renderMode: "precision",
      defaultAnimation: { duration: 450, easing: (t) => t },
    },
    [autoplay]
  );

  if (!items.length) {
    return (
      <div className={`rounded-xl border p-4 text-sm text-gray-500 ${className}`} dir="rtl">
        هیچ آیتمی برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
    <div
      className={`select-none ${className}`}
      dir="rtl"
      ref={containerRef}
      onMouseEnter={() => (pauseRef.current = true)}
      onMouseLeave={() => (pauseRef.current = false)}
      onTouchStart={() => (pauseRef.current = true)}
      onTouchEnd={() => (pauseRef.current = false)}
    >
      <div className="rounded-2xl cursor-pointer border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-800 text-right">تاریخ تورها</h2>

        <div
          ref={sliderRef}
          className="keen-slider relative h-[340px] w-full overflow-hidden rounded-xl"
        >
          {items.map((it, i) => (
            <div key={i} className="keen-slider__slide relative">
              <Image
                src={it.src}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 360px) 100vw, 320px"
                draggable={false}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white p-4 text-center">
                <h3 className="text-xl font-bold">{title}</h3>
                <div className="mt-3 flex gap-2 text-sm">
                  <span className="rounded-md bg-white/20 px-2 py-1">تاریخ: {items[i].date}</span>
                  <span className="rounded-md bg-white/20 px-2 py-1">
                    تعداد مسافران: {items[i].passengers}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => slider.current?.moveToIdx(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === idx ? "bg-orange-500 w-3" : "bg-gray-300"
              }`}
              aria-label={`slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
