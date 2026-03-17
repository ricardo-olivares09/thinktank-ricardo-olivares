import Link from "next/link";
import { colaboradores } from "@/lib/colaboradores";

// Centralizamos los estilos para que sea fácil cambiarlos después
const estilos = {
  // Textos de cabecera
  subtituloSeccion: "text-[#FF204E] uppercase tracking-[0.2em] text-sm", // Antes era cyan-300
  tituloPrincipal: "text-[#00224D] text-5xl font-semibold tracking-tight",
  descripcionPrincipal: "text-[#334155] text-lg leading-8",

  // Tarjetas de colaboradores
  cardFondo: "bg-white",
  cardBorde: "border-slate-200",
  cardHover: "hover:border-[#FF204E]/40 hover:shadow-[0_20px_40px_rgba(0,34,77,0.06)]",
  
  // Textos dentro de la tarjeta
  tipoColaborador: "text-[#FF204E] text-sm font-bold", // Interno/Externo
  nombreColaborador: "text-[#00224D] text-2xl font-medium",
  rolColaborador: "text-[#FF204E] text-sm font-semibold", // El cargo que querías resaltar
  bioColaborador: "text-[#334155] text-sm leading-7",
  
  transicion: "transition-all duration-300 ease-out",
};

export default function ColaboradoresPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className={estilos.subtituloSeccion}>
          Red editorial
        </p>
        <h1 className={`mt-4 ${estilos.tituloPrincipal}`}>
          Colaboradores
        </h1>
        <p className={`mt-6 ${estilos.descripcionPrincipal}`}>
          Equipo editorial, apoyos de servicio social y colaboradores destacados
          del Instituto Mexicano de Estudios Globales.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {colaboradores.map((colaborador) => (
          <Link
            key={colaborador.slug}
            href={`/colaboradores/${colaborador.slug}`}
            className={`rounded-3xl border ${estilos.cardBorde} ${estilos.cardFondo} p-6 ${estilos.transicion} ${estilos.cardHover}`}
          >
            <p className={estilos.tipoColaborador}>{colaborador.tipo}</p>
            <h2 className={`mt-2 ${estilos.nombreColaborador}`}>
              {colaborador.nombre}
            </h2>
            <p className={`mt-3 ${estilos.rolColaborador}`}>{colaborador.rol}</p>
            <p className={`mt-4 ${estilos.bioColaborador}`}>
              {colaborador.bio}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}