"use client";
import { motion } from "framer-motion";
import useFadeInUp from "../hooks/Fade/useFadeInUp";

export default function Reveal({ children, className, ...opts }) {
  const anim = useFadeInUp(opts);
  return (
    <motion.div className={className} {...anim}>
      {children}
    </motion.div>
  );
}
