export default function MapasPage() {
  const mapas = [
    {
      titulo: "Flujos logísticos en México",
      resumen:
        "Corredores carreteros, aduanas, puertos y nodos clave de comercio exterior.",
    },
    {
      titulo: "Eventos anómalos",
      resumen:
        "Seguimiento geográfico de huracanes, incendios, bloqueos y choques con impacto económico.",
    },
    {
      titulo: "Comercio regional",
      resumen:
        "Capas por estado, cruces fronterizos y conexiones con cadenas productivas.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Visualización territorial
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
          Mapas
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Visualizaciones geográficas, mapas interactivos y análisis espacial
          sobre comercio, logística, infraestructura y riesgos.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mapas.map((mapa) => (
          <div
            key={mapa.titulo}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-cyan-300">Próximamente</p>
            <h2 className="mt-2 text-2xl font-medium text-white">
              {mapa.titulo}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {mapa.resumen}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}