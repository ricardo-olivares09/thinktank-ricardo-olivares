"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar el scroll suave cinemático
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave "premium"
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Limpiar al desmontar
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
