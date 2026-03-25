import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/MaskText";
import { StaggerContainer, StaggerItem } from "@/components/StaggerCards";
import { proyectos } from "@/lib/proyectos";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export async function generateStaticParams() {
  return proyectos.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);
  if (!proyecto) return notFound();

  return {
    title: `${proyecto.titulo} | Proyecto`,
    description: proyecto.resumen,
  };
}

export default async function ProyectoDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);
  
  if (!proyecto) {
    notFound();
  }

  // Aggregate publications automatically!
  // Any Publication matching the project's 'categoria' frontmatter string
  const publicacionesTodas = obtenerPublicaciones();
  const publicacionesDelProyecto = publicacionesTodas.filter(
    (pub) => pub.categoria === proyecto.categoria
  );

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
              Línea de investigación — {proyecto.categoria}
            </p>
          </Reveal>
          
          <MaskText
            text={proyecto.titulo}
            className="text-4xl text-white md:text-6xl max-w-4xl tracking-tight leading-[1.1] font-medium"
          />

          <Reveal variant="fade-up" delay={0.3}>
             <p className="mt-8 text-[16px] md:text-[18px] leading-8 text-white/70 max-w-3xl">
                {proyecto.resumen}
              </p>
          </Reveal>
        </div>
      </section>

      {/* Aggregated Publications */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#00224D]/10 pb-6 mb-12">
            <div>
              <h2 className="text-3xl text-[#00224D] tracking-tight">Publicaciones</h2>
              <p className="mt-2 text-[14px] text-[#475569]">
                Investigación y análisis producidos bajo esta línea de trabajo.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-[13px] font-bold tracking-widest text-[#00224D]/50 uppercase">
              {publicacionesDelProyecto.length} DOCUMENTOS
            </div>
          </div>
        </Reveal>

        {publicacionesDelProyecto.length === 0 ? (
          <Reveal variant="fade-up" delay={0.1}>
            <div className="py-20 text-center rounded-3xl border border-dashed border-[#00224D]/10 bg-[#00224D]/[0.02]">
              <p className="text-[15px] text-[#475569]">
                Aún no hay publicaciones asginadas a este proyecto.
              </p>
            </div>
          </Reveal>
        ) : (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publicacionesDelProyecto.map((pub, idx) => (
              <StaggerItem key={pub.slug}>
                <Link
                  href={`/publicaciones/${pub.slug}`}
                  className="group flex flex-col justify-between h-full rounded-3xl border border-[#00224D]/5 bg-white p-8 shadow-[0_2px_20px_rgba(0,34,77,0.03)] transition-all duration-500 hover:border-[#FF204E]/20 hover:shadow-[0_24px_48px_rgba(0,34,77,0.08)] hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF204E]">
                        {pub.fecha}
                      </p>
                      <ArrowUpRight className="h-4 w-4 text-[#00224D]/30 transition-colors group-hover:text-[#FF204E]" />
                    </div>
                    <h3 className="text-[18px] md:text-[20px] font-medium leading-[1.3] text-[#00224D] transition-colors group-hover:text-[#FF204E] line-clamp-3">
                      {pub.titulo}
                    </h3>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-[#00224D]/5 flex items-center justify-between">
                    <p className="text-[12px] font-medium text-[#475569]">
                      {pub.autor}
                    </p>
                    <span className="text-[12px] font-bold text-[#00224D] group-hover:text-[#FF204E] transition-colors">
                      Leer →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>
    </div>
  );
}
