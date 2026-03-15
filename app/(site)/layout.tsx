import Link from "next/link";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/instituto", label: "Instituto" },
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/datos", label: "Datos" },
  { href: "/mapas", label: "Mapas" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/colaboradores", label: "Colaboradores" },
];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.08),transparent_20%),linear-gradient(180deg,#040913_0%,#07111f_45%,#0a1222_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111fcc]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo-imeg.png"
              alt="Instituto Mexicano de Estudios Globales"
              className="h-10 w-auto"
            />
            <div>
              <p className="text-sm font-semibold text-white">
                Instituto Mexicano de Estudios Globales
              </p>
              <p className="text-xs text-slate-400">
                IMEG · Economía, geopolítica y datos
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="transition hover:text-white"
              >
                {enlace.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Instituto Mexicano de Estudios Globales (IMEG)
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Plataforma de análisis económico, geopolítica económica,
                comercio internacional, logística global, datos, visualización y
                economía ecológica.
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-sm text-slate-400">
                Proyecto dirigido por Ricardo Olivares
              </p>
              <p className="mt-2 text-sm text-slate-500">
                © 2026 Instituto Mexicano de Estudios Globales
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}