import Link from "next/link";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";
import { obtenerDatasets } from "@/lib/datasets-content";
import { colaboradores } from "@/lib/colaboradores";
import { categorias } from "@/lib/categorias";
import { proyectos } from "@/lib/proyectos";

const estilos = {
  fondo: "bg-[#F8FAFC]", // Un gris azulado muy tenue para que el blanco destaque
  panel: "bg-white",
  vidrio: "backdrop-blur-xl",
  textoPrincipal: "text-[#00224D]",
  textoCargo: "text-[#FF204E] font-medium tracking-wide",
  textoSecundario: "text-[#334155] leading-relaxed",
  textoSuave: "text-[#64748B]",
  acento: "text-[#FF204E]",
  // Borde casi invisible que solo define la forma
  borde: "border-[#00224D]/5", 
  botonGradiente: "bg-gradient-to-r from-[#FF204E] via-[#A0153E] to-[#00224D] text-white",
  // Sombra profunda y suave para dar elevación real
  sombra: "shadow-[0_20px_50px_rgba(0,34,77,0.05)]",
  transicion: "transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
  transicionLenta: "transition-all duration-500 ease-out",
};

function slugificar(texto: string) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ResumenInstituto() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className={`rounded-[40px] border ${estilos.borde} bg-white p-8 md:p-12 ${estilos.sombra}`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div>
            <p className={`${estilos.acento} text-xs font-bold uppercase tracking-[0.24em]`}>Institución</p>
            <h2 className={`mt-4 ${estilos.textoPrincipal} text-3xl font-semibold md:text-4xl tracking-tight`}>
              Rigor analítico y pensamiento global
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className={`${estilos.textoSecundario} text-lg leading-relaxed`}>
              El IMEG es una plataforma de investigación aplicada dedicada al análisis de economía internacional y geopolítica económica. Nuestra misión es sistematizar datos críticos para facilitar la comprensión del sistema internacional.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#FF204E]" />
                <span className={`text-sm font-bold ${estilos.textoPrincipal}`}>Transparencia de datos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#FF204E]" />
                <span className={`text-sm font-bold ${estilos.textoPrincipal}`}>Independencia intelectual</span>
              </div>
            </div>
            <Link 
              href="/instituto" 
              className={`inline-block font-bold ${estilos.acento} hover:underline decoration-2 underline-offset-8 transition-all`}
            >
              Conoce nuestra metodología y principios →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EncabezadoSeccion({ etiqueta, titulo, descripcion, href, cta }: { etiqueta: string; titulo: string; descripcion?: string; href: string; cta: string; }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className={`text-xs font-bold uppercase tracking-[0.24em] ${estilos.acento}`}>{etiqueta}</p>
        <h2 className={`mt-3 text-4xl font-semibold tracking-tight ${estilos.textoPrincipal}`}>{titulo}</h2>
        {descripcion && <p className={`mt-4 text-base ${estilos.textoSecundario}`}>{descripcion}</p>}
      </div>
      <Link href={href} className={`group inline-flex items-center text-sm font-bold ${estilos.acento} ${estilos.transicion}`}>
        {cta} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const publicacionesDestacadas = obtenerPublicaciones().filter((p) => p.destacada).slice(0, 2);
  const datasetsDestacados = obtenerDatasets().slice(0, 3);
  const colaboradoresDestacados = colaboradores.filter((c) => c.destacado).slice(0, 3);

  return (
    <div className={`${estilos.fondo} pb-20`}>
      <main>
        {/* HERO SECTION */}
        <section id="inicio" className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* CARD PRINCIPAL (HERO) */}
            <div className={`relative overflow-hidden rounded-[40px] border ${estilos.borde} ${estilos.panel} ${estilos.vidrio} ${estilos.sombra} p-8 lg:p-12 ${estilos.transicionLenta} hover:shadow-[0_30px_60px_rgba(0,34,77,0.1)]`}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,32,78,0.06),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,34,77,0.04),transparent_40%)]" />
              
              <div className="relative z-10">
                <p className={`text-xs font-bold uppercase tracking-[0.3em] ${estilos.acento}`}>Centro de análisis aplicado</p>
                <h1 className={`mt-6 text-5xl font-bold leading-[1.1] tracking-tight ${estilos.textoPrincipal} lg:text-7xl`}>
                  Instituto Mexicano de Estudios Globales
                </h1>
                <p className={`mt-8 max-w-2xl text-lg leading-relaxed ${estilos.textoSecundario}`}>
                  Investigación aplicada en geopolítica económica y logística global. Un espacio para articular datos y pensamiento crítico en español.
                </p>
                
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/publicaciones" className={`rounded-full ${estilos.botonGradiente} px-8 py-4 text-sm font-bold ${estilos.transicion} hover:scale-105 hover:shadow-xl hover:shadow-[#FF204E]/20`}>
                    Ver publicaciones
                  </Link>
                  <Link href="/datos" className={`rounded-full border-2 border-[#00224D] px-8 py-4 text-sm font-bold ${estilos.textoPrincipal} ${estilos.transicion} hover:bg-[#00224D] hover:text-white`}>
                    Explorar datasets
                  </Link>
                </div>
              </div>
            </div>

            {/* SIDEBAR REESTRUCTURADO */}
            <div className={`rounded-[40px] border ${estilos.borde} bg-white p-8 ${estilos.sombra}`}>
              {/* Bloque 1: Temas */}
              <p className={`text-xs font-bold uppercase tracking-[0.2em] ${estilos.acento}`}>Líneas de investigación</p>
              <div className="mt-6 grid gap-2">
                {categorias
                  .filter(cat => cat !== "Datos" && cat !== "Mapas")
                  .map((cat) => (
                  <Link key={cat} href={`/publicaciones?tema=${encodeURIComponent(slugificar(cat))}`}
                    className={`group flex items-center justify-between rounded-xl border ${estilos.borde} bg-slate-50/50 p-3 ${estilos.transicion} hover:border-[#FF204E]/30 hover:bg-white hover:shadow-md`}>
                    <span className={`text-sm font-semibold ${estilos.textoPrincipal}`}>{cat}</span>
                    <span className={`text-[10px] font-bold ${estilos.textoSuave} group-hover:text-[#FF204E]`}>Explorar</span>
                  </Link>
                ))}
              </div>

              {/* Bloque 2: Herramientas */}
              <div className="mt-10 pt-8 border-t border-slate-100">
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${estilos.textoSuave}`}>Recursos técnicos</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link href="/datos" className={`flex flex-col rounded-2xl border ${estilos.borde} bg-slate-50/30 p-4 ${estilos.transicion} hover:border-[#FF204E]/30 hover:bg-white hover:shadow-md`}>
                    <span className={`text-xs font-bold ${estilos.acento}`}>Datasets</span>
                    <span className="text-[10px] text-slate-400">Bases de datos</span>
                  </Link>
                  <Link href="/mapas" className={`flex flex-col rounded-2xl border ${estilos.borde} bg-slate-50/30 p-4 ${estilos.transicion} hover:border-[#FF204E]/30 hover:bg-white hover:shadow-md`}>
                    <span className={`text-xs font-bold ${estilos.acento}`}>Mapas</span>
                    <span className="text-[10px] text-slate-400">Visor territorial</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ResumenInstituto />

        {/* PUBLICACIONES */}
        <section id="publicaciones" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <EncabezadoSeccion etiqueta="Biblioteca" titulo="Análisis destacados" href="/publicaciones" cta="Ir a biblioteca" />
          <div className="grid gap-8 md:grid-cols-2">
            {publicacionesDestacadas.map((pub) => (
              <Link key={pub.slug} href={`/publicaciones/${pub.slug}`} 
                className={`group rounded-[32px] border ${estilos.borde} ${estilos.panel} p-8 ${estilos.sombra} ${estilos.transicion} hover:-translate-y-2 hover:border-[#FF204E]/30`}>
                <p className={`text-xs font-bold uppercase ${estilos.acento}`}>{pub.categoria}</p>
                <h3 className={`mt-3 text-2xl font-bold ${estilos.textoPrincipal}`}>{pub.titulo}</h3>
                <p className={`mt-4 text-sm ${estilos.textoSecundario}`}>{pub.resumen}</p>
                <div className="mt-8 flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className="text-[#00224D]">{pub.autor}</span><span>•</span><span>{pub.fecha}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* COLABORADORES */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <EncabezadoSeccion etiqueta="Red Global" titulo="Colaboradores" href="/colaboradores" cta="Ver todos" />
          <div className="grid gap-6 md:grid-cols-3">
            {colaboradoresDestacados.map((col) => (
              <div key={col.slug} className={`rounded-[32px] border ${estilos.borde} bg-white p-8 ${estilos.sombra} transition-transform hover:scale-[1.02]`}>
                <div className="h-1 w-12 bg-[#FF204E] rounded-full mb-6" />
                <h3 className={`text-xl font-bold ${estilos.textoPrincipal}`}>{col.nombre}</h3>
                <p className={`mt-1 text-sm ${estilos.textoCargo}`}>{col.rol}</p>
                <p className={`mt-4 text-sm leading-relaxed ${estilos.textoSecundario}`}>{col.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}