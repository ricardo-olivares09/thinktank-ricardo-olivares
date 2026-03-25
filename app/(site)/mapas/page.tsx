"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerCards";

function VisorLectura({ src, titulo }: { src: string; titulo: string }) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="mt-6">
      {!mostrar ? (
        <button
          onClick={() => setMostrar(true)}
          className="rounded-full bg-gradient-to-r from-[#FF204E] via-[#A0153E] to-[#00224D] px-5 py-2 text-xs font-bold text-white transition-all hover:scale-105 cursor-pointer"
        >
          Cargar visualización
        </button>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <iframe
            src={src}
            title={titulo}
            className="h-[600px] w-full"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

import { ArrowUpRight } from "lucide-react";
export default function LecturasRapidasPage() {

  const lecturas = [
    {
      titulo: "Choques de oferta en México",
      resumen:
        "Eventos logísticos, bloqueos y disrupciones con impacto en comercio exterior y actividad productiva.",
      preview: "/previews/choques.webp",
      src: "/visores/choques/index.html",
      etiqueta: "México",
    },
    {
      titulo: "Chokepoints geopolíticos",
      resumen:
        "Rutas estratégicas del comercio global, cuellos de botella y focos de tensión con lectura geopolítica.",
      preview: "/previews/geopolitica.webp",
      src: "/visores/chokepoints-geopoliticos/index.html",
      etiqueta: "Geopolítica",
    },
    {
      titulo: "Exportaciones México–EE.UU.",
      resumen:
        "Estructura sectorial del comercio bilateral, concentración exportadora y peso relativo por ramas.",
      preview: "/previews/comercio-mx-eeuu.webp",
      src: "/visores/comercio-mx-eeuu/index.html",
      etiqueta: "Sectorial",
    },
    {
      titulo: "Atlas del Comercio Exterior",
      resumen:
        "Vista analítica para seguir socios, sectores y exposición logística en el comercio exterior mexicano.",
      preview: "/previews/petroleo.webp",
      src: "/visores/atlas-comercio-exterior/index.html",
      etiqueta: "Atlas",
    },
    {
      titulo: "México y el mundo",
      resumen:
        "Relación de México con sus socios globales, saldo bilateral y lectura geoeconómica del comercio.",
      preview: "/previews/comercio-mundo.webp",
      src: "/visores/comercio-mundo/index.html",
      etiqueta: "Comercio global",
    },
    {
      titulo: "Petróleo: producción y comercio",
      resumen:
        "Visualización de producción, exportación y precios del petróleo mexicano en contexto global.",
      preview: "/previews/petroleo.webp",
      src: "/visores/petroleo.html",
      etiqueta: "Energía",
    },
    {
      titulo: "Industria Automotriz en México",
      resumen:
        "Evolución histórica interactiva de ensamblaje por armadora, balanza comercial y volumen de ventas.",
      preview: "/previews/comercio-mundo.webp",
      src: "/visores/industria-automotriz/index.html",
      etiqueta: "Manufactura",
    },
  ];

  return (
    <div className="w-full bg-[#FDFDFD]">
      {/* Editorial / Cinematic Header */}
      <section className="relative w-full overflow-hidden bg-[#000511] pt-40 pb-20 sm:pt-48 sm:pb-32 -mt-24 mb-16">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A1635] via-[#000511] to-[#000511]" />
        
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_10%,#000_20%,transparent_100%)] pointer-events-none" />

        {/* Foreground Overlays (Fades) */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/90 to-transparent z-[3] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <Reveal variant="fade-up" delay={0.1}>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF204E] mb-6">
              Coyuntura Internacional
            </p>
          </Reveal>
          
          <h1 className="text-5xl text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-medium" style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic" }}>
            Visores & <br/> Lecturas Rápidas
          </h1>

          <Reveal variant="fade-up" delay={0.3}>
             <p className="mt-8 text-[16px] md:text-[18px] leading-8 text-white/70 max-w-2xl">
                Piezas visuales e interactivas para leer comercio, logística, geopolítica económica y disrupciones desde una narrativa aplicada.
              </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Reveal variant="fade-up" delay={0.1}>
          <div className="flex items-end justify-between border-b border-[#00224D]/10 pb-6 mb-12">
             <div>
               <h2 className="text-3xl text-[#00224D] font-medium tracking-tight">Análisis Visual</h2>
             </div>
             <div className="text-[12px] font-bold tracking-widest text-[#00224D]/50 uppercase">
               {lecturas.length} VISORES
             </div>
          </div>
        </Reveal>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {lecturas.map((lectura) => (
          <StaggerItem key={lectura.titulo}>
            <div
              className="flex flex-col justify-between h-full rounded-3xl border border-[#00224D]/5 bg-white p-8 shadow-[0_2px_20px_rgba(0,34,77,0.03)] transition-all duration-500 hover:-translate-y-1 hover:border-[#FF204E]/20 hover:shadow-[0_24px_48px_rgba(0,34,77,0.08)]"
            >
              <div>
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF204E]">
                    {lectura.etiqueta}
                  </span>
                  <a href={lectura.src} target="_blank" rel="noopener noreferrer" className="group">
                    <span className="text-sm font-bold text-slate-400 group-hover:text-[#FF204E] transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-100 transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src={lectura.preview}
                    alt={lectura.titulo}
                    width={800}
                    height={500}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <h2 className="mt-6 text-[20px] md:text-[22px] font-medium leading-[1.3] text-[#00224D]">
                  {lectura.titulo}
                </h2>

                <p className="mt-4 text-[14px] leading-relaxed text-[#475569]">
                  {lectura.resumen}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#00224D]/5">
                <VisorLectura src={lectura.src} titulo={lectura.titulo} />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      </div>
    </div>
  );
}