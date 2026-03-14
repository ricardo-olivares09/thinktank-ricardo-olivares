export type Dataset = {
  titulo: string;
  slug: string;
  categoria: string;
  resumen: string;
  descripcion: string;
  fuente: string;
  frecuencia: string;
  cobertura: string;
  actualizacion: string;
  variables: string[];
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
    fuente: "Elaboración propia con datos del U.S. Census Bureau",
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
  },
  {
    titulo: "Eventos anómalos y choques logísticos",
    slug: "eventos-anomalos-y-choques-logisticos",
    categoria: "Logística global",
    resumen:
      "Registro de bloqueos, cierres fronterizos, eventos climáticos y disrupciones con impacto económico.",
    descripcion:
      "Registro de bloqueos, cierres fronterizos, eventos climáticos y disrupciones logísticas con impacto económico.",
    fuente: "Compilación hemerográfica y sistematización propia",
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
  },
  {
    titulo: "Infraestructura estratégica y nodos logísticos",
    slug: "infraestructura-estrategica-y-nodos-logisticos",
    categoria: "Infraestructura",
    resumen:
      "Inventario base de puertos, aduanas, corredores carreteros y nodos clave del comercio exterior.",
    descripcion:
      "Inventario base de puertos, aduanas, corredores carreteros y nodos estratégicos para el análisis territorial del comercio exterior.",
    fuente: "Fuentes públicas y elaboración propia",
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
  },
];