import Link from "next/link";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";

const estilos = {
  fondo: "bg-[#F8FAFC]",
  textoPrincipal: "text-[#00224D]",
  textoSecundario: "text-[#334155]",
  acento: "text-[#FF204E]",
  cardFondo: "bg-white",
  cardHover: "hover:shadow-[0_20px_50px_rgba(0,34,77,0.08)] hover:-translate-y-1",
  transicion: "transition-all duration-300 ease-out",
  borde: "border-[#00224D]/5",
};

export default function PublicacionesPage() {
  const publicaciones = obtenerPublicaciones();

  return (
    <main className={`min-h-screen ${estilos.fondo} pb-20 pt-12`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p
            className={`text-xs font-bold uppercase tracking-[0.3em] ${estilos.acento}`}
          >
            Biblioteca de Análisis
          </p>

          <h1
            className={`mt-4 text-5xl font-bold tracking-tight ${estilos.textoPrincipal}`}
          >
            Publicaciones
          </h1>

          <p className={`mt-6 text-lg leading-8 ${estilos.textoSecundario}`}>
            Investigación aplicada sobre geopolítica, economía ecológica y las
            transformaciones del sistema global en 2026.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {publicaciones.map((pub, index) => (
            <Link
              key={`${pub.slug}-${index}`}
              href={`/publicaciones/${pub.slug}`}
              className={`group relative flex flex-col rounded-[32px] border p-8 shadow-sm ${estilos.cardFondo} ${estilos.borde} ${estilos.transicion} ${estilos.cardHover}`}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`text-xs font-black uppercase tracking-widest ${estilos.acento}`}
                  >
                    {pub.categoria}
                  </span>

                  <span className="text-[10px] font-medium text-slate-400">
                    {pub.fecha}
                  </span>
                </div>

                <h2
                  className={`mt-4 text-2xl font-bold leading-tight ${estilos.textoPrincipal} ${estilos.transicion} group-hover:text-[#FF204E]`}
                >
                  {pub.titulo}
                </h2>

                <p
                  className={`mt-4 flex-grow text-sm line-clamp-3 leading-7 ${estilos.textoSecundario}`}
                >
                  {pub.resumen}
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-xs font-bold italic text-[#00224D]/60">
                    Por {pub.autor}
                  </span>

                  <span
                    className={`text-xs font-bold ${estilos.acento} transform opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 ${estilos.transicion}`}
                  >
                    Leer análisis →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {publicaciones.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-slate-400">
              No se encontraron publicaciones disponibles.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}