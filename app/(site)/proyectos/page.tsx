import { proyectos } from "@/lib/proyectos";

export default function ProyectosPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Líneas de investigación
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
          Proyectos
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Los proyectos organizan el trabajo temático del Centro de Estudios
          Globales y agrupan publicaciones, recursos, datos y desarrollos
          relacionados.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.slug}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-cyan-300">{proyecto.categoria}</p>
            <h2 className="mt-2 text-2xl font-medium text-white">
              {proyecto.titulo}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {proyecto.resumen}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}