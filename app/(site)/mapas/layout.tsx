import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapas interactivos",
  description: "Visores interactivos para explorar comercio, logística y geopolítica económica. Choques de oferta, chokepoints, atlas comercial y más.",
  openGraph: { title: "Mapas interactivos | IMEG", description: "Visores interactivos de comercio y geopolítica del IMEG." },
};

export default function MapasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
