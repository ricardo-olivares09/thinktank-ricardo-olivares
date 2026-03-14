export type Proyecto = {
  titulo: string;
  slug: string;
  categoria: string;
  resumen: string;
};

export const proyectos: Proyecto[] = [
  {
    titulo: "Análisis macroeconómico aplicado",
    slug: "analisis-macroeconomico-aplicado",
    categoria: "Análisis económico",
    resumen:
      "Seguimiento de coyuntura, sector externo, actividad económica y relaciones macroeconómicas.",
  },
  {
    titulo: "Geopolítica económica y reconfiguración global",
    slug: "geopolitica-economica-y-reconfiguracion-global",
    categoria: "Geopolítica económica",
    resumen:
      "Análisis de tensiones internacionales, política industrial, cadenas estratégicas y rivalidad económica.",
  },
  {
    titulo: "Comercio internacional y nearshoring",
    slug: "comercio-internacional-y-nearshoring",
    categoria: "Comercio internacional",
    resumen:
      "Investigación sobre exportaciones, relocalización productiva, integración regional y cadenas globales.",
  },
  {
    titulo: "Logística global y choques de oferta",
    slug: "logistica-global-y-choques-de-oferta",
    categoria: "Logística global",
    resumen:
      "Mapeo y análisis de bloqueos, cierres, riesgos climáticos y disrupciones con impacto económico.",
  },
  {
    titulo: "Economía ecológica y territorio",
    slug: "economia-ecologica-y-territorio",
    categoria: "Economía ecológica",
    resumen:
      "Reflexiones y evidencia sobre metabolismo económico, sustentabilidad, comunidad y límites ecológicos.",
  },
];