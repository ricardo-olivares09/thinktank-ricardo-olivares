export default function InstitutoPage() {
  // 1. Centralización de estilos (Fácil de modificar en el futuro)
  const estilos = {
    fondoSeccion: "bg-[#FDFDFD]",
    etiquetaAcento: "text-[#FF204E] text-sm uppercase tracking-[0.2em] font-bold",
    tituloPrincipal: "text-[#00224D] text-5xl font-semibold tracking-tight",
    descripcionPrincipal: "text-[#334155] text-lg leading-8",
    
    // Contenedores (Cards)
    cardFondo: "bg-white border-slate-200 shadow-sm",
    cardTitulo: "text-[#00224D] text-2xl font-semibold",
    cardTexto: "text-[#4A5568] leading-8",
    
    // Bloques secundarios (Líneas y Principios)
    bloqueSecundario: "bg-slate-50 border-slate-100 text-[#334155]",
    principioTitulo: "text-[#00224D] text-lg font-bold",
    principioTexto: "text-[#5D6679] text-sm leading-7",
  };

  const principios = [
    {
      titulo: "Rigor analítico",
      texto: "El trabajo del instituto se basa en evidencia empírica, transparencia metodológica y análisis crítico.",
    },
    {
      titulo: "Acceso al conocimiento",
      texto: "El IMEG promueve la difusión del conocimiento económico en español mediante publicaciones abiertas y recursos analíticos.",
    },
    {
      titulo: "Transparencia de fuentes",
      texto: "Todos los datasets y análisis documentan sus fuentes primarias y metodologías de transformación.",
    },
    {
      titulo: "Independencia intelectual",
      texto: "El instituto busca mantener autonomía analítica frente a intereses políticos o corporativos.",
    },
    {
      titulo: "Construcción de datos públicos",
      texto: "El desarrollo de bases de datos estructuradas es parte central del trabajo del instituto.",
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
    <section className={`mx-auto max-w-7xl px-6 py-16 ${estilos.fondoSeccion}`}>
      <div className="max-w-4xl">
        <p className={estilos.etiquetaAcento}>
          Institución
        </p>
        <h1 className={`mt-4 ${estilos.tituloPrincipal}`}>
          Instituto Mexicano de Estudios Globales
        </h1>
        <p className={`mt-6 ${estilos.descripcionPrincipal}`}>
          El IMEG es una plataforma de investigación aplicada dedicada al
          análisis de economía internacional, geopolítica económica, comercio,
          logística, datos y transformación del sistema global.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className={`rounded-3xl border p-8 ${estilos.cardFondo}`}>
          <h2 className={estilos.cardTitulo}>Misión</h2>
          <p className={`mt-4 ${estilos.cardTexto}`}>
            Producir, sistematizar y difundir análisis rigurosos sobre economía
            internacional, geopolítica económica, comercio, logística y
            transformación del sistema global, mediante investigación aplicada,
            construcción de bases de datos y desarrollo de herramientas
            analíticas accesibles en español.
          </p>
        </div>

        <div className={`rounded-3xl border p-8 ${estilos.cardFondo}`}>
          <h2 className={estilos.cardTitulo}>Visión</h2>
          <p className={`mt-4 ${estilos.cardTexto}`}>
            Consolidarse como una plataforma de referencia en el mundo
            hispanohablante para el análisis de economía global, geopolítica
            económica y datos estructurados, articulando investigación,
            visualización y repositorios técnicos que faciliten la comprensión
            del sistema internacional y sus transformaciones.
          </p>
        </div>
      </div>

      <div className={`mt-8 rounded-3xl border p-8 ${estilos.cardFondo}`}>
        <h2 className={estilos.cardTitulo}>Modelo de trabajo</h2>
        <p className={`mt-4 ${estilos.cardTexto}`}>
          El IMEG desarrolla tres tipos principales de producción analítica:
          publicaciones, datasets y visualizaciones. Su trabajo integra
          investigación aplicada, estructuración de información y desarrollo de
          recursos analíticos en español.
        </p>
      </div>

      <div className={`mt-8 rounded-3xl border p-8 ${estilos.cardFondo}`}>
        <h2 className={estilos.cardTitulo}>Líneas de investigación</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {lineas.map((linea) => (
            <div
              key={linea}
              className={`rounded-2xl border px-4 py-3 font-medium ${estilos.bloqueSecundario}`}
            >
              {linea}
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-8 rounded-3xl border p-8 ${estilos.cardFondo}`}>
        <h2 className={estilos.cardTitulo}>Principios</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {principios.map((principio) => (
            <div
              key={principio.titulo}
              className={`rounded-2xl border p-5 ${estilos.bloqueSecundario}`}
            >
              <h3 className={estilos.principioTitulo}>
                {principio.titulo}
              </h3>
              <p className={`mt-3 ${estilos.principioTexto}`}>
                {principio.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-8 rounded-3xl border p-8 ${estilos.cardFondo}`}>
        <h2 className={estilos.cardTitulo}>Política de datos</h2>
        <p className={`mt-4 ${estilos.cardTexto}`}>
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