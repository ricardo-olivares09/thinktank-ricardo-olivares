import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centro de Estudios Globales",
  description:
    "Plataforma de análisis económico, geopolítica económica, comercio internacional, logística global y datos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}