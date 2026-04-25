"use client";
import { motion } from "framer-motion";

export default function MotionCard({ icon, title, children, className = "" }) {
    return (
        <motion.div
            className={[
                "group relative rounded-2xl bg-white p-6 border border-transparent shadow-md",
                "will-change-transform", className,
            ].join(" ")}
            whileHover={{ y: -8, scale: 1.02, boxShadow: "0 10px 24px rgba(0,0,0,.10)" }}
            transition={{
                type: "spring",
                stiffness: 140,
                damping: 16,
                mass: 0.9,
            }}
        >
            <div className="flex items-center gap-3">
                <motion.div
                    className="grid place-items-center w-10 h-10"
                    whileHover={{ scale: 1.1, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 14 }}
                >
                    {icon}
                </motion.div>

                <div className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                    {title}
                </div>
            </div>
            {children && <div className="mt-3 text-sm text-gray-600">{children}</div>}
        </motion.div>
    );
}
