"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const cinematicEasing = [0.76, 0, 0.24, 1] as any;

interface MaskTextProps {
  text: string | string[];
  el?: React.ElementType;
  className?: string;
  delay?: number;
}

export default function MaskText({ text, el: Wrapper = "div", className = "", delay = 0 }: MaskTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Si es un string, lo dividimos por \n o lo usamos directo
  const lines = Array.isArray(text) ? text : text.split("\n");

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { y: "100%" },
    show: {
      y: "0%",
      transition: { duration: 1.2, ease: cinematicEasing },
    },
  };

  return (
    <Wrapper ref={ref} className={className}>
      <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
        {lines.map((line, index) => (
          <div key={index} className="overflow-hidden inline-block w-full">
            <motion.div variants={item}>{line}</motion.div>
          </div>
        ))}
      </motion.div>
    </Wrapper>
  );
}
