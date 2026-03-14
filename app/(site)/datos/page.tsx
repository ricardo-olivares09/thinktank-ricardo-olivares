import Link from "next/link";
import { datasets } from "@/lib/datasets";

export default function DatosPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Biblioteca de datos
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
          Datos
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Bases, recursos descargables, fichas técnicas y conjuntos de datos del
          Centro de Estudios Globales.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {datasets.map((dataset) => (
          <Link
            key={dataset.slug}
            href={`/datos/${dataset.slug}`}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/20 hover:bg-white/10"
          >
            <p className="text-sm text-cyan-300">{dataset.categoria}</p>
            <h2 className="mt-2 text-2xl font-medium text-white">
              {dataset.titulo}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {dataset.resumen}
            </p>
            <p className="mt-6 text-sm font-medium text-white">
              Ver ficha técnica
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}