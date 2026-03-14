import { datasets } from "@/lib/datasets";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DatasetPage({ params }: Props) {
  const { slug } = await params;
  const dataset = datasets.find((d) => d.slug === slug);

  if (!dataset) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-semibold text-white">
          Dataset no encontrado
        </h1>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
        {dataset.categoria}
      </p>

      <h1 className="mt-4 text-5xl font-semibold text-white">
        {dataset.titulo}
      </h1>

      <p className="mt-6 max-w-3xl text-lg text-slate-300">
        {dataset.descripcion}
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
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
          <h2 className="text-2xl font-semibold text-white">Ficha técnica</h2>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-500">Fuente</p>
              <p>{dataset.fuente}</p>
            </div>

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
          </div>

          <button className="mt-8 w-full rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200">
            Descargar dataset
          </button>
        </div>
      </div>
    </section>
  );
}