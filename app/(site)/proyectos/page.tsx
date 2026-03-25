import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerCards";
import { proyectos } from "@/lib/proyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Líneas de investigación y proyectos temáticos del Instituto Mexicano de Estudios Globales.",
  openGraph: { title: "Proyectos | IMEG", description: "Líneas de investigación del IMEG." },
};

export default function ProyectosPage() {
  return (
    <div className="w-full bg-[#FDFDFD]">
      {/* Editorial / Cinematic Header */}
      <section className="relative w-full overflow-hidden bg-[#000511] pt-40 pb-20 sm:pt-48 sm:pb-32 -mt-24 mb-16">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A1635] via-[#000511] to-[#000511]" />
        
        {/* Subtle Cyber Grid (like Hero) */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_10%,#000_20%,transparent_100%)] pointer-events-none" />

        {/* Foreground Overlays (Fades) */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/90 to-transparent z-[3] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <Reveal variant="fade-up" delay={0.1}>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF204E] mb-6">
              Líneas de investigación
            </p>
          </Reveal>
          
          <h1 className="text-5xl text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-medium" style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic" }}>
            Proyectos & Ejes
          </h1>

          <Reveal variant="fade-up" delay={0.3}>
             <p className="mt-8 text-[16px] md:text-[18px] leading-8 text-white/70 max-w-2xl">
                Los proyectos organizan el trabajo temático del IMEG y agrupan publicaciones, recursos, datos y desarrollos de forma estructurada.
              </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((proyecto, idx) => (
          <StaggerItem key={proyecto.slug}>
            <a href={`/proyectos/${proyecto.slug}`} className="group block h-full rounded-2xl border border-[#00224D]/5 bg-white p-8 shadow-[0_2px_20px_rgba(0,34,77,0.03)] transition-all duration-300 hover:border-[#FF204E]/20 hover:shadow-[0_20px_40px_rgba(0,34,77,0.08)] hover:-translate-y-2">
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-[2rem] font-medium leading-none text-[#00224D]/10 group-hover:text-[#FF204E] transition-colors font-serif italic">
                  {String(idx + 1).padStart(2, "0")}.
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF204E]">
                  {proyecto.categoria}
                </p>
              </div>

              <h2 className="text-xl md:text-2xl font-medium tracking-tight leading-snug text-[#00224D] group-hover:text-[#FF204E] transition-colors">
                {proyecto.titulo}
              </h2>

              <p className="mt-4 text-[14px] leading-relaxed text-[#475569]">
                {proyecto.resumen}
              </p>
            </a>
          </StaggerItem>
        ))}
        </StaggerContainer>
      </div>
    </div>
  );
}