export type Publicacion = {
  titulo: string;
  slug: string;
  categoria: string;
  autor: string;
  fecha: string;
  resumen: string;
  contenido: string[];
  destacada?: boolean;
};

export const publicaciones: Publicacion[] = [
  {
    titulo: "Nearshoring con evidencia",
    slug: "nearshoring-con-evidencia",
    categoria: "Comercio internacional",
    autor: "Ricardo Olivares",
    fecha: "14 de marzo de 2026",
    resumen:
      "Análisis aplicado para distinguir anuncios, reinversión y expansión efectiva en México.",
    contenido: [
      "El nearshoring se ha convertido en una de las narrativas económicas más repetidas en México, pero no todo anuncio de inversión implica capacidad instalada nueva ni expansión efectiva de la producción.",
      "Para evaluar el fenómeno con seriedad, es necesario distinguir entre anuncios, reinversión de utilidades, ampliaciones operativas y relocalización productiva auténtica.",
      "El Centro de Estudios Globales busca construir una lectura más precisa del proceso, vinculando comercio exterior, logística, capacidad industrial, geopolítica económica y evidencia territorial.",
    ],
    destacada: true,
  },
  {
    titulo: "Choques logísticos en México",
    slug: "choques-logisticos-en-mexico",
    categoria: "Logística global",
    autor: "Ricardo Olivares",
    fecha: "14 de marzo de 2026",
    resumen:
      "Bloqueos, cierres y eventos anómalos con impacto en producción y comercio.",
    contenido: [
      "Los choques logísticos no solo elevan costos: también alteran tiempos de entrega, reducen certidumbre operativa y afectan cadenas productivas completas.",
      "Bloqueos carreteros, cierres fronterizos, eventos climáticos y problemas de infraestructura pueden generar efectos visibles en exportaciones, producción y actividad regional.",
      "Una agenda de análisis aplicada debe medir estos eventos, clasificarlos y conectarlos con variables económicas observables.",
    ],
    destacada: true,
  },
];