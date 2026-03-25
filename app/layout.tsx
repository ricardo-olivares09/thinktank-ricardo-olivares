import "./globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imeg.mx"),
  title: {
    default: "IMEG — Instituto Mexicano de Estudios Globales",
    template: "%s | IMEG",
  },
  description:
    "Investigación aplicada en geopolítica económica, comercio internacional, logística global y economía ecológica. Datos, análisis y visualizaciones en español.",
  keywords: [
    "think tank México",
    "geopolítica económica",
    "comercio internacional",
    "economía global",
    "análisis geopolítico",
    "logística global",
    "economía ecológica",
    "IMEG",
    "Instituto Mexicano de Estudios Globales",
    "Mexican think tank",
    "international trade analysis",
    "geopolitical economy",
  ],
  authors: [{ name: "Ricardo Olivares", url: "https://imeg.mx" }],
  creator: "IMEG",
  publisher: "Instituto Mexicano de Estudios Globales",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://imeg.mx",
    siteName: "IMEG — Instituto Mexicano de Estudios Globales",
    title: "IMEG — Instituto Mexicano de Estudios Globales",
    description:
      "Investigación aplicada en geopolítica económica, comercio internacional, logística global y economía ecológica.",
    images: [
      {
        url: "/logo-imeg.png",
        width: 512,
        height: 512,
        alt: "Logo IMEG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMEG — Instituto Mexicano de Estudios Globales",
    description:
      "Investigación aplicada en geopolítica económica, comercio internacional y logística global.",
    images: ["/logo-imeg.png"],
  },
  alternates: {
    canonical: "https://imeg.mx",
  },
  other: {
    "msvalidate.01": "",
    "yandex-verification": "",
  },
};

import LenisScroll from "@/components/LenisScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Instituto Mexicano de Estudios Globales",
              alternateName: "IMEG",
              url: "https://imeg.mx",
              logo: "https://imeg.mx/logo-imeg.png",
              description:
                "Plataforma de investigación aplicada en geopolítica económica, comercio internacional, logística global y economía ecológica.",
              foundingDate: "2024",
              founder: {
                "@type": "Person",
                name: "Ricardo Olivares",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-[#00224D] antialiased font-[family-name:var(--font-sans)]">
        <LenisScroll>
          {children}
        </LenisScroll>
      </body>
    </html>
  );
}