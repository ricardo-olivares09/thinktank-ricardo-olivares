import Link from "next/link";
import { obtenerDatasets } from "@/lib/datasets-content";

export default function DatosPage() {
  const datasets = obtenerDatasets();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Biblioteca técnica
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
          Datasets
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Repositorio de bases, fichas técnicas y recursos estructurados del Instituto Mexicano de Estudios Globales (IMEG).
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          Las fichas técnicas son públicas. El acceso a las bases completas está restringido por ahora a esquemas de colaboración, clientes o membresías futuras.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {datasets.map((dataset) => (
          <Link
            key={dataset.slug}
            href={`/datos/${dataset.slug}`}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/20 hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-cyan-300">{dataset.categoria}</p>
              <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                Privado
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-medium text-white">
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