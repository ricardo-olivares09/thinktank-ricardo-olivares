"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in"
  | "clip-reveal";

const variantMap: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "clip-reveal": {
    hidden: { opacity: 0, clipPath: "inset(8% 8% 8% 8% round 24px)" },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" },
  },
};

export default function Reveal({
  children,
  delay = 0,
  variant = "fade-up",
  className = "",
  duration = 0.8,
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variantMap[variant]}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}