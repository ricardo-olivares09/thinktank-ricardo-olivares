import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/MaskText";
import { StaggerContainer, StaggerItem } from "@/components/StaggerCards";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Publicaciones",
  description: "Biblioteca de análisis: investigación aplicada sobre geopolítica, economía ecológica y el sistema global.",
  openGraph: { title: "Publicaciones | IMEG", description: "Análisis y publicaciones del IMEG." },
};

export default function PublicacionesPage() {
  const publicaciones = obtenerPublicaciones();

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
              Biblioteca de análisis
            </p>
          </Reveal>
          
          <h1 className="text-5xl text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-medium" style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic" }}>
            Publicaciones & <br/> Documentos
          </h1>

          <Reveal variant="fade-up" delay={0.3}>
             <p className="mt-8 text-[16px] md:text-[18px] leading-8 text-white/70 max-w-2xl">
                Investigación aplicada sobre geopolítica, comercio internacional, logística global y las transformaciones de la economía mundial.
              </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Count */}
      <Reveal variant="fade-up" delay={0.1}>
        <div className="flex items-end justify-between border-b border-[#00224D]/10 pb-6 mb-12">
           <div>
             <h2 className="text-3xl text-[#00224D] font-medium tracking-tight">Acervo</h2>
           </div>
           <div className="text-[12px] font-bold tracking-widest text-[#00224D]/50 uppercase">
             {publicaciones.length} PUBLICACIONES
           </div>
        </div>
      </Reveal>

      {/* Grid */}
      <StaggerContainer className="mt-8 grid gap-5 md:grid-cols-2">
        {publicaciones.map((pub, index) => (
          <StaggerItem key={`${pub.slug}-${index}`}>
            <Link
              href={`/publicaciones/${pub.slug}`}
              className="group flex flex-col justify-between h-full rounded-3xl border border-[#00224D]/5 bg-white p-8 shadow-[0_2px_20px_rgba(0,34,77,0.03)] transition-all duration-500 hover:border-[#FF204E]/20 hover:shadow-[0_24px_48px_rgba(0,34,77,0.08)] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF204E]">
                    {pub.categoria}
                  </span>
                  <span className="text-[11px] font-medium text-[#94A3B8]">
                    {pub.fecha}
                  </span>
                </div>

                <h2 className="text-[20px] md:text-[22px] font-medium leading-[1.3] text-[#00224D] transition-colors group-hover:text-[#FF204E]">
                  {pub.titulo}
                </h2>

                <p className="mt-4 flex-grow text-[14px] leading-relaxed text-[#475569] line-clamp-3">
                  {pub.resumen}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#00224D]/5 flex items-center justify-between">
                <span className="text-[12px] font-medium italic text-[#64748B]">
                  Por {pub.autor}
                </span>
                <span className="text-[12px] font-bold text-[#FF204E] opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1">
                  Leer documento <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {publicaciones.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-[#94A3B8]">No se encontraron publicaciones.</p>
        </div>
      )}
      </div>
    </div>
  );
}