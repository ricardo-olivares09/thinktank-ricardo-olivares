import Link from "next/link";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";

export default function PublicacionesPage() {
  const publicaciones = obtenerPublicaciones();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Biblioteca editorial
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
          Publicaciones
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Análisis, notas y piezas editoriales del Instituto Mexicano de Estudios Globales.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {publicaciones.map((pub) => (
          <Link
            key={pub.slug}
            href={`/publicaciones/${pub.slug}`}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/20 hover:bg-white/10"
          >
            <p className="text-sm text-cyan-300">{pub.categoria}</p>
            <h2 className="mt-2 text-2xl font-medium text-white">
              {pub.titulo}
            </h2>
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
  );
}