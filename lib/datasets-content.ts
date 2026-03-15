import fs from "fs";
import path from "path";

export type Dataset = {
  titulo: string;
  slug: string;
  categoria: string;
  resumen: string;
  descripcion: string;
  fuentePrimaria: string;
  metodologia: string;
  frecuencia: string;
  cobertura: string;
  actualizacion: string;
  variables: string[];
  visibilidad: "privado" | "publico";
};

const directorioDatasets = path.join(process.cwd(), "content/datasets");

export function obtenerDatasets(): Dataset[] {
  if (!fs.existsSync(directorioDatasets)) return [];

  const archivos = fs
    .readdirSync(directorioDatasets)
    .filter((archivo) => archivo.endsWith(".json"));

  return archivos.map((archivo) => {
    const rutaCompleta = path.join(directorioDatasets, archivo);
    const contenidoArchivo = fs.readFileSync(rutaCompleta, "utf8");
    return JSON.parse(contenidoArchivo) as Dataset;
  });
}

export function obtenerDatasetPorSlug(slug: string): Dataset | undefined {
  return obtenerDatasets().find((dataset) => dataset.slug === slug);
}