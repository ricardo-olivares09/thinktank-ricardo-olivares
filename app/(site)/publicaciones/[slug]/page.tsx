import ReactMarkdown from "react-markdown";
import { obtenerPublicacionPorSlug } from "@/lib/publicaciones-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PublicacionIndividual({ params }: Props) {
  const { slug } = await params;
  const publicacion = obtenerPublicacionPorSlug(slug);

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

      <div className="prose prose-invert mt-12 max-w-none prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-img:rounded-2xl prose-img:border prose-img:border-white/10">
        <ReactMarkdown>{publicacion.contenido}</ReactMarkdown>
      </div>
    </article>
  );
}