import type { MetadataRoute } from "next";
import { obtenerPublicaciones } from "@/lib/publicaciones-content";
import { obtenerDatasets } from "@/lib/datasets-content";
import { colaboradores } from "@/lib/colaboradores";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://imeg.mx";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/instituto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/publicaciones`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/datos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/mapas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/proyectos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/colaboradores`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const publicaciones = obtenerPublicaciones().map((pub) => ({
    url: `${baseUrl}/publicaciones/${pub.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const datasets = obtenerDatasets().map((ds) => ({
    url: `${baseUrl}/datos/${ds.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const colabs = colaboradores.map((c) => ({
    url: `${baseUrl}/colaboradores/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...publicaciones, ...datasets, ...colabs];
}
