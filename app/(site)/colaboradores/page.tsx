import Link from "next/link";
import { colaboradores } from "@/lib/colaboradores";

export default function ColaboradoresPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Red editorial
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
          Colaboradores
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Equipo editorial, apoyos de servicio social y colaboradores destacados
          del Centro de Estudios Globales.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {colaboradores.map((colaborador) => (
          <Link
            key={colaborador.slug}
            href={`/colaboradores/${colaborador.slug}`}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/20 hover:bg-white/10"
          >
            <p className="text-sm text-cyan-300">{colaborador.tipo}</p>
            <h2 className="mt-2 text-2xl font-medium text-white">
              {colaborador.nombre}
            </h2>
            <p className="mt-3 text-sm text-slate-400">{colaborador.rol}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {colaborador.bio}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}