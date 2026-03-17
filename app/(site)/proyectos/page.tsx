import { proyectos } from "@/lib/proyectos";

export default function ProyectosPage() {
  // 1. Centralización de estilos para líneas de investigación
  const estilos = {
    fondoSeccion: "bg-[#FDFDFD]",
    etiquetaAcento: "text-[#FF204E] text-sm uppercase tracking-[0.2em] font-bold",
    tituloPagina: "text-[#00224D] text-5xl font-semibold tracking-tight",
    descripcionPagina: "text-[#334155] text-lg leading-8",
    
    // Tarjetas de Proyectos
    cardFondo: "bg-white border-slate-200 shadow-sm",
    cardCategoria: "text-[#FF204E] text-sm font-bold",
    cardTitulo: "text-[#00224D] text-2xl font-medium",
    cardResumen: "text-[#4A5568] text-sm leading-7",
    
    transicion: "transition-all duration-300 ease-out",
  };

  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 ${estilos.fondoSeccion}`}>
      <div className="max-w-3xl">
        <p className={estilos.etiquetaAcento}>
          Líneas de investigación
        </p>
        <h1 className={`mt-4 ${estilos.tituloPagina}`}>
          Proyectos
        </h1>
        <p className={`mt-6 ${estilos.descripcionPagina}`}>
          Los proyectos organizan el trabajo temático del Instituto Mexicano de Estudios
          Globales y agrupan publicaciones, recursos, datos y desarrollos
          relacionados.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.slug}
            className={`rounded-3xl border p-8 ${estilos.cardFondo} ${estilos.transicion} hover:border-[#FF204E]/40 hover:shadow-md`}
          >
            <p className={estilos.cardCategoria}>{proyecto.categoria}</p>
            <h2 className={`mt-2 ${estilos.cardTitulo}`}>
              {proyecto.titulo}
            </h2>
            <p className={`mt-4 ${estilos.cardResumen}`}>
              {proyecto.resumen}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}