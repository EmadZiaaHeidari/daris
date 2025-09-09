"use client";
import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

export default function useFadeInUp({
  delay = 0,
  once = true,
  y = 50,
  amount = 0.2,
  duration = 0.2,
  rootMargin = "0px 0px -50% 0px", 
  respectReducedMotion = true,  
} = {}) {
  const prefersReduced = useReducedMotion();
  const reduced = respectReducedMotion ? prefersReduced : false;

  const initial = { opacity: 0, y };
  const whileInView = { opacity: 1, y: 0 };
  const transition = { duration: reduced ? 0 : duration, delay };
  const viewport = { once, amount, margin: rootMargin };
  const style = { opacity: 0, transform: `translateY(${y}px)` };

  return useMemo(
    () => ({ initial, whileInView, viewport, transition, style }),
    [delay, once, y, amount, duration, rootMargin, reduced]
  );
}
