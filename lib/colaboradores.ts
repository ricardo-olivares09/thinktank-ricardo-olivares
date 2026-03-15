export type Colaborador = {
  nombre: string;
  slug: string;
  rol: string;
  tipo: "Interno" | "Externo";
  bio: string;
  foto?: string;
  destacado?: boolean;
};

export const colaboradores: Colaborador[] = [
  {
    nombre: "Ricardo Olivares",
    slug: "ricardo-olivares",
    rol: "Director editorial",
    tipo: "Interno",
    bio: "Economista mexicano enfocado en comercio internacional, sector externo, logística, datos macroeconómicos y análisis aplicado.",
    destacado: true,
  },
  {
    nombre: "David Barkin",
    slug: "david-barkin",
    rol: "Colaborador destacado",
    tipo: "Externo",
    bio: "Académico reconocido por sus aportaciones en desarrollo, sustentabilidad, economía ecológica y crítica al modelo económico convencional.",
    destacado: true,
  },
  {
    nombre: "Carlos Silva",
    slug: "carlos-silva",
    rol: "Colaborador destacado",
    tipo: "Externo",
    bio: "Autor e investigador con trayectoria en divulgación histórica, análisis público y escritura aplicada.",
    destacado: true,
  },
  {
    nombre: "Colaboradores de investigación · Mesa editorial",
    slug: "colaboradores-investigacion-mesa-editorial",
    rol: "Colaboración editorial",
    tipo: "Interno",
    bio: "Apoyo en preparación de borradores, estructura de contenido, edición básica y revisión de materiales para publicación.",
  },
  {
    nombre: "Colaboradores de investigación · Mesa de datos",
    slug: "colaboradores-investigacion-mesa-datos",
    rol: "Colaboración en datos y visualización",
    tipo: "Interno",
    bio: "Apoyo en documentación de bases, fichas técnicas, organización de archivos y preparación de materiales de análisis.",
  },
];