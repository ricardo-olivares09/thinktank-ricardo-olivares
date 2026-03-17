  "use client";

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

  export default function SiteLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const pathname = usePathname();

    return (
      <div className="min-h-screen bg-[#FDFDFD] text-[#4A5568]">
        {/* Fondo y Retícula sutil */}
        <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(183,132,183,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,247,255,0.05),transparent_40%)]" />
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,white,transparent_90%)]" />

        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo-imeg.png" alt="Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
              <div>
                <p className="text-sm font-bold text-[#00224D]">
                  Instituto Mexicano de Estudios Globales
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">IMEG · Economía y Geopolítica</p>
              </div>
            </Link>

            {/* NAVEGACIÓN ACTUALIZADA */}
            <nav className="hidden items-center gap-2 text-sm font-bold md:flex">
              {enlaces.map((enlace) => {
                const activo = pathname === enlace.href;
                return (
                  <Link
                    key={enlace.href}
                    href={enlace.href}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 active:scale-95 ${
                      activo 
                        ? "bg-[#FF204E] text-white shadow-[0_8px_20px_rgba(255,32,78,0.2)]" 
                        : "text-[#00224D] hover:bg-[#FF204E] hover:text-white hover:shadow-[0_8px_20px_rgba(255,32,78,0.2)]"
                    }`}
                  >
                    {enlace.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="relative">{children}</main>

        <footer className="mt-20 border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 text-center md:text-left md:flex md:justify-between items-center">
            <div>
              <h3 className="text-[#00224D] font-bold text-xl">IMEG</h3>
              <p className="text-sm text-[#94A3B8] mt-2 font-medium">© 2026 Dirigido por Ricardo Olivares</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link href="/contacto" className="px-6 py-3 rounded-full border-2 border-[#00224D] text-[#00224D] font-bold hover:bg-[#00224D] hover:text-white transition-all">
                  Contacto
              </Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }