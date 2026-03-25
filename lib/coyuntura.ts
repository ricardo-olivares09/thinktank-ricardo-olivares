export type ItemCoyuntura = {
  slug: string;
  etiqueta: string;
  titulo: string;
  resumen: string;
  periodo: string;
  metricas: { etiqueta: string; valor: string }[];
  bullets: string[];
  href: string;
};

export const coyuntura: ItemCoyuntura[] = [
  {
    slug: "choques-oferta",
    etiqueta: "México",
    titulo: "Choques de oferta y presión logística",
    resumen:
      "Seguimiento de bloqueos, clima, cierres logísticos y corredores presionados con una lectura breve para coyuntura económica.",
    periodo: "Actualizado a enero 2025",
    metricas: [
      { etiqueta: "Eventos", valor: "24" },
      { etiqueta: "Choque dominante", valor: "Bloqueos" },
      { etiqueta: "Corredor", valor: "Noreste" },
    ],
    bullets: [
      "Mayor presión en Tamaulipas y Nuevo León.",
      "El componente dominante fue bloqueo carretero.",
      "Útil para ligar con exportaciones, cruces y producción.",
    ],
    href: "/analisis/choques-oferta",
  },
  {
    slug: "geopolitica-logistica",
    etiqueta: "Geopolítica",
    titulo: "Chokepoints y riesgo marítimo",
    resumen:
      "Lectura rápida de arterias estratégicas del comercio global y su impacto potencial en energía, transporte y cadenas de suministro.",
    periodo: "Monitoreo continuo",
    metricas: [
      { etiqueta: "Foco", valor: "Ormuz" },
      { etiqueta: "Nivel", valor: "Alto" },
      { etiqueta: "Riesgo", valor: "Naval/energía" },
    ],
    bullets: [
      "Ormuz, Suez y Bab el-Mandeb concentran la mayor tensión.",
      "Sirve para anticipar choques en fletes, energía y tiempos.",
      "Conviene enlazarlo con petróleo y comercio mundial.",
    ],
    href: "/analisis/geopolitica-logistica",
  },
  {
    slug: "comercio-mx-eeuu",
    etiqueta: "América del Norte",
    titulo: "Comercio México–EE.UU. por ramas",
    resumen:
      "Vista editorial de los sectores con mayor peso exportador para identificar concentración, especialización y ramas líderes.",
    periodo: "Enero 2026",
    metricas: [
      { etiqueta: "Enfoque", valor: "Sectores" },
      { etiqueta: "Unidad", valor: "USD" },
      { etiqueta: "Lectura", valor: "Participación" },
    ],
    bullets: [
      "La visual original ya separa por rama productiva.",
      "Funciona mejor como tarjeta analítica que como mapa.",
      "Ideal para conectar con publicaciones y datasets.",
    ],
    href: "/analisis/comercio-mx-eeuu",
  },
  {
    slug: "energia-y-comercio",
    etiqueta: "Energía",
    titulo: "Petróleo y comercio con el mundo",
    resumen:
      "Lectura compacta sobre dependencia energética, origen de importaciones y vínculos comerciales de México con socios clave.",
    periodo: "2018–2026 / Ene 2026",
    metricas: [
      { etiqueta: "Petróleo", valor: "Volumen/share" },
      { etiqueta: "Origen líder", valor: "EE.UU." },
      { etiqueta: "Cobertura", valor: "Global" },
    ],
    bullets: [
      "El enfoque de petróleo ya permite comparar volumen y participación.",
      "La vista mundial se presta para saldo, magnitud y socios.",
      "Puedes separar energía de comercio general o mantenerlos juntos.",
    ],
    href: "/analisis/energia-y-comercio",
  },
];