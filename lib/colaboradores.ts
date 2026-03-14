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
    nombre: "Servicio Social · Mesa editorial",
    slug: "servicio-social-mesa-editorial",
    rol: "Apoyo editorial",
    tipo: "Interno",
    bio: "Apoya en carga de contenidos, revisión de estructura, edición básica y preparación de borradores.",
  },
  {
    nombre: "Servicio Social · Mesa de datos",
    slug: "servicio-social-mesa-de-datos",
    rol: "Apoyo en datos y visualización",
    tipo: "Interno",
    bio: "Apoya en bases, documentación, fichas técnicas y organización de recursos para análisis.",
  },
];