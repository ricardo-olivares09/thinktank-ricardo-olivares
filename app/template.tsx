"use client";

import { motion } from "framer-motion";

export const cinematicEasing = [0.76, 0, 0.24, 1]; // Curva Expo In-Out muy dramática (Leclerc style)

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
      transition={{ 
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] 
      }}
    >
      {children}
    </motion.main>
  );
}
