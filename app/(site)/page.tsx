import Link from "next/link";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import { StaggerContainer, StaggerItem } from "@/components/StaggerCards";
import MaskText from "@/components/MaskText";
import HeroTemporalGraph from "@/components/HeroTemporalGraph";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";
import { obtenerDatasets } from "@/lib/datasets-content";
import { colaboradores } from "@/lib/colaboradores";
import { coyuntura } from "@/lib/coyuntura";

const estilos = {
  acento: "text-[#FF204E]",
  textoPrincipal: "text-[#00224D]",
  textoSecundario: "text-[#475569]",
  textoSuave: "text-[#94A3B8]",
  borde: "border-[#00224D]/5",
  sombra: "shadow-[0_2px_20px_rgba(0,34,77,0.04)]",
  transicion: "transition-all duration-300 ease-out",
};

const mapasInteractivos = [
  {
    titulo: "Choques de oferta",
    descripcion: "Hotspots logísticos y productivos con foco en disrupciones y corredores.",
    href: "/visores/choques/index.html",
    etiqueta: "México",
  },
  {
    titulo: "Chokepoints geopolíticos",
    descripcion: "Rutas marítimas y puntos de estrangulamiento global con lectura geopolítica.",
    href: "/visores/chokepoints-geopoliticos/index.html",
    etiqueta: "Geopolítica",
  },
  {
    titulo: "Exportaciones México–EE.UU.",
    descripcion: "Ramas exportadoras, concentración y peso relativo hacia el mercado estadounidense.",
    href: "/visores/comercio-mx-eeuu/index.html",
    etiqueta: "Sectorial",
  },
  {
    titulo: "Atlas del Comercio Exterior",
    descripcion: "Socios, sectores y riesgo logístico del comercio exterior mexicano.",
    href: "/visores/atlas-comercio-exterior/index.html",
    etiqueta: "Atlas",
  },
  {
    titulo: "México y el mundo",
    descripcion: "Socios globales, saldo bilateral y lectura geoeconómica del comercio.",
    href: "/visores/comercio-mundo/index.html",
    etiqueta: "Comercio global",
  },
];

function convertirFechaAOrden(fecha: string) {
  const partes = fecha.split("/");
  if (partes.length !== 3) return 0;
  const [dia, mes, anio] = partes.map(Number);
  if (!dia || !mes || !anio) return 0;
  return new Date(anio, mes - 1, dia).getTime();
}

