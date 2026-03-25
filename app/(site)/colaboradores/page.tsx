import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/MaskText";
import { StaggerContainer, StaggerItem } from "@/components/StaggerCards";
import { colaboradores } from "@/lib/colaboradores";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Colaboradores",
  description: "Red editorial, equipo de investigación y colaboradores del Instituto Mexicano de Estudios Globales.",
  openGraph: { title: "Colaboradores | IMEG", description: "Red editorial del IMEG." },
};

export default function ColaboradoresPage() {
  const internos = colaboradores.filter((c) => c.tipo === "Interno");
  const externos = colaboradores.filter((c) => c.tipo !== "Interno");

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
              Red Editorial
            </p>
          </Reveal>
          
          <h1 className="text-5xl text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-medium" style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic" }}>
            Investigadores & <br/> Colaboradores
          </h1>

          <Reveal variant="fade-up" delay={0.3}>
             <p className="mt-8 text-[16px] md:text-[18px] leading-8 text-white/70 max-w-2xl">
                Conoce al equipo detrás del Instituto Mexicano de Estudios Globales. Analistas, académicos y especialistas en el entorno internacional.
              </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Equipo interno */}
      {internos.length > 0 && (
        <Reveal variant="fade-up" delay={0.1}>
          <div className="mb-20">
            <div className="flex items-center gap-6 border-b border-[#00224D]/10 pb-6 mb-12">
               <h2 className="text-3xl text-[#00224D] font-medium tracking-tight">Equipo interno</h2>
            </div>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {internos.map((col) => (
                <StaggerItem key={col.slug}>
                  <Link
                    href={`/colaboradores/${col.slug}`}
                    className="group flex flex-col h-full rounded-3xl border border-[#00224D]/5 bg-white p-4 shadow-[0_2px_20px_rgba(0,34,77,0.03)] transition-all duration-500 hover:-translate-y-2 hover:border-[#FF204E]/20 hover:shadow-[0_24px_48px_rgba(0,34,77,0.08)] overflow-hidden"
                  >
                    {/* Contenedor Fotográfico Premium */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F8FAFC] flex items-center justify-center mb-6">
                       {/* Placeholder icon that smoothly fades out if image is added later */}
                       <svg className="w-12 h-12 text-[#94A3B8]/30 transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                       {/* Gradient Overlay for style */}
                       <div className="absolute inset-0 bg-gradient-to-t from-[#00224D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="px-2 pb-2 flex-grow flex flex-col">
                      <h2 className="text-xl font-medium leading-tight text-[#00224D] group-hover:text-[#FF204E] transition-colors">
                        {col.nombre}
                      </h2>
                      <p className="mt-2 text-[12px] font-bold uppercase tracking-widest text-[#FF204E]">
                        {col.rol}
                      </p>
                      <p className="mt-4 text-[13px] leading-relaxed text-[#475569] line-clamp-3">
                        {col.bio}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      )}

      {/* Colaboradores externos */}
      {externos.length > 0 && (
        <Reveal variant="fade-up" delay={0.2}>
          <div className="mb-20">
            <div className="flex items-center gap-6 border-b border-[#00224D]/10 pb-6 mb-12">
               <h2 className="text-3xl text-[#00224D] font-medium tracking-tight">Colaboradores externos</h2>
            </div>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {externos.map((col) => (
                <StaggerItem key={col.slug}>
                  <Link
                    href={`/colaboradores/${col.slug}`}
                    className="group flex flex-col h-full rounded-3xl border border-[#00224D]/5 bg-white p-4 shadow-[0_2px_20px_rgba(0,34,77,0.03)] transition-all duration-500 hover:-translate-y-2 hover:border-[#FF204E]/20 hover:shadow-[0_24px_48px_rgba(0,34,77,0.08)] overflow-hidden"
                  >
                    {/* Contenedor Fotográfico Premium */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F8FAFC] flex items-center justify-center mb-6">
                       {/* Placeholder */}
                       <svg className="w-12 h-12 text-[#94A3B8]/30 transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                       <div className="absolute inset-0 bg-gradient-to-t from-[#00224D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="px-2 pb-2 flex-grow flex flex-col">
                      <h2 className="text-xl font-medium leading-tight text-[#00224D] group-hover:text-[#FF204E] transition-colors">
                        {col.nombre}
                      </h2>
                      <p className="mt-2 text-[12px] font-bold uppercase tracking-widest text-[#FF204E]">
                        {col.rol}
                      </p>
                      <p className="mt-4 text-[13px] leading-relaxed text-[#475569] line-clamp-3">
                        {col.bio}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      )}
      </div>
    </div>
  );
}