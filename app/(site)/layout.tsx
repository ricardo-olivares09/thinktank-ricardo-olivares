"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/instituto", label: "Instituto" },
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/datos", label: "Datos" },
  { href: "/mapas", label: "Mapas" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/colaboradores", label: "Colaboradores" },
];

const footerLinks = {
  institucion: [
    { href: "/instituto", label: "Acerca del IMEG" },
    { href: "/colaboradores", label: "Colaboradores" },
    { href: "/proyectos", label: "Líneas de investigación" },
  ],
  investigacion: [
    { href: "/publicaciones", label: "Publicaciones" },
    { href: "/datos", label: "Datasets" },
    { href: "/mapas", label: "Visores interactivos" },
  ],
  recursos: [
    { href: "/visores/choques/index.html", label: "Choques de oferta", ext: true },
    { href: "/visores/chokepoints-geopoliticos/index.html", label: "Chokepoints", ext: true },
    { href: "/visores/atlas-comercio-exterior/index.html", label: "Atlas comercial", ext: true },
  ],
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#4A5568] flex flex-col font-[family-name:var(--font-sans)] overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-50 bg-[radial-gradient(ellipse_at_top,rgba(0,34,77,0.02),transparent_60%)]" />

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/85 backdrop-blur-xl border-b border-[#00224D]/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-3 transition-opacity duration-300 ${menuAbierto ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <img src="/logo-imeg.png" alt="Logo IMEG" className="h-8 w-auto" />
            <div className="hidden sm:block">
              <p className="text-[11px] font-bold text-[#00224D] leading-tight uppercase tracking-[0.08em]">
                Instituto Mexicano
              </p>
              <p className="text-[10px] text-[#64748B] leading-tight tracking-[0.06em]">
                de Estudios Globales
              </p>
            </div>
          </Link>

          {/* Desktop inline nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {enlaces.slice(1).map((enlace) => {
              const activo = pathname === enlace.href;
              return (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    activo
                      ? "text-[#FF204E] bg-[#FF204E]/5"
                      : "text-[#334155] hover:text-[#00224D] hover:bg-[#00224D]/3"
                  }`}
                >
                  {enlace.label}
                </Link>
              );
            })}
            <a
              href="mailto:ricardo.olivares@imeg.mx"
              className="ml-3 px-4 py-2 text-[12px] font-bold text-[#FF204E] border border-[#FF204E]/25 rounded-full transition-all duration-200 hover:bg-[#FF204E]/5 hover:border-[#FF204E]/50"
            >
              Contacto
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="relative z-[120] flex lg:hidden flex-col items-end gap-1.5 p-4 -mr-4 cursor-pointer group"
            aria-label="Abrir menú de navegación"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div
              className={`h-[2px] transition-all duration-500 ease-in-out ${menuAbierto
                ? "w-7 rotate-45 translate-y-[7px] bg-white"
                : "w-7 bg-[#00224D]"
              }`}
            />
            <div
              className={`h-[2px] w-5 transition-all duration-300 ${menuAbierto
                ? "opacity-0 translate-x-4"
                : "bg-[#00224D] opacity-100"
              }`}
            />
            <div
              className={`h-[2px] transition-all duration-500 ease-in-out ${menuAbierto
                ? "w-7 -rotate-45 -translate-y-[7px] bg-white"
                : "w-5 bg-[#00224D]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <div
        className={`fixed inset-0 z-[110] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${menuAbierto
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#00224D]" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 z-[120]">
          <div className="flex items-center gap-3">
            <img src="/logo-imeg.png" alt="Logo IMEG" className="h-8 w-auto brightness-0 invert" />
            <div className="hidden sm:block">
              <p className="text-[11px] font-bold text-white leading-tight uppercase tracking-[0.08em]">
                Instituto Mexicano
              </p>
              <p className="text-[10px] text-white/50 leading-tight tracking-[0.06em]">
                de Estudios Globales
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-full flex flex-col justify-center px-8 md:px-20 max-w-5xl mx-auto overflow-y-auto scrollbar-hide">
          <nav className="flex flex-col space-y-2 md:space-y-3 pt-24 pb-16" aria-label="Menú de navegación">
            {enlaces.map((enlace, idx) => {
              const activo = pathname === enlace.href;
              return (
                <div
                  key={enlace.href}
                  className={
                    menuAbierto
                      ? "translate-y-0 opacity-100 transition-all duration-700"
                      : "translate-y-8 opacity-0 transition-all duration-700"
                  }
                  style={{
                    transitionDelay: menuAbierto ? `${idx * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={enlace.href}
                    onClick={() => setMenuAbierto(false)}
                    className={`group flex items-center gap-4 text-2xl md:text-3xl font-bold uppercase tracking-tighter transition-all ${activo
                      ? "text-[#FF204E]"
                      : "text-white/80 hover:text-[#FF204E] hover:translate-x-2"
                    }`}
                  >
                    <span className="text-[10px] md:text-xs font-mono text-white/25 mb-2 md:mb-3">
                      0{idx + 1}
                    </span>
                    {enlace.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div
            className={`mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-6 transition-opacity duration-1000 delay-500 pb-16 ${menuAbierto ? "opacity-100" : "opacity-0"}`}
          >
            <div>
              <p className="text-[10px] uppercase text-white/35 font-bold tracking-widest mb-1">
                Contacto
              </p>
              <p className="text-white text-xs font-medium">
                ricardo.olivares@imeg.mx
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-white/35 font-bold tracking-widest mb-1">
                Enfoque
              </p>
              <p className="text-white text-xs font-medium">
                Economía &amp; Geopolítica
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main className="relative flex-grow pt-24 pb-12">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#00224D]/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo-imeg.png" alt="Logo IMEG" className="h-7 w-auto" />
                <p className="text-sm font-bold text-[#00224D] tracking-tight">IMEG</p>
              </div>
              <p className="text-[13px] text-[#64748B] leading-6">
                Investigación aplicada en geopolítica económica, comercio internacional y logística global.
              </p>
            </div>

            {/* Col 2: Institución */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF204E] mb-4">
                Institución
              </p>
              <ul className="space-y-2.5">
                {footerLinks.institucion.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] text-[#475569] hover:text-[#00224D] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Investigación */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF204E] mb-4">
                Investigación
              </p>
              <ul className="space-y-2.5">
                {footerLinks.investigacion.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] text-[#475569] hover:text-[#00224D] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contacto */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF204E] mb-4">
                Contacto
              </p>
              <ul className="space-y-2.5">
                <li>
                  <a href="mailto:ricardo.olivares@imeg.mx" className="text-[13px] text-[#475569] hover:text-[#00224D] transition-colors">
                    ricardo.olivares@imeg.mx
                  </a>
                </li>
              </ul>
              <a
                href="mailto:ricardo.olivares@imeg.mx"
                className="mt-5 inline-flex items-center px-5 py-2.5 text-[12px] font-bold text-[#FF204E] border border-[#FF204E]/25 rounded-full transition-all hover:bg-[#FF204E]/5 hover:border-[#FF204E]/50"
              >
                Escríbenos →
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-[#00224D]/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-[#94A3B8]">
              © 2026 Instituto Mexicano de Estudios Globales. Dirigido por Ricardo Olivares.
            </p>
            <div className="flex gap-4">
              {footerLinks.recursos.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#94A3B8] hover:text-[#FF204E] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}