import Link from "next/link";
import { colaboradores } from "@/lib/colaboradores";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 1. Centralización de colores y estilos
const estilos = {
  fondoSeccion: "bg-[#FDFDFD]",

  // Contenedor lateral (Avatar y Nombre)
  panelLateral: "bg-white border-slate-200 shadow-sm",
  avatarFondo: "bg-[#00224D]", // Azul profundo para el círculo de iniciales

  // Tipografía
  etiquetaAcento: "text-[#FF204E] uppercase tracking-[0.18em] text-sm font-bold",
  tituloNombre: "text-[#00224D] text-4xl font-semibold tracking-tight",
  subtituloRol: "text-[#FF204E] text-lg font-medium",
  textoBio: "text-[#334155] text-lg leading-9",
  tituloSecundario: "text-[#00224D] text-2xl font-semibold",

  // Tarjetas de publicaciones relacionadas
  cardPub: "bg-white border-slate-200 hover:border-[#FF204E]/40 hover:shadow-md",
  cardPubTitulo: "text-[#00224D] text-xl font-medium",
  cardPubResumen: "text-[#64748B] text-sm leading-7",

  transicion: "transition-all duration-300 ease-out",
};

export default async function ColaboradorIndividualPage({ params }: Props) {
  const { slug } = await params;
  const colaborador = colaboradores.find((c) => c.slug === slug);

  if (!colaborador) {
    return (
      <section className={`mx-auto max-w-4xl px-6 py-16 ${estilos.fondoSeccion}`}>
        <h1 className={`text-4xl font-semibold ${estilos.tituloNombre}`}>
          Colaborador no encontrado
        </h1>
      </section>
    );
  }

  const publicaciones = obtenerPublicaciones();
  const publicacionesRelacionadas = publicaciones.filter(
    (p) => p.autor === colaborador.nombre
  );

  return (
    <section className={`mx-auto max-w-6xl px-6 py-16 ${estilos.fondoSeccion}`}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

        {/* PANEL LATERAL: Perfil resumido */}
        <div className={`rounded-3xl border p-8 ${estilos.panelLateral}`}>
          <div className={`grid h-20 w-20 place-items-center rounded-2xl text-2xl font-semibold text-white ${estilos.avatarFondo}`}>
            {colaborador.nombre
              .split(" ")
              .slice(0, 2)
              .map((palabra) => palabra[0])
              .join("")}
          </div>

          <p className={`mt-6 ${estilos.etiquetaAcento}`}>
            {colaborador.tipo}
          </p>

          <h1 className={`mt-3 ${estilos.tituloNombre}`}>
            {colaborador.nombre}
          </h1>

          <p className={`mt-3 ${estilos.subtituloRol}`}>{colaborador.rol}</p>
        </div>

        {/* CONTENIDO: Bio y Publicaciones */}
        <div>
          <p className={estilos.etiquetaAcento}>
            Perfil
          </p>

          <p className={`mt-6 ${estilos.textoBio}`}>
            {colaborador.bio}
          </p>

          <div className="mt-12">
            <h2 className={estilos.tituloSecundario}>
              Publicaciones relacionadas
            </h2>

            {publicacionesRelacionadas.length === 0 ? (
              <p className="mt-4 text-[#94A3B8]">
                Aún no hay publicaciones vinculadas a este perfil.
              </p>
            ) : (
              <div className="mt-6 grid gap-4">
                {publicacionesRelacionadas.map((pub) => (
                  <Link
                    key={pub.slug}
                    href={`/publicaciones/${pub.slug}`}
                    className={`rounded-2xl border p-5 ${estilos.cardPub} ${estilos.transicion}`}
                  >
                    <p className={`text-sm font-bold ${estilos.etiquetaAcento.replace('text-sm', 'text-[11px]')}`}>
                      {pub.categoria}
                    </p>
                    <h3 className={`mt-2 ${estilos.cardPubTitulo}`}>
                      {pub.titulo}
                    </h3>
                    <p className={`mt-3 ${estilos.cardPubResumen}`}>
                      {pub.resumen}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}