import { obtenerDatasetPorSlug } from "@/lib/datasets-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DatasetPage({ params }: Props) {
  const { slug } = await params;
  const dataset = obtenerDatasetPorSlug(slug);

  if (!dataset) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-semibold text-white">
          Dataset no encontrado
        </h1>
      </section>
    );
  }

  const anioCita = "2026";
  const cita = `Instituto Mexicano de Estudios Globales (IMEG). (${anioCita}). ${dataset.titulo}. Base de datos derivada. Fuente primaria: ${dataset.fuentePrimaria}`;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
          {dataset.categoria}
        </p>
        <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
          Acceso privado
        </span>
      </div>

      <h1 className="mt-4 text-5xl font-semibold text-white">
        {dataset.titulo}
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
        {dataset.descripcion}
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">
              Variables del dataset
            </h2>

            <div className="mt-6 space-y-3">
              {dataset.variables.map((variable) => (
                <div
                  key={variable}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-300"
                >
                  {variable}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">
              Fuente primaria
            </h2>
            <p className="mt-4 text-slate-300 leading-8">
              {dataset.fuentePrimaria}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">
              Metodología y transformación IMEG
            </h2>
            <p className="mt-4 text-slate-300 leading-8">
              {dataset.metodologia}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">
              Cómo citar esta base
            </h2>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-slate-300 leading-8">
              {cita}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Ficha técnica</h2>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-500">Frecuencia</p>
              <p>{dataset.frecuencia}</p>
            </div>

            <div>
              <p className="text-slate-500">Cobertura</p>
              <p>{dataset.cobertura}</p>
            </div>

            <div>
              <p className="text-slate-500">Última actualización</p>
              <p>{dataset.actualizacion}</p>
            </div>

            <div>
              <p className="text-slate-500">Acceso</p>
              <p>Disponible bajo acceso restringido.</p>
            </div>
          </div>

          <button className="mt-8 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10">
            Solicitar acceso
          </button>
        </div>
      </div>
    </section>
  );
}