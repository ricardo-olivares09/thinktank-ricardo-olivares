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

export const datasets: Dataset[] = [
  {
    titulo: "Exportaciones México-Estados Unidos por sector",
    slug: "exportaciones-mexico-estados-unidos-por-sector",
    categoria: "Comercio internacional",
    resumen:
      "Base estructurada para analizar exportaciones mexicanas hacia EE.UU. por sector y periodo.",
    descripcion:
      "Base estructurada para analizar exportaciones mexicanas hacia Estados Unidos por sector, periodo y dinámica comercial.",
    fuentePrimaria:
      "U.S. Census Bureau. Base de comercio internacional de exportaciones.",
    metodologia:
      "Datos descargados, filtrados, estructurados y homologados por el Instituto Mexicano de Estudios Globales (IMEG).",
    frecuencia: "Mensual",
    cobertura: "México / Estados Unidos",
    actualizacion: "Marzo 2026",
    variables: [
      "Periodo",
      "Sector",
      "Valor exportado",
      "Variación anual",
      "Participación porcentual",
    ],
    visibilidad: "privado",
  },
  {
    titulo: "Eventos anómalos y choques logísticos",
    slug: "eventos-anomalos-y-choques-logisticos",
    categoria: "Logística global",
    resumen:
      "Registro de bloqueos, cierres fronterizos, eventos climáticos y disrupciones con impacto económico.",
    descripcion:
      "Registro de bloqueos, cierres fronterizos, eventos climáticos y disrupciones logísticas con impacto económico.",
    fuentePrimaria:
      "Compilación hemerográfica con fuentes públicas nacionales y regionales.",
    metodologia:
      "Base construida, clasificada y depurada por el Instituto Mexicano de Estudios Globales (IMEG).",
    frecuencia: "Mensual",
    cobertura: "México",
    actualizacion: "Marzo 2026",
    variables: [
      "Fecha",
      "Entidad",
      "Tipo de evento",
      "Duración",
      "Severidad",
      "Afectación estimada",
    ],
    visibilidad: "privado",
  },
  {
    titulo: "Infraestructura estratégica y nodos logísticos",
    slug: "infraestructura-estrategica-y-nodos-logisticos",
    categoria: "Infraestructura",
    resumen:
      "Inventario base de puertos, aduanas, corredores carreteros y nodos clave del comercio exterior.",
    descripcion:
      "Inventario base de puertos, aduanas, corredores carreteros y nodos estratégicos para el análisis territorial del comercio exterior.",
    fuentePrimaria:
      "Fuentes públicas oficiales, cartografía institucional y registros de infraestructura.",
    metodologia:
      "Información compilada, organizada y sistematizada por el Instituto Mexicano de Estudios Globales (IMEG).",
    frecuencia: "Actualización periódica",
    cobertura: "México",
    actualizacion: "Marzo 2026",
    variables: [
      "Nombre del nodo",
      "Tipo de infraestructura",
      "Entidad",
      "Coordenadas",
      "Función logística",
    ],
    visibilidad: "privado",
  },
];