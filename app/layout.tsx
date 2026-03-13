import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Think Tank Ricardo Olivares",
  description: "Economía, datos, sector externo y análisis aplicado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}