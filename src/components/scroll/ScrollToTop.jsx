"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop({
  showAfter = 300,
  className = "",
} = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > showAfter);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="بازگشت به بالای صفحه"
      className={[
        "rounded-full p-3",
        "bg-orange-500 text-white ring-2 ring-white",
        "transition-transform duration-300 ease-out hover:scale-110",
        "shadow-lg",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
        "focus:outline-none focus:ring-4 focus:ring-orange-200",
        "hover:bg-white hover:text-orange-500",
        className,
      ].join(" ")}
    >
      {/* آیکون فلش بالا */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6"
        fill="currentColor"
      >
        <path d="M12 4a1 1 0 0 1 .707.293l6 6a1 1 0 1 1-1.414 1.414L13 7.414V20a1 1 0 1 1-2 0V7.414L6.707 11.707A1 1 0 0 1 5.293 10.293l6-6A1 1 0 0 1 12 4z" />
      </svg>
    </button>
  );
}
