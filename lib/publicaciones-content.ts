import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Publicacion = {
  titulo: string;
  slug: string;
  categoria: string;
  autor: string;
  fecha: string;
  resumen: string;
  destacada?: boolean;
  contenido: string;
};

const directorioPublicaciones = path.join(process.cwd(), "content/publicaciones");

export function obtenerPublicaciones(): Publicacion[] {
  if (!fs.existsSync(directorioPublicaciones)) return [];

  const archivos = fs
    .readdirSync(directorioPublicaciones)
    .filter((archivo) => archivo.endsWith(".md"));

  return archivos.map((archivo) => {
    const rutaCompleta = path.join(directorioPublicaciones, archivo);
    const contenidoArchivo = fs.readFileSync(rutaCompleta, "utf8");
    const { data, content } = matter(contenidoArchivo);

    return {
      titulo: data.titulo,
      slug: data.slug,
      categoria: data.categoria,
      autor: data.autor,
      fecha: data.fecha,
      resumen: data.resumen,
      destacada: data.destacada ?? false,
      contenido: content,
    };
  });
}

export function obtenerPublicacionPorSlug(slug: string): Publicacion | undefined {
  return obtenerPublicaciones().find((publicacion) => publicacion.slug === slug);
}