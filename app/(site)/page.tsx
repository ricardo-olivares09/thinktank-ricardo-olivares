import Link from "next/link";
import { publicaciones } from "@/lib/publicaciones";
import { datasets } from "@/lib/datasets";
import { colaboradores } from "@/lib/colaboradores";
import { categorias } from "@/lib/categorias";
import { proyectos } from "@/lib/proyectos";

export default function HomePage() {
  const publicacionesDestacadas = publicaciones.filter((p) => p.destacada).slice(0, 2);
  const datasetsDestacados = datasets.slice(0, 3);
  const colaboradoresDestacados = colaboradores.filter((c) => c.destacado).slice(0, 3);
  const proyectosDestacados = proyectos.slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
              Centro de análisis
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
              Centro de Estudios Globales
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-9 text-slate-300">
              Plataforma de análisis económico, geopolítica económica, comercio
              internacional, logística global, datos, visualización y economía
              ecológica.
            </p>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400">
              El proyecto busca reunir investigación aplicada, bases de datos,
              fichas técnicas, mapas y publicaciones con enfoque analítico en
              español.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/publicaciones"
                className="rounded-full bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
              >
                Ver publicaciones
              </Link>

              <Link
                href="/datos"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Explorar datos
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Líneas de trabajo
            </p>

            <div className="mt-6 grid gap-3">
              {categorias.map((categoria) => (
                <div
                  key={categoria}
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-slate-200"
                >
                  {categoria}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Biblioteca editorial
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Publicaciones destacadas
            </h2>
          </div>

          <Link
            href="/publicaciones"
            className="text-sm font-medium text-white transition hover:text-cyan-300"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {publicacionesDestacadas.map((pub) => (
            <Link
              key={pub.slug}
              href={`/publicaciones/${pub.slug}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/20 hover:bg-white/10"
            >
              <p className="text-sm text-cyan-300">{pub.categoria}</p>
              <h3 className="mt-2 text-2xl font-medium text-white">
                {pub.titulo}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {pub.resumen}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
                <span>{pub.autor}</span>
                <span>•</span>
                <span>{pub.fecha}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Biblioteca técnica
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Datasets y recursos
            </h2>
          </div>

          <Link
            href="/datos"
            className="text-sm font-medium text-white transition hover:text-cyan-300"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {datasetsDestacados.map((dataset) => (
            <Link
              key={dataset.slug}
              href={`/datos/${dataset.slug}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/20 hover:bg-white/10"
            >
              <p className="text-sm text-cyan-300">{dataset.categoria}</p>
              <h3 className="mt-2 text-2xl font-medium text-white">
                {dataset.titulo}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {dataset.resumen}
              </p>
              <p className="mt-6 text-sm text-slate-500">
                {dataset.frecuencia} · {dataset.cobertura}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Red editorial
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Colaboradores destacados
            </h2>
          </div>

          <Link
            href="/colaboradores"
            className="text-sm font-medium text-white transition hover:text-cyan-300"
          >
            Ver perfiles
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {colaboradoresDestacados.map((colaborador) => (
            <div
              key={colaborador.slug}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm text-cyan-300">{colaborador.tipo}</p>
              <h3 className="mt-2 text-2xl font-medium text-white">
                {colaborador.nombre}
              </h3>
              <p className="mt-3 text-sm text-slate-400">{colaborador.rol}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {colaborador.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
  <div className="mb-10 flex items-end justify-between gap-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
        Líneas de investigación
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
        Proyectos
      </h2>
    </div>

    <Link
      href="/proyectos"
      className="text-sm font-medium text-white transition hover:text-cyan-300"
    >
      Ver todos
    </Link>
  </div>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {proyectosDestacados.map((proyecto) => (
      <div
        key={proyecto.slug}
        className="rounded-3xl border border-white/10 bg-white/5 p-6"
      >
        <p className="text-sm text-cyan-300">{proyecto.categoria}</p>
        <h3 className="mt-2 text-2xl font-medium text-white">
          {proyecto.titulo}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          {proyecto.resumen}
        </p>
      </div>
    ))}
  </div>
</section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Proyecto en construcción
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white">
            Un espacio para articular análisis, datos y pensamiento crítico en español.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            El Centro de Estudios Globales se construye como una plataforma
            abierta para publicar investigación aplicada, desarrollar recursos
            técnicos y vincular economía, territorio, geopolítica y sustentabilidad.
          </p>
        </div>
      </section>
    </div>
  );
}