/* ─── SECTION HEADER ─── */
function EncabezadoSeccion({
  etiqueta,
  titulo,
  descripcion,
  href,
  cta,
}: {
  etiqueta: string;
  titulo: string;
  descripcion?: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${estilos.acento}`}>
          {etiqueta}
        </p>
        <MaskText
          el="h2"
          text={[titulo]}
          className={`mt-3 text-3xl tracking-tight md:text-4xl ${estilos.textoPrincipal}`}
        />
        {descripcion && (
          <p className={`mt-3 text-[15px] leading-7 ${estilos.textoSecundario}`}>
            {descripcion}
          </p>
        )}
      </div>
      <Link
        href={href}
        className={`group inline-flex items-center text-[13px] font-bold ${estilos.acento} shrink-0`}
      >
        {cta}
        <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

/* ─── HOMEPAGE ─── */
export default function HomePage() {
  const publicaciones = obtenerPublicaciones()
    .sort((a, b) => convertirFechaAOrden(b.fecha) - convertirFechaAOrden(a.fecha));
  const publicacionPrincipal = publicaciones[0];
  const publicacionesSecundarias = publicaciones.slice(1, 4);

  const datasetsDestacados = obtenerDatasets().slice(0, 3);
  const colaboradoresDestacados = colaboradores.filter((c) => c.destacado).slice(0, 3);

  const coyunturaItems = coyuntura.slice(0, 2);

  return (
    <div className="pb-0">
      {/* ═══ HERO IMMERSIVE (Awwwards Style) ═══ */}
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#000511] flex flex-col justify-end pt-32 pb-12 sm:pb-20 -mt-24 mb-16">
        {/* Backing Gradient for the Graph */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A1635] via-[#000511] to-[#000511]" />

        {/* Minimalist Architectural Grid Overlay */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none" />

        {/* Interactive Temporal Graph Layer (Nodes) */}
        <HeroTemporalGraph />

        {/* Foreground Overlays (Fades) */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/90 to-transparent z-[3] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000511] to-transparent z-[3] pointer-events-none" />

        {/* Foreground Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF204E] mb-6">
              Centro de investigación aplicada
            </p>

            <MaskText
              el="h2"
              text={["Instituto Mexicano de", "Estudios Globales"]}
              className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-serif)] text-white tracking-tight leading-[1.05] [&>div>div:nth-child(2)>div]:italic [&>div>div:nth-child(2)>div]:pr-4"
              delay={0.1}
            />

            <Reveal variant="fade-up" delay={0.4}>
              <p className="mt-8 text-lg sm:text-xl leading-relaxed text-white/60 max-w-xl">
                Geopolítica económica, comercio internacional y logística global.
                Datos, análisis y visualizaciones en español.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.6}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/publicaciones"
                  className="rounded-full bg-white px-8 py-4 text-[13px] font-bold text-[#000511] transition-transform hover:scale-105"
                >
                  Ver publicaciones
                </Link>
                <Link
                  href="/datos"
                  className="rounded-full border border-white/30 bg-[#000511]/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:bg-white hover:text-[#000511]"
                >
                  Explorar datasets
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Glassmorphism Stats */}
          <Reveal variant="fade-up" delay={0.8}>
            <div className="flex gap-4 sm:flex-col lg:flex-row lg:shrink-0 pb-4">
              {[
                { valor: "6", label: "Visores interactivos" },
                { valor: "10+", label: "Datasets estructurados" },
              ].map((stat) => (
                <div key={stat.label} className="backdrop-blur-2xl bg-[#FDFDFD]/5 border border-[#FDFDFD]/10 rounded-[2rem] p-7 sm:min-w-[170px] shadow-2xl transition-all hover:bg-[#FDFDFD]/10">
                  <p className="text-4xl font-regular text-white font-[family-name:var(--font-serif)]">{stat.valor}</p>
                  <p className="mt-3 text-[10px] font-bold text-white/50 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FEATURED PUBLICATION (Editorial Layout) ═══ */}
      {publicacionPrincipal && (
        <Reveal variant="fade-up">
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <EncabezadoSeccion
              etiqueta="Último análisis"
              titulo="Publicaciones"
              href="/publicaciones"
              cta="Ver todas"
            />

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              {/* Main featured */}
              <Link
                href={`/publicaciones/${publicacionPrincipal.slug}`}
                className={`group rounded-3xl border ${estilos.borde} bg-white p-8 lg:p-10 ${estilos.sombra} ${estilos.transicion} hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,34,77,0.06)]`}
              >
                <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${estilos.acento}`}>
                  {publicacionPrincipal.categoria}
                </p>
                <h3 className={`mt-4 text-2xl leading-snug tracking-tight lg:text-3xl ${estilos.textoPrincipal} group-hover:text-[#FF204E] ${estilos.transicion}`}>
                  {publicacionPrincipal.titulo}
                </h3>
                <p className={`mt-4 text-[15px] leading-7 ${estilos.textoSecundario} line-clamp-4`}>
                  {publicacionPrincipal.resumen}
                </p>
                <div className="mt-8 flex items-center gap-3 text-[12px]">
                  <span className={`font-bold ${estilos.textoPrincipal}`}>{publicacionPrincipal.autor}</span>
                  <span className={estilos.textoSuave}>·</span>
                  <span className={estilos.textoSuave}>{publicacionPrincipal.fecha}</span>
                </div>
              </Link>

              {/* Secondary list */}
              <div className="flex flex-col gap-4">
                {publicacionesSecundarias.map((pub) => (
                  <Link
                    key={pub.slug}
                    href={`/publicaciones/${pub.slug}`}
                    className={`group rounded-2xl border ${estilos.borde} bg-white p-6 ${estilos.sombra} ${estilos.transicion} hover:-translate-y-0.5 hover:border-[#FF204E]/20`}
                  >
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${estilos.acento}`}>
                      {pub.categoria}
                    </p>
                    <h4 className={`mt-2 text-base font-bold leading-snug ${estilos.textoPrincipal} group-hover:text-[#FF204E] ${estilos.transicion}`}>
                      {pub.titulo}
                    </h4>
                    <p className={`mt-2 text-[13px] ${estilos.textoSuave}`}>
                      {pub.autor} · {pub.fecha}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* ═══ VISORES INTERACTIVOS ═══ */}
      <Reveal variant="fade-up">
        <section className="bg-[#00224D]/[0.02] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <EncabezadoSeccion
              etiqueta="Visores"
              titulo="Mapas interactivos"
              descripcion="Visualizaciones para explorar comercio, logística y geopolítica económica."
              href="/mapas"
              cta="Ver todos"
            />

            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mapasInteractivos.slice(0, 3).map((mapa) => (
                <StaggerItem key={mapa.href}>
                  <a
                    href={mapa.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block rounded-2xl border ${estilos.borde} bg-white overflow-hidden ${estilos.sombra} ${estilos.transicion} hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,34,77,0.06)]`}
                  >
                    <div className="h-32 bg-gradient-to-br from-[#00224D]/4 via-[#FF204E]/3 to-transparent flex items-center justify-center">
                      <span className="text-3xl text-[#00224D]/8">↗</span>
                    </div>
                    <div className="p-5">
                      <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${estilos.acento}`}>
                        {mapa.etiqueta}
                      </p>
                      <h3 className={`mt-2 text-lg font-bold ${estilos.textoPrincipal}`}>
                        {mapa.titulo}
                      </h3>
                      <p className={`mt-2 text-[13px] leading-6 ${estilos.textoSecundario}`}>
                        {mapa.descripcion}
                      </p>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </Reveal>

      {/* ═══ COYUNTURA ═══ */}
      {coyunturaItems.length > 0 && (
        <Reveal variant="fade-up">
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <EncabezadoSeccion
              etiqueta="Coyuntura"
              titulo="Análisis de coyuntura"
              descripcion="Riesgos, comercio, logística y geopolítica en piezas breves y visuales."
              href="/mapas"
              cta="Ver tablero"
            />

            <StaggerContainer className="grid gap-6 lg:grid-cols-2">
              {coyunturaItems.map((item) => (
                <StaggerItem key={item.slug}>
                  <Link
                    href={item.href}
                    className={`group rounded-2xl border ${estilos.borde} bg-white p-7 ${estilos.sombra} ${estilos.transicion} hover:-translate-y-1 hover:border-[#FF204E]/20 block`}
                  >
                    <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${estilos.acento}`}>
                      {item.etiqueta}
                    </p>
                    <h3 className={`mt-3 text-xl font-bold tracking-tight ${estilos.textoPrincipal}`}>
                      {item.titulo}
                    </h3>
                    <p className={`mt-3 text-[14px] leading-7 ${estilos.textoSecundario}`}>
                      {item.resumen}
                    </p>

                    {item.metricas && item.metricas.length > 0 && (
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {item.metricas.map((m) => (
                          <div key={m.etiqueta} className={`rounded-xl border ${estilos.borde} bg-slate-50/50 p-3`}>
                            <p className={`text-[10px] font-bold uppercase ${estilos.textoSuave}`}>{m.etiqueta}</p>
                            <p className={`mt-1 text-sm font-bold ${estilos.textoPrincipal}`}>{m.valor}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-[12px] ${estilos.textoSuave}`}>{item.periodo}</span>
                      <span className={`text-[13px] font-bold ${estilos.acento}`}>Leer →</span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </Reveal>
      )}

      {/* ═══ DATASETS ═══ */}
      <Reveal variant="fade-up">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <EncabezadoSeccion
            etiqueta="Datos"
            titulo="Datasets"
            descripcion="Bases estructuradas para análisis aplicado y seguimiento de tendencias."
            href="/datos"
            cta="Explorar"
          />

          <StaggerContainer className="grid gap-5 md:grid-cols-3">
            {datasetsDestacados.map((dataset) => (
              <StaggerItem key={dataset.slug}>
                <Link
                  href={`/datos/${dataset.slug}`}
                  className={`group block rounded-2xl border ${estilos.borde} bg-white p-6 ${estilos.sombra} ${estilos.transicion} hover:-translate-y-1 hover:border-[#FF204E]/20 h-full`}
                >
                  <div className="h-0.5 w-10 rounded-full bg-[#FF204E] mb-5" />
                  <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${estilos.acento}`}>
                    Dataset
                  </p>
                  <h3 className={`mt-2 text-lg font-bold ${estilos.textoPrincipal}`}>
                    {dataset.titulo}
                  </h3>
                  <p className={`mt-3 text-[13px] leading-6 ${estilos.textoSecundario}`}>
                    {dataset.descripcion}
                  </p>
                  <p className="mt-5 text-[13px] font-bold text-[#FF204E]">
                    Ver dataset →
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </Reveal>

      {/* ═══ INSTITUTO (Compact) ═══ */}
      <Reveal variant="scale-up">
        <section className="bg-[#00224D] text-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF204E]">
                Institución
              </p>
              <MaskText
                el="h2"
                text={["Rigor analítico y", "pensamiento global"]}
                className="mt-4 text-3xl tracking-tight md:text-4xl text-white"
              />
              <p className="mt-5 text-[16px] leading-8 text-white/70">
                El IMEG produce, sistematiza y difunde análisis rigurosos sobre economía internacional, geopolítica económica y logística global, mediante investigación aplicada y herramientas analíticas accesibles en español.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-[13px] font-medium text-white/50">
                {["Transparencia de datos", "Independencia intelectual", "Rigor metodológico", "Acceso abierto"].map((p) => (
                  <span key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF204E]" />
                    {p}
                  </span>
                ))}
              </div>
              <Link
                href="/instituto"
                className="mt-8 inline-flex items-center text-[13px] font-bold text-[#FF204E] hover:underline underline-offset-4"
              >
                Conocer metodología y principios →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ═══ COLABORADORES ═══ */}
      <Reveal variant="fade-up">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <EncabezadoSeccion
            etiqueta="Red"
            titulo="Colaboradores"
            href="/colaboradores"
            cta="Ver todos"
          />

          <StaggerContainer className="grid gap-5 md:grid-cols-3">
            {colaboradoresDestacados.map((col) => (
              <StaggerItem key={col.slug}>
                <div className={`rounded-2xl border ${estilos.borde} bg-white p-6 ${estilos.sombra} ${estilos.transicion} hover:border-[#FF204E]/15`}>
                  <div className="h-0.5 w-10 rounded-full bg-[#FF204E] mb-4" />
                  <h3 className={`text-lg font-bold ${estilos.textoPrincipal}`}>
                    {col.nombre}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-[#FF204E]">
                    {col.rol}
                  </p>
                  <p className={`mt-3 text-[13px] leading-6 ${estilos.textoSecundario}`}>
                    {col.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </Reveal>
    </div>
  );
}