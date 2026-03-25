import { obtenerDatasetPorSlug } from "@/lib/datasets-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 1. Centralización de estilos técnicos y de color
const estilos = {
  fondoPagina: "bg-[#FDFDFD]",
  etiquetaAcento: "text-[#FF204E] text-sm uppercase tracking-[0.2em] font-bold",
  tituloDataset: "text-[#00224D] text-5xl font-semibold",
  descripcionPrincipal: "text-[#334155] text-lg leading-8",

  // Contenedores
  cardBlanca: "bg-white border-slate-200 shadow-sm",
  cardTitulos: "text-[#00224D] text-2xl font-semibold",
  cardTexto: "text-[#4A5568] leading-8",

  // Elementos de la Ficha Técnica (Sidebar)
  fichaEtiqueta: "text-slate-500 text-xs uppercase tracking-wider font-semibold",
  fichaValor: "text-[#334155] font-medium",

  // Bloques de Variables y Citas
  bloqueCodigo: "bg-slate-50 border-slate-100 text-[#334155] font-mono text-sm",

  // Botones y Badges
  badgeAcceso: "bg-slate-100 border-slate-200 text-[#475569] px-3 py-1 rounded-full border text-xs font-semibold",
  botonSolicitud: "w-full rounded-full border-2 border-[#FF204E] text-[#FF204E] font-bold py-3 transition-all hover:bg-[#FF204E] hover:text-white hover:shadow-lg hover:shadow-[#FF204E]/20",
};

export default async function DatasetPage({ params }: Props) {
  const { slug } = await params;
  const dataset = obtenerDatasetPorSlug(slug);

  if (!dataset) {
    return (
      <section className={`mx-auto max-w-4xl px-6 py-20 ${estilos.fondoPagina}`}>
        <h1 className="text-4xl font-semibold text-[#00224D]">
          Dataset no encontrado
        </h1>
      </section>
    );
  }

  const anioCita = "2026";
  const cita = `Instituto Mexicano de Estudios Globales (IMEG). (${anioCita}). ${dataset.titulo}. Base de datos derivada. Fuente primaria: ${dataset.fuentePrimaria}`;

  return (
    <section className={`mx-auto max-w-6xl px-6 py-20 ${estilos.fondoPagina}`}>
      <div className="flex flex-wrap items-center gap-3">
        <p className={estilos.etiquetaAcento}>
          {dataset.categoria}
        </p>
        <span className={estilos.badgeAcceso}>
          Acceso privado
        </span>
      </div>

      <h1 className={`mt-4 ${estilos.tituloDataset}`}>
        {dataset.titulo}
      </h1>

      <p className={`mt-6 max-w-3xl ${estilos.descripcionPrincipal}`}>
        {dataset.descripcion}
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">

          {/* VARIABLES */}
          <div className={`rounded-3xl border p-8 ${estilos.cardBlanca}`}>
            <h2 className={estilos.cardTitulos}>
              Variables del dataset
            </h2>
            <div className="mt-6 space-y-3">
              {dataset.variables.map((variable) => (
                <div
                  key={variable}
                  className={`rounded-xl border px-4 py-3 ${estilos.bloqueCodigo}`}
                >
                  {variable}
                </div>
              ))}
            </div>
          </div>

          {/* FUENTE */}
          <div className={`rounded-3xl border p-8 ${estilos.cardBlanca}`}>
            <h2 className={estilos.cardTitulos}>
              Fuente primaria
            </h2>
            <p className={`mt-4 ${estilos.cardTexto}`}>
              {dataset.fuentePrimaria}
            </p>
          </div>

          {/* METODOLOGÍA */}
          <div className={`rounded-3xl border p-8 ${estilos.cardBlanca}`}>
            <h2 className={estilos.cardTitulos}>
              Metodología y transformación IMEG
            </h2>
            <p className={`mt-4 ${estilos.cardTexto}`}>
              {dataset.metodologia}
            </p>
          </div>

          {/* CITAR */}
          <div className={`rounded-3xl border p-8 ${estilos.cardBlanca}`}>
            <h2 className={estilos.cardTitulos}>
              Cómo citar esta base
            </h2>
            <div className={`mt-4 rounded-2xl border p-4 italic ${estilos.bloqueCodigo}`}>
              {cita}
            </div>
          </div>
        </div>

        {/* SIDEBAR: FICHA TÉCNICA */}
        <div className={`h-fit rounded-3xl border p-8 sticky top-24 ${estilos.cardBlanca}`}>
          <h2 className={estilos.cardTitulos}>Ficha técnica</h2>

          <div className="mt-6 space-y-6">
            <div>
              <p className={estilos.fichaEtiqueta}>Frecuencia</p>
              <p className={estilos.fichaValor}>{dataset.frecuencia}</p>
            </div>

            <div>
              <p className={estilos.fichaEtiqueta}>Cobertura</p>
              <p className={estilos.fichaValor}>{dataset.cobertura}</p>
            </div>

            <div>
              <p className={estilos.fichaEtiqueta}>Última actualización</p>
              <p className={estilos.fichaValor}>{dataset.actualizacion}</p>
            </div>

            <div>
              <p className={estilos.fichaEtiqueta}>Acceso</p>
              <p className={estilos.fichaValor}>Disponible bajo acceso restringido.</p>
            </div>
          </div>

          <button className={`mt-8 ${estilos.botonSolicitud}`}>
            Solicitar acceso
          </button>
        </div>
      </div>
    </section>
  );
}