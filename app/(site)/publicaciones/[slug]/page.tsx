import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { obtenerPublicacionPorSlug } from "@/lib/publicaciones-content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const estilos = {
  fondoPagina: "bg-[#FDFDFD]",
  etiquetaCategoria:
    "text-[#FF204E] text-sm uppercase tracking-[0.2em] font-bold",
  tituloArticulo: "text-[#00224D] text-5xl font-semibold tracking-tight",
  metaDatos: "text-[#94A3B8] text-sm font-medium",
  autorNombre: "text-[#00224D]",
};

export default async function PublicacionIndividual({ params }: Props) {
  const { slug } = await params;
  const publicacion = obtenerPublicacionPorSlug(slug);

  if (!publicacion) {
    return (
      <section className={`mx-auto max-w-4xl px-6 py-16 ${estilos.fondoPagina}`}>
        <h1 className="text-4xl font-semibold text-[#00224D]">
          Publicación no encontrada
        </h1>
      </section>
    );
  }

  return (
    <article className={`mx-auto max-w-4xl px-6 py-16 ${estilos.fondoPagina}`}>
      <p className={estilos.etiquetaCategoria}>{publicacion.categoria}</p>

      <h1 className={`mt-4 ${estilos.tituloArticulo}`}>
        {publicacion.titulo}
      </h1>

      <div className={`mt-6 flex flex-wrap gap-4 ${estilos.metaDatos}`}>
        <span className={estilos.autorNombre}>{publicacion.autor}</span>
        <span>•</span>
        <span>{publicacion.fecha}</span>
      </div>

      <div className="mt-14">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <h1 className="mt-12 mb-6 text-4xl font-bold tracking-tight text-[#00224D]">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-14 mb-6 text-3xl font-bold leading-tight text-[#00224D]">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-10 mb-5 text-2xl font-bold leading-tight text-[#00224D]">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-7 text-justify text-lg leading-9 text-[#334155]">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="mb-7 list-disc space-y-2 pl-8 text-justify text-lg leading-9 text-[#334155]">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-7 list-decimal space-y-2 pl-8 text-justify text-lg leading-9 text-[#334155]">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="pl-1">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="font-extrabold text-[#00224D]">
                {children}
              </strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#FF204E] underline underline-offset-4 transition hover:text-[#A0153E]"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-8 rounded-r-xl border-l-4 border-[#FF204E] bg-slate-50 px-6 py-4 text-justify text-lg italic leading-9 text-[#334155]">
                {children}
              </blockquote>
            ),
            img: ({ src, alt }) => (
              <img
                src={src || ""}
                alt={alt || ""}
                className="my-10 rounded-3xl border border-slate-200"
              />
            ),
            hr: () => <hr className="my-10 border-slate-200" />,
          }}
        >
          {publicacion.contenido}
        </ReactMarkdown>
      </div>
    </article>
  );
}