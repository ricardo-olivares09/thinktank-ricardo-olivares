import { colaboradores } from "@/lib/colaboradores";
import { publicaciones } from "@/lib/publicaciones";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ColaboradorIndividualPage({ params }: Props) {
  const { slug } = await params;
  const colaborador = colaboradores.find((c) => c.slug === slug);

  if (!colaborador) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-white">
          Colaborador no encontrado
        </h1>
      </section>
    );
  }

  const publicacionesRelacionadas = publicaciones.filter(
    (p) => p.autor === colaborador.nombre
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-cyan-400 text-2xl font-semibold text-slate-950">
            {colaborador.nombre
              .split(" ")
              .slice(0, 2)
              .map((palabra) => palabra[0])
              .join("")}
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-cyan-300">
            {colaborador.tipo}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            {colaborador.nombre}
          </h1>

          <p className="mt-3 text-lg text-slate-400">{colaborador.rol}</p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">
            Perfil
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-300">
            {colaborador.bio}
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white">
              Publicaciones relacionadas
            </h2>

            {publicacionesRelacionadas.length === 0 ? (
              <p className="mt-4 text-slate-400">
                Aún no hay publicaciones vinculadas a este perfil.
              </p>
            ) : (
              <div className="mt-6 grid gap-4">
                {publicacionesRelacionadas.map((pub) => (
                  <a
                    key={pub.slug}
                    href={`/publicaciones/${pub.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                  >
                    <p className="text-sm text-cyan-300">{pub.categoria}</p>
                    <h3 className="mt-2 text-xl font-medium text-white">
                      {pub.titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {pub.resumen}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}