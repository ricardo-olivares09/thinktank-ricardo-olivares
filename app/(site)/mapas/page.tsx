export default function MapasPage() {
  // 1. Centralización de estilos para visualización territorial
  const estilos = {
    fondoSeccion: "bg-[#FDFDFD]",
    etiquetaAcento: "text-[#FF204E] text-sm uppercase tracking-[0.2em] font-bold",
    tituloPagina: "text-[#00224D] text-5xl font-semibold tracking-tight",
    descripcionPagina: "text-[#334155] text-lg leading-8",
    
    // Tarjetas de Mapas
    cardFondo: "bg-white border-slate-200 shadow-sm",
    cardEstado: "text-[#FF204E] text-xs font-bold uppercase tracking-widest", // Para el "Próximamente"
    cardTitulo: "text-[#00224D] text-2xl font-medium",
    cardResumen: "text-[#4A5568] text-sm leading-7",
    
    // Decoración (opcional: un gradiente muy sutil para simular capas de mapa)
    decoracion: "bg-gradient-to-br from-[#00224D]/5 to-transparent",
  };

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
    <section className={`mx-auto max-w-7xl px-6 py-16 ${estilos.fondoSeccion}`}>
      <div className="max-w-3xl">
        <p className={estilos.etiquetaAcento}>
          Visualización territorial
        </p>
        <h1 className={`mt-4 ${estilos.tituloPagina}`}>
          Mapas
        </h1>
        <p className={`mt-6 ${estilos.descripcionPagina}`}>
          Visualizaciones geográficas, mapas interactivos y análisis espacial
          sobre comercio, logística, infraestructura y riesgos.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mapas.map((mapa) => (
          <div
            key={mapa.titulo}
            className={`rounded-3xl border p-8 ${estilos.cardFondo} ${estilos.decoracion}`}
          >
            <p className={estilos.cardEstado}>Próximamente</p>
            <h2 className={`mt-2 ${estilos.cardTitulo}`}>
              {mapa.titulo}
            </h2>
            <p className={`mt-4 ${estilos.cardResumen}`}>
              {mapa.resumen}
            </p>
            
            {/* Un pequeño detalle visual: un icono o placeholder de mapa */}
            <div className="mt-8 h-1 w-12 bg-[#FF204E]/20 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}