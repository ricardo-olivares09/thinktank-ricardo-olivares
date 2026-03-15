import Link from "next/link";
import { colaboradores } from "@/lib/colaboradores";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";

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
        <h1 className="text-4xl font-semibold text-[#F3F0EA]">
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
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-[#2A4657] bg-[#102938] p-8">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[#C47A3A] text-2xl font-semibold text-white">
            {colaborador.nombre
              .split(" ")
              .slice(0, 2)
              .map((palabra) => palabra[0])
              .join("")}
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-[#C47A3A]">
            {colaborador.tipo}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#F3F0EA]">
            {colaborador.nombre}
          </h1>

          <p className="mt-3 text-lg text-[#8FA1AC]">{colaborador.rol}</p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#C47A3A]">
            Perfil
          </p>

          <p className="mt-6 text-lg leading-9 text-[#B8C2C8]">
            {colaborador.bio}
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-[#F3F0EA]">
              Publicaciones relacionadas
            </h2>

            {publicacionesRelacionadas.length === 0 ? (
              <p className="mt-4 text-[#8FA1AC]">
                Aún no hay publicaciones vinculadas a este perfil.
              </p>
            ) : (
              <div className="mt-6 grid gap-4">
                {publicacionesRelacionadas.map((pub) => (
                  <Link
                    key={pub.slug}
                    href={`/publicaciones/${pub.slug}`}
                    className="rounded-2xl border border-[#2A4657] bg-[#102938] p-5 transition hover:bg-[#16384C]"
                  >
                    <p className="text-sm text-[#C47A3A]">{pub.categoria}</p>
                    <h3 className="mt-2 text-xl font-medium text-[#F3F0EA]">
                      {pub.titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#B8C2C8]">
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