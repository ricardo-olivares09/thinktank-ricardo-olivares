import Link from "next/link";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";
import { obtenerDatasets } from "@/lib/datasets-content";
import { colaboradores } from "@/lib/colaboradores";
import { categorias } from "@/lib/categorias";
import { proyectos } from "@/lib/proyectos";

const estilos = {
  fondo: "bg-transparent",
  fondoGradiente: "",

  panel: "bg-[#0B2230]/72",
  panelSecundario: "bg-[#0D2634]/78",

  vidrio: "backdrop-blur-xl",

  borde: "border-[#2A4657]",
  bordeSuave: "border-white/5",
  bordeHover: "hover:border-[#D89A57]",

  textoPrincipal: "text-[#F3F0EA]",
  textoSecundario: "text-[#B8C2C8]",
  textoSuave: "text-[#8FA1AC]",

  acento: "text-[#D89A57]",
  acentoClaro: "text-[#E2B07A]",
  acentoSuave: "bg-[#D89A57]/10",
  acentoBorde: "border-[#D89A57]/30",

  hoverPanel: "hover:bg-[#102C3B]/88",

  sombra: "shadow-[0_24px_80px_rgba(0,0,0,0.28)]",

  brilloBronce:
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(135deg,rgba(216,154,87,0.10),transparent_35%,transparent_70%,rgba(216,154,87,0.06))] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100",

  transicion: "transition-all duration-300 ease-out",
  transicionLenta: "transition-all duration-500 ease-out",
};

function slugificar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p
          className={`text-xs font-medium uppercase tracking-[0.24em] ${estilos.acento} sm:text-sm`}
        >
          {etiqueta}
        </p>

        <h2
          className={`mt-3 text-3xl font-semibold tracking-tight ${estilos.textoPrincipal} sm:text-4xl`}
        >
          {titulo}
        </h2>

        {descripcion ? (
          <p
            className={`mt-4 text-sm leading-7 ${estilos.textoSecundario} sm:text-base sm:leading-8`}
          >
            {descripcion}
          </p>
        ) : null}
      </div>

      <Link
        href={href}
        className={`inline-flex w-fit items-center text-sm font-medium ${estilos.textoPrincipal} ${estilos.transicion} hover:translate-x-1 hover:text-[#D9A56B]`}
      >
        {cta}
      </Link>
    </div>
  );
}

