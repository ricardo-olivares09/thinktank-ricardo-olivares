export default function InstitutoPage() {
  const principios = [
    {
      titulo: "Rigor analítico",
      texto:
        "El trabajo del instituto se basa en evidencia empírica, transparencia metodológica y análisis crítico.",
    },
    {
      titulo: "Acceso al conocimiento",
      texto:
        "El IMEG promueve la difusión del conocimiento económico en español mediante publicaciones abiertas y recursos analíticos.",
    },
    {
      titulo: "Transparencia de fuentes",
      texto:
        "Todos los datasets y análisis documentan sus fuentes primarias y metodologías de transformación.",
    },
    {
      titulo: "Independencia intelectual",
      texto:
        "El instituto busca mantener autonomía analítica frente a intereses políticos o corporativos.",
    },
    {
      titulo: "Construcción de datos públicos",
      texto:
        "El desarrollo de bases de datos estructuradas es parte central del trabajo del instituto.",
    },
  ];

  const lineas = [
    "Análisis económico internacional",
    "Geopolítica económica",
    "Comercio internacional",
    "Logística global y choques de oferta",
    "Infraestructura estratégica",
    "Economía ecológica y territorio",
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Institución
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
          Instituto Mexicano de Estudios Globales
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          El IMEG es una plataforma de investigación aplicada dedicada al
          análisis de economía internacional, geopolítica económica, comercio,
          logística, datos y transformación del sistema global.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Misión</h2>
          <p className="mt-4 text-slate-300 leading-8">
            Producir, sistematizar y difundir análisis rigurosos sobre economía
            internacional, geopolítica económica, comercio, logística y
            transformación del sistema global, mediante investigación aplicada,
            construcción de bases de datos y desarrollo de herramientas
            analíticas accesibles en español.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Visión</h2>
          <p className="mt-4 text-slate-300 leading-8">
            Consolidarse como una plataforma de referencia en el mundo
            hispanohablante para el análisis de economía global, geopolítica
            económica y datos estructurados, articulando investigación,
            visualización y repositorios técnicos que faciliten la comprensión
            del sistema internacional y sus transformaciones.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold text-white">Modelo de trabajo</h2>
        <p className="mt-4 text-slate-300 leading-8">
          El IMEG desarrolla tres tipos principales de producción analítica:
          publicaciones, datasets y visualizaciones. Su trabajo integra
          investigación aplicada, estructuración de información y desarrollo de
          recursos analíticos en español.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold text-white">
          Líneas de investigación
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {lineas.map((linea) => (
            <div
              key={linea}
              className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-slate-300"
            >
              {linea}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold text-white">Principios</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {principios.map((principio) => (
            <div
              key={principio.titulo}
              className="rounded-2xl border border-white/10 bg-black/10 p-5"
            >
              <h3 className="text-lg font-medium text-white">
                {principio.titulo}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {principio.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold text-white">
          Política de datos
        </h2>
        <p className="mt-4 text-slate-300 leading-8">
          El IMEG desarrolla y mantiene bases de datos estructuradas derivadas
          de fuentes oficiales, registros públicos y compilaciones propias. Los
          datasets pueden clasificarse como públicos, derivados o privados. En
          todos los casos se documenta la fuente primaria y la metodología de
          transformación aplicada por el instituto.
        </p>
      </div>
    </section>
  );
}