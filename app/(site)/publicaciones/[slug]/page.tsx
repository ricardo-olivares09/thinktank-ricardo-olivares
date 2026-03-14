import { publicaciones } from "@/lib/publicaciones";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PublicacionIndividual({ params }: Props) {
  const { slug } = await params;
  const publicacion = publicaciones.find((p) => p.slug === slug);

  if (!publicacion) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-white">
          Publicación no encontrada
        </h1>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
        {publicacion.categoria}
      </p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
        {publicacion.titulo}
      </h1>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
        <span>{publicacion.autor}</span>
        <span>•</span>
        <span>{publicacion.fecha}</span>
      </div>

      <div className="mt-12 space-y-6 text-lg leading-9 text-slate-300">
        {publicacion.contenido.map((parrafo, index) => (
          <p key={index}>{parrafo}</p>
        ))}
      </div>
    </article>
  );
}