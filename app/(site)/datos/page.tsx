import Link from "next/link";
import { obtenerDatasets } from "@/lib/datasets-content";

export default function DatosPage() {
  const datasets = obtenerDatasets();

  // 1. Centralización de estilos técnicos
  const estilos = {
    fondoSeccion: "bg-[#FDFDFD]",
    etiquetaAcento: "text-[#FF204E] text-sm uppercase tracking-[0.2em] font-bold",
    tituloPagina: "text-[#00224D] text-5xl font-semibold tracking-tight",
    descripcionPagina: "text-[#334155] text-lg leading-8",
    notaAclaratoria: "text-[#64748B] text-sm leading-7",
    
    // Tarjetas de Datasets
    cardFondo: "bg-white border-slate-200 shadow-sm",
    cardHover: "hover:border-[#FF204E]/40 hover:shadow-[0_20px_40px_rgba(0,34,77,0.06)]",
    cardCategoria: "text-[#FF204E] text-sm font-bold",
    cardTitulo: "text-[#00224D] text-2xl font-medium",
    cardResumen: "text-[#4A5568] text-sm leading-7",
    
    // Etiqueta de Estado (Privado/Público)
    badgePrivado: "bg-slate-100 border-slate-200 text-[#475569] px-3 py-1 rounded-full border text-xs font-semibold",
    
    // Call to action dentro de la card
    linkFicha: "text-[#00224D] font-bold text-sm group-hover:text-[#FF204E]",
    
    transicion: "transition-all duration-300 ease-out",
  };

  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 ${estilos.fondoSeccion}`}>
      <div className="max-w-3xl">
        <p className={estilos.etiquetaAcento}>
          Biblioteca técnica
        </p>
        <h1 className={`mt-4 ${estilos.tituloPagina}`}>
          Datasets
        </h1>
        <p className={`mt-6 ${estilos.descripcionPagina}`}>
          Repositorio de bases, fichas técnicas y recursos estructurados del Instituto Mexicano de Estudios Globales (IMEG).
        </p>
        <p className={`mt-4 ${estilos.notaAclaratoria}`}>
          Las fichas técnicas son públicas. El acceso a las bases completas está restringido por ahora a esquemas de colaboración, clientes o membresías futuras.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {datasets.map((dataset) => (
          <Link
            key={dataset.slug}
            href={`/datos/${dataset.slug}`}
            className={`group rounded-3xl border p-6 ${estilos.cardFondo} ${estilos.transicion} ${estilos.cardHover}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className={estilos.cardCategoria}>{dataset.categoria}</p>
              <span className={estilos.badgePrivado}>
                Privado
              </span>
            </div>

            <h2 className={`mt-3 ${estilos.cardTitulo}`}>
              {dataset.titulo}
            </h2>

            <p className={`mt-4 ${estilos.cardResumen}`}>
              {dataset.resumen}
            </p>

            <p className={`mt-6 ${estilos.linkFicha} ${estilos.transicion}`}>
              Ver ficha técnica →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}