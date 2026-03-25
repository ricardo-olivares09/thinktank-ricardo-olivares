import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/MaskText";
import { proyectos } from "@/lib/proyectos";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Instituto",
  description: "Misión, visión, principios y modelo de trabajo del Instituto Mexicano de Estudios Globales.",
  openGraph: { title: "Instituto | IMEG", description: "Misión, visión y principios del IMEG." },
};

const principios = [
  { titulo: "Rigor analítico", texto: "Cada publicación y dataset se basa en fuentes verificables, metodologías explícitas y estándares académicos." },
  { titulo: "Independencia intelectual", texto: "El IMEG no responde a agendas institucionales. Los análisis reflejan la evidencia disponible y la interpretación honesta del equipo." },
  { titulo: "Transparencia de datos", texto: "Las fuentes, transformaciones y limitaciones de cada recurso se documentan de manera explícita." },
  { titulo: "Acceso abierto", texto: "Las publicaciones, fichas técnicas y visualizaciones del IMEG son de acceso libre para cualquier persona interesada." },
];

export default function InstitutoPage() {
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
              Institución
            </p>
          </Reveal>
          
          <h1 className="text-5xl text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-medium" style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic" }}>
            Instituto Mexicano de
            <br />
            Estudios Globales
          </h1>

          <Reveal variant="fade-up" delay={0.3}>
             <p className="mt-8 text-[16px] md:text-[18px] leading-8 text-white/70 max-w-3xl">
                El IMEG es una plataforma de investigación aplicada dedicada al análisis de economía internacional, geopolítica económica, comercio, logística, datos y transformación del sistema global.
              </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Misión y Visión */}
      <Reveal variant="fade-up" delay={0.1}>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Misión - Vibrant Red Gradient */}
          <div className="relative overflow-hidden flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#A0153E] to-[#FF204E] p-10 lg:p-12 text-white shadow-2xl transition-all duration-500 hover:shadow-[#FF204E]/20 hover:-translate-y-1">
             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[60px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
             <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-5 block">
                  Nuestro Propósito
                </span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-5" style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic" }}>
                  Misión
                </h2>
                <p className="text-[15px] md:text-[16px] leading-relaxed text-white/90">
                  Producir, sistematizar y difundir análisis rigurosos sobre economía internacional, geopolítica económica, comercio, logística y transformación del sistema global, mediante investigación aplicada, construcción de bases de datos y desarrollo de herramientas analíticas accesibles en español.
                </p>
             </div>
          </div>

          {/* Visión - Deep Navy Gradient */}
          <div className="relative overflow-hidden flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#0A1635] to-[#00224D] p-10 lg:p-12 text-white shadow-2xl transition-all duration-500 hover:shadow-[#00224D]/20 hover:-translate-y-1">
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF204E]/15 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
             <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF204E] mb-5 block">
                  Nuestro Horizonte
                </span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-5" style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic" }}>
                  Visión
                </h2>
                <p className="text-[15px] md:text-[16px] leading-relaxed text-white/80">
                  Consolidarse como una plataforma de referencia en el mundo hispanohablante para el análisis de economía global, geopolítica económica y datos estructurados, articulando investigación, visualización y repositorios técnicos que faciliten la comprensión del sistema internacional.
                </p>
             </div>
          </div>
        </div>
      </Reveal>

      {/* Modelo de trabajo */}
      <Reveal variant="fade-up" delay={0.15}>
        <div className="mt-6 relative overflow-hidden flex flex-col justify-between rounded-3xl bg-gradient-to-r from-[#000511] via-[#0A1635] to-[#000511] border border-white/5 p-10 lg:p-14 text-white shadow-[0_20px_50px_rgba(0,34,77,0.15)] transition-all duration-500 hover:shadow-[#00224D]/30 hover:-translate-y-1">
          {/* Subtle Grid / Cyber glow inside */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="relative z-10 md:flex items-center gap-10">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF204E] mb-3 block">Metodología</span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white/90">Modelo de<br/>trabajo</h2>
            </div>
            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
              <p className="text-[15px] md:text-[17px] leading-relaxed text-white/70">
                El IMEG desarrolla tres tipos principales de producción analítica: <span className="text-white font-medium">publicaciones, datasets y visualizaciones</span>. Su trabajo integra investigación aplicada, estructuración de información y desarrollo de recursos analíticos en español.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Principios */}
      <Reveal variant="fade-up" delay={0.2}>
        <div className="mt-20">
          <div className="flex items-end justify-between border-b border-[#00224D]/10 pb-6 mb-8">
             <h2 className="text-3xl text-[#00224D] font-medium tracking-tight">Nuestros principios</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principios.map((principio, idx) => (
              <div
                key={principio.titulo}
                className="group relative overflow-hidden rounded-3xl border border-[#00224D]/5 bg-[#FDFDFD] p-8 shadow-[0_2px_10px_rgba(0,34,77,0.02)] transition-all duration-500 hover:border-[#FF204E]/30 hover:shadow-[0_20px_40px_rgba(0,34,77,0.06)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF204E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00224D]/5 text-[14px] font-bold text-[#00224D] mb-6 transition-colors group-hover:bg-[#FF204E] group-hover:text-white">
                    0{idx + 1}
                  </span>
                  <h3 className="text-[18px] md:text-[20px] font-medium leading-snug text-[#00224D] group-hover:text-[#FF204E] transition-colors mb-4">
                    {principio.titulo}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#475569]">
                    {principio.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Líneas de investigación */}
      <Reveal variant="fade-up" delay={0.2}>
        <div className="mt-20">
          <div className="flex items-end justify-between border-b border-[#00224D]/10 pb-6 mb-8">
             <h2 className="text-3xl text-[#00224D] font-medium tracking-tight">Líneas de investigación</h2>
             <Link href="/proyectos" className="text-[12px] font-bold text-[#FF204E] hover:text-[#00224D] transition-colors uppercase tracking-widest hidden sm:block">
                Ver todos los proyectos →
             </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((proyecto) => (
              <Link
                href={`/proyectos/${proyecto.slug}`}
                key={proyecto.slug}
                className="group flex flex-col justify-between rounded-2xl border border-[#00224D]/5 bg-white p-6 shadow-[0_2px_10px_rgba(0,34,77,0.02)] transition-all duration-300 hover:border-[#FF204E]/30 hover:shadow-[0_12px_30px_rgba(0,34,77,0.06)] hover:-translate-y-1"
              >
                <div>
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF204E]">
                        {proyecto.categoria}
                     </span>
                     <ArrowUpRight className="h-4 w-4 text-[#00224D]/20 group-hover:text-[#FF204E] transition-colors" />
                   </div>
                   <h3 className="text-lg font-medium text-[#00224D] group-hover:text-[#FF204E] transition-colors leading-snug">
                     {proyecto.titulo}
                   </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>


      {/* Política de datos */}
      <Reveal variant="fade-up" delay={0.3}>
        <div className="mt-20 rounded-3xl border border-transparent bg-[#0A1635] p-10 md:p-14 text-white relative overflow-hidden">
          {/* Subtle glow inside the container */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF204E]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight relative z-10 text-white">Política de datos</h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-8 text-white/70 relative z-10 max-w-4xl">
            El IMEG desarrolla y mantiene bases de datos estructuradas derivadas de fuentes oficiales, registros públicos y compilaciones propias. Los datasets pueden clasificarse como públicos, derivados o privados. En todos los casos se documenta la fuente primaria y la metodología de transformación aplicada.
          </p>
        </div>
      </Reveal>
    </div>
  </div>
  );
}