export default function HomePage() {
  const menuPrincipal = [
    { etiqueta: "Inicio", href: "#inicio" },
    { etiqueta: "Líneas de trabajo", href: "#lineas" },
    { etiqueta: "Publicaciones", href: "#publicaciones" },
    { etiqueta: "Datasets", href: "#datasets" },
    { etiqueta: "Colaboradores", href: "#colaboradores" },
    { etiqueta: "Proyectos", href: "#proyectos" },
  ];

  const publicaciones = obtenerPublicaciones();
  const datasets = obtenerDatasets();

  const publicacionesDestacadas = publicaciones
    .filter((p) => p.destacada)
    .slice(0, 2);

  const datasetsDestacados = datasets.slice(0, 3);

  const colaboradoresDestacados = colaboradores
    .filter((c) => c.destacado)
    .slice(0, 3);

  const proyectosDestacados = proyectos.slice(0, 3);

  return (
    <div className={`${estilos.fondo} ${estilos.fondoGradiente} pb-20`}>
      <main>
        <section
          id="inicio"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pt-20"
        >
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-8">
            <div
              className={`relative overflow-hidden rounded-[28px] border ${estilos.borde} ${estilos.bordeSuave} ${estilos.panel} ${estilos.vidrio} ${estilos.sombra} p-6 ${estilos.transicionLenta} hover:-translate-y-1 sm:p-8 lg:p-10`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,132,58,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,74,94,0.26),transparent_28%)]" />

              <div className="relative z-10">
                <p
                  className={`text-xs font-medium uppercase tracking-[0.26em] ${estilos.acento} sm:text-sm`}
                >
                  Centro de análisis
                </p>

                <h1
                  className={`mt-4 max-w-5xl text-4xl font-semibold leading-tight tracking-tight ${estilos.textoPrincipal} sm:mt-5 sm:text-5xl lg:text-6xl xl:text-7xl`}
                >
                  Instituto Mexicano de Estudios Globales
                </h1>

                <p
                  className={`mt-6 max-w-3xl text-base leading-8 ${estilos.textoSecundario} sm:mt-8 sm:text-lg sm:leading-9`}
                >
                  Plataforma de análisis económico, geopolítica económica, comercio
                  internacional, logística global, datos, visualización y economía
                  ecológica.
                </p>

                <p
                  className={`mt-4 max-w-3xl text-sm leading-7 ${estilos.textoSecundario} sm:mt-6 sm:text-base sm:leading-8`}
                >
                  El proyecto busca reunir investigación aplicada, bases de datos,
                  fichas técnicas, mapas y publicaciones con enfoque analítico en
                  español.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/publicaciones"
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#D9A56B_0%,#C8843A_55%,#A96423_100%)] px-5 py-3 text-sm font-semibold text-[#081E26] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(200,132,58,0.25)] sm:px-6"
                  >
                    Ver publicaciones
                  </Link>

                  <Link
                    href="/datos"
                    className={`inline-flex items-center justify-center rounded-full border ${estilos.borde} ${estilos.panelSecundario} px-5 py-3 text-sm font-medium ${estilos.textoPrincipal} ${estilos.transicion} hover:border-[#C8843A]/50 hover:bg-[#173F4F] sm:px-6`}
                  >
                    Explorar datos
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
                  <div
                    className={`rounded-2xl border ${estilos.borde} bg-black/10 p-4 ${estilos.transicion} hover:border-[#C8843A]/45 hover:bg-white/[0.04]`}
                  >
                    <p
                      className={`text-xs uppercase tracking-[0.2em] ${estilos.textoSuave}`}
                    >
                      Enfoque
                    </p>
                    <p className={`mt-2 text-sm font-medium ${estilos.textoPrincipal}`}>
                      Análisis aplicado desde México
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border ${estilos.borde} bg-black/10 p-4 ${estilos.transicion} hover:border-[#C8843A]/45 hover:bg-white/[0.04]`}
                  >
                    <p
                      className={`text-xs uppercase tracking-[0.2em] ${estilos.textoSuave}`}
                    >
                      Formatos
                    </p>
                    <p className={`mt-2 text-sm font-medium ${estilos.textoPrincipal}`}>
                      Artículos, datasets y mapas
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border ${estilos.borde} bg-black/10 p-4 ${estilos.transicion} hover:border-[#C8843A]/45 hover:bg-white/[0.04]`}
                  >
                    <p
                      className={`text-xs uppercase tracking-[0.2em] ${estilos.textoSuave}`}
                    >
                      Propósito
                    </p>
                    <p className={`mt-2 text-sm font-medium ${estilos.textoPrincipal}`}>
                      Pensamiento crítico en español
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="lineas"
              className={`rounded-[28px] border ${estilos.borde} ${estilos.bordeSuave} ${estilos.panelSecundario} ${estilos.vidrio} ${estilos.sombra} p-6 scroll-mt-28 ${estilos.transicionLenta} hover:-translate-y-1 sm:p-8`}
            >
              <div className="flex items-center justify-between gap-4">
                <p
                  className={`text-xs font-medium uppercase tracking-[0.22em] ${estilos.acento} sm:text-sm`}
                >
                  Líneas de trabajo
                </p>

                <span
                  className={`rounded-full border ${estilos.acentoBorde} ${estilos.acentoSuave} px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${estilos.acento}`}
                >
                  IMEG
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {categorias.map((categoria) => (
                  <Link
                    key={categoria}
                    href={`/publicaciones?tema=${encodeURIComponent(slugificar(categoria))}`}
                    className={`rounded-2xl border ${estilos.borde} bg-black/10 px-4 py-3 text-sm leading-6 ${estilos.textoPrincipal} ${estilos.transicion} hover:translate-y-[-2px] hover:border-[#C8843A]/60 hover:bg-white/[0.04]`}
                    aria-label={`Ver contenido relacionado con ${categoria}`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{categoria}</span>
                      <span className={`${estilos.textoSuave} text-xs`}>
                        Explorar
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="publicaciones"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          <EncabezadoSeccion
            etiqueta="Biblioteca editorial"
            titulo="Publicaciones destacadas"
            href="/publicaciones"
            cta="Ver todas"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:gap-6">
            {publicacionesDestacadas.map((pub) => (
              <Link
                key={pub.slug}
                href={`/publicaciones/${pub.slug}`}
                className={`group relative overflow-hidden rounded-[28px] border ${estilos.borde} ${estilos.bordeSuave} ${estilos.panel} ${estilos.vidrio} p-5 ${estilos.transicionLenta} ${estilos.bordeHover} ${estilos.hoverPanel} ${estilos.brilloBronce} hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:p-6`}
              >
                <p className={`text-sm ${estilos.acento}`}>{pub.categoria}</p>
                <h3
                  className={`mt-2 text-xl font-medium ${estilos.textoPrincipal} sm:text-2xl`}
                >
                  {pub.titulo}
                </h3>
                <p
                  className={`mt-4 text-sm leading-7 ${estilos.textoSecundario}`}
                >
                  {pub.resumen}
                </p>
                <div
                  className={`mt-6 flex flex-wrap gap-3 text-sm ${estilos.textoSuave}`}
                >
                  <span>{pub.autor}</span>
                  <span>•</span>
                  <span>{pub.fecha}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="datasets"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          <EncabezadoSeccion
            etiqueta="Biblioteca técnica"
            titulo="Datasets del IMEG"
            descripcion="Las fichas técnicas son públicas. El acceso a las bases completas está restringido por ahora a esquemas de colaboración, clientes o membresías futuras."
            href="/datos"
            cta="Ver todos"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {datasetsDestacados.map((dataset) => (
              <Link
                key={dataset.slug}
                href={`/datos/${dataset.slug}`}
                className={`group relative overflow-hidden rounded-[28px] border ${estilos.borde} ${estilos.bordeSuave} ${estilos.panel} ${estilos.vidrio} p-5 ${estilos.transicionLenta} ${estilos.bordeHover} ${estilos.hoverPanel} ${estilos.brilloBronce} hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:p-6`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className={`text-sm ${estilos.acento}`}>{dataset.categoria}</p>
                  <span
                    className={`shrink-0 rounded-full border ${estilos.acentoBorde} ${estilos.acentoSuave} px-3 py-1 text-[11px] font-medium ${estilos.acento}`}
                  >
                    Privado
                  </span>
                </div>

                <h3
                  className={`mt-3 text-xl font-medium ${estilos.textoPrincipal} sm:text-2xl`}
                >
                  {dataset.titulo}
                </h3>

                <p
                  className={`mt-4 text-sm leading-7 ${estilos.textoSecundario}`}
                >
                  {dataset.resumen}
                </p>

                <div className={`mt-6 text-sm ${estilos.textoSuave}`}>
                  {dataset.frecuencia} · {dataset.cobertura}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="colaboradores"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          <EncabezadoSeccion
            etiqueta="Red editorial"
            titulo="Colaboradores destacados"
            href="/colaboradores"
            cta="Ver perfiles"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {colaboradoresDestacados.map((colaborador) => (
              <div
                key={colaborador.slug}
                className={`rounded-[28px] border ${estilos.borde} ${estilos.bordeSuave} ${estilos.panel} ${estilos.vidrio} p-5 ${estilos.transicionLenta} hover:-translate-y-1 hover:border-[#C8843A]/50 hover:bg-[#143744]/94 hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:p-6`}
              >
                <p className={`text-sm ${estilos.acento}`}>{colaborador.tipo}</p>
                <h3
                  className={`mt-2 text-xl font-medium ${estilos.textoPrincipal} sm:text-2xl`}
                >
                  {colaborador.nombre}
                </h3>
                <p className={`mt-3 text-sm ${estilos.textoSecundario}`}>
                  {colaborador.rol}
                </p>
                <p
                  className={`mt-4 text-sm leading-7 ${estilos.textoSecundario}`}
                >
                  {colaborador.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="proyectos"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          <EncabezadoSeccion
            etiqueta="Líneas de investigación"
            titulo="Proyectos"
            href="/proyectos"
            cta="Ver todos"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {proyectosDestacados.map((proyecto) => (
              <div
                key={proyecto.slug}
                className={`rounded-[28px] border ${estilos.borde} ${estilos.bordeSuave} ${estilos.panel} ${estilos.vidrio} p-5 ${estilos.transicionLenta} hover:-translate-y-1 hover:border-[#C8843A]/50 hover:bg-[#143744]/94 hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:p-6`}
              >
                <p className={`text-sm ${estilos.acento}`}>{proyecto.categoria}</p>
                <h3
                  className={`mt-2 text-xl font-medium ${estilos.textoPrincipal} sm:text-2xl`}
                >
                  {proyecto.titulo}
                </h3>
                <p
                  className={`mt-4 text-sm leading-7 ${estilos.textoSecundario}`}
                >
                  {proyecto.resumen}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <div
            className={`relative overflow-hidden rounded-[28px] border ${estilos.borde} ${estilos.bordeSuave} ${estilos.panel} ${estilos.vidrio} ${estilos.sombra} p-6 ${estilos.transicionLenta} hover:-translate-y-1 sm:p-8 md:p-10`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,132,58,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(20,74,94,0.16),transparent_28%)]" />

            <div className="relative z-10">
              <p
                className={`text-xs font-medium uppercase tracking-[0.22em] ${estilos.acento} sm:text-sm`}
              >
                Proyecto en construcción
              </p>

              <h2
                className={`mt-4 max-w-4xl text-3xl font-semibold tracking-tight ${estilos.textoPrincipal} sm:text-4xl`}
              >
                Un espacio para articular análisis, datos y pensamiento crítico en español.
              </h2>

              <p
                className={`mt-5 max-w-4xl text-base leading-8 ${estilos.textoSecundario} sm:mt-6 sm:text-lg`}
              >
                El Centro de Estudios Globales se construye como una plataforma abierta
                para publicar investigación aplicada, desarrollar recursos técnicos y
                vincular economía, territorio, geopolítica y sustentabilidad.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
