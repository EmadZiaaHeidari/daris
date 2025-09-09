"use client";
import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

export default function useFadeInRight({
  delay = 0,
  once = true,
  x = 80,        
  amount = 0.2,
  duration = 0.6,
  rootMargin = "0px 0px -10% 0px",
  respectReducedMotion = true,
} = {}) {
  const prefersReduced = useReducedMotion();
  const reduced = respectReducedMotion ? prefersReduced : false;

  const initial = { opacity: 0, x };
  const whileInView = { opacity: 1, x: 0 };
  const transition = { duration: reduced ? 0 : duration, delay };
  const viewport = { once, amount, margin: rootMargin };
  const style = { opacity: 0, transform: `translateX(${x}px)` };

  return useMemo(
    () => ({ initial, whileInView, transition, viewport, style }),
    [x, delay, once, amount, duration, rootMargin, reduced]
  );
}
