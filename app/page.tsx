"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  CreditCard,
  Database,
  Globe,
  Lock,
  Menu,
  Shield,
  Sparkles,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

type Publicacion = {
  id: number;
  titulo: string;
  resumen: string;
  autor: string;
  rol: string;
  categoria: string;
  acceso: "publico" | "premium";
  tipo: string;
  fecha: string;
  destacado: boolean;
};

type NuevoPost = {
  titulo: string;
  resumen: string;
  autor: string;
  rol: string;
  categoria: string;
  acceso: "publico" | "premium";
  tipo: string;
};

const publicacionesIniciales: Publicacion[] = [
  {
    id: 1,
    titulo: "Nearshoring con evidencia: inversión, capacidad y narrativa",
    resumen:
      "Una lectura aplicada para distinguir anuncios, reinversión, expansión efectiva y límites reales de la relocalización en México.",
    autor: "Ricardo Olivares",
    rol: "Director editorial",
    categoria: "Sector externo",
    acceso: "publico",
    tipo: "Análisis",
    fecha: "13 Mar 2026",
    destacado: true,
  },
  {
    id: 2,
    titulo:
      "Riesgos logísticos y choques de oferta: una agenda medible para México",
    resumen:
      "Bloqueos, cierres fronterizos, eventos climáticos y sus efectos sobre producción, tiempos y comercio exterior.",
    autor: "Colaborador invitado",
    rol: "Colaboración académica",
    categoria: "Logística",
    acceso: "premium",
    tipo: "Base",
    fecha: "10 Mar 2026",
    destacado: false,
  },
  {
    id: 3,
    titulo: "Mapas y bases para seguir eventos anómalos en tiempo real",
    resumen:
      "Repositorio de recursos descargables con visualizaciones, mapas y bases estructuradas para análisis aplicado.",
    autor: "Mesa de datos",
    rol: "Equipo editorial",
    categoria: "Datos",
    acceso: "premium",
    tipo: "Mapa",
    fecha: "08 Mar 2026",
    destacado: false,
  },
];

const colaboradores = [
  {
    nombre: "Ricardo Olivares",
    rol: "Dirección editorial",
    tipo: "Interno",
    bio: "Economía aplicada, sector externo, datos, coyuntura y dirección estratégica del proyecto.",
    iniciales: "RO",
  },
  {
    nombre: "Servicio Social · Mesa Editorial",
    rol: "Administración editorial",
    tipo: "Interno",
    bio: "Carga publicaciones, prepara borradores, revisa estilo y estructura recursos para su publicación.",
    iniciales: "SS",
  },
  {
    nombre: "Servicio Social · Mesa de Datos",
    rol: "Datos y visualización",
    tipo: "Interno",
    bio: "Apoya en bases, dashboards, notas de contexto, documentación y recursos descargables.",
    iniciales: "MD",
  },
  {
    nombre: "Académicos invitados",
    rol: "Colaboradores externos",
    tipo: "Externo",
    bio: "Espacio para firmas invitadas como David Barkin, Carlos Silva, Violeta Núñez y otros especialistas.",
    iniciales: "AI",
  },
];

const planes = [
  {
    nombre: "Abierto",
    precio: "$0",
    descripcion:
      "Para construir audiencia, credibilidad y posicionamiento público.",
    items: [
      "Lectura pública de artículos seleccionados",
      "Acceso al perfil de colaboradores",
      "Registro de usuario",
      "Suscripción al boletín",
    ],
    destacado: false,
  },
  {
    nombre: "Miembro",
    precio: "Próximamente",
    descripcion:
      "Pensado para lectores que quieran seguimiento, recursos descargables y biblioteca exclusiva.",
    items: [
      "Publicaciones semanales premium",
      "Descarga de bases y mapas",
      "Biblioteca temática",
      "Alertas y materiales exclusivos",
    ],
    destacado: true,
  },
  {
    nombre: "Institucional",
    precio: "Cotización",
    descripcion: "Para equipos, despachos, universidades o áreas de análisis.",
    items: [
      "Accesos por usuario",
      "Colecciones privadas",
      "Reportes especiales",
      "Atención prioritaria",
    ],
    destacado: false,
  },
];

const roles = [
  {
    titulo: "Superadmin",
    texto:
      "Tú controlas pagos, planes, datos bancarios, activación premium, configuración crítica y publicación final sensible.",
  },
  {
    titulo: "Admin editorial",
    texto:
      "Tus servicios sociales crean borradores, suben recursos, programan piezas y administran el flujo editorial.",
  },
  {
    titulo: "Colaborador",
    texto:
      "Académicos e invitados con perfil propio, historial de textos y sección visible como Publicaciones de colaboradores.",
  },
  {
    titulo: "Miembro",
    texto:
      "Usuario registrado que guarda lecturas, recibe alertas y más adelante podrá acceder a recursos premium.",
  },
];

function SectionHeading({
  badge,
  title,
  text,
}: {
  badge: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
        <Sparkles className="h-3.5 w-3.5" />
        {badge}
      </span>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-slate-300">{text}</p>
      </div>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "cyan" | "emerald" | "amber" | "violet";
}) {
  const tones = {
    default: "border-white/10 bg-white/8 text-white",
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
    emerald: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
    amber: "border-amber-300/20 bg-amber-400/10 text-amber-200",
    violet: "border-violet-300/20 bg-violet-400/10 text-violet-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function HeroOrb({ className }: { className: string }) {
  return (
    <div className={["absolute rounded-full blur-3xl", className].join(" ")} />
  );
}

export default function Page() {
  const [publicaciones, setPublicaciones] =
    useState<Publicacion[]>(publicacionesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [nuevoPost, setNuevoPost] = useState<NuevoPost>({
    titulo: "",
    resumen: "",
    autor: "",
    rol: "",
    categoria: "",
    acceso: "publico",
    tipo: "Análisis",
  });

  const categorias = useMemo(
    () => ["Todas", ...new Set(publicaciones.map((p) => p.categoria))],
    [publicaciones],
  );

  const publicacionesFiltradas = useMemo(() => {
    return publicaciones.filter((p) => {
      const cumpleBusqueda = [p.titulo, p.resumen, p.autor, p.categoria]
        .join(" ")
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const cumpleCategoria =
        categoria === "Todas" || p.categoria === categoria;

      return cumpleBusqueda && cumpleCategoria;
    });
  }, [publicaciones, busqueda, categoria]);

  const crearBorrador = () => {
    if (!nuevoPost.titulo || !nuevoPost.resumen || !nuevoPost.autor) {
      alert("Llena al menos título, resumen y autor.");
      return;
    }

    const nuevaPublicacion: Publicacion = {
      id: Date.now(),
      ...nuevoPost,
      fecha: "Borrador",
      destacado: false,
    };

    setPublicaciones([nuevaPublicacion, ...publicaciones]);

    setNuevoPost({
      titulo: "",
      resumen: "",
      autor: "",
      rol: "",
      categoria: "",
      acceso: "publico",
      tipo: "Análisis",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060d18] text-slate-100">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(16,185,129,0.10),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.12),transparent_24%),linear-gradient(180deg,#040913_0%,#07111f_44%,#0a1222_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07101dcc]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-emerald-300 font-bold text-slate-950 shadow-[0_0_50px_rgba(34,211,238,0.35)]">
              RO
            </div>
            <div>
              <p className="font-semibold text-white">
                Think Tank Ricardo Olivares
              </p>
              <p className="text-sm text-slate-400">
                Economía, datos, sector externo y análisis aplicado
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
            <a href="#modelo" className="transition hover:text-white">
              Modelo
            </a>
            <a href="#colaboradores" className="transition hover:text-white">
              Colaboradores
            </a>
            <a href="#biblioteca" className="transition hover:text-white">
              Biblioteca
            </a>
            <a href="#membresias" className="transition hover:text-white">
              Membresías
            </a>
            <a href="#panel" className="transition hover:text-white">
              Panel
            </a>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10">
              Entrar
            </button>
          </nav>

          <button className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main>
        <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <HeroOrb className="left-[8%] top-[10%] h-56 w-56 bg-cyan-400/15" />
          <HeroOrb className="right-[6%] top-[6%] h-72 w-72 bg-emerald-400/10" />
          <HeroOrb className="bottom-[10%] left-[40%] h-64 w-64 bg-violet-500/10" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                Plataforma editorial + think tank + capa premium futura
              </span>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white md:text-7xl xl:text-[5.8rem]">
                Pública hoy. <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
                  Premium cuando tú decidas.
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                Esto ya no es una página personal: es el inicio de un think tank
                digital con publicaciones abiertas, colaboradores, biblioteca de
                datos, panel editorial y una arquitectura lista para monetizar
                bases, mapas y análisis semanales cuando llegue el momento.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.02] hover:bg-slate-100">
                  Ver arquitectura
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
                <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10">
                  Explorar demo
                </button>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  {
                    titulo: "Público",
                    texto:
                      "Artículos abiertos para crecer autoridad, audiencia y reputación.",
                  },
                  {
                    titulo: "Colaborativo",
                    texto:
                      "Servicios sociales, mesa de datos y académicos con espacio propio.",
                  },
                  {
                    titulo: "Escalable",
                    texto:
                      "Membresías, descargas premium y biblioteca futura sin rehacer el sitio.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.titulo}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * idx + 0.15, duration: 0.45 }}
                  >
                    <GlassCard className="h-full p-5">
                      <p className="text-base font-semibold text-white">
                        {item.titulo}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {item.texto}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <GlassCard className="relative overflow-hidden p-6 md:p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                      Núcleo del proyecto
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Arquitectura pensada para durar
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">
                    MVP + visión larga
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Users,
                      title: "Usuarios y perfiles",
                      text:
                        "Registro, login, historial de lectura, guardados y membresía futura.",
                    },
                    {
                      icon: BookOpen,
                      title: "Publicaciones abiertas y premium",
                      text:
                        "Notas públicas hoy, recursos exclusivos y descargas cuando actives monetización.",
                    },
                    {
                      icon: Database,
                      title: "Biblioteca de datos",
                      text:
                        "Bases, mapas, notas técnicas, recursos descargables y repositorios temáticos.",
                    },
                    {
                      icon: Shield,
                      title: "Roles y control",
                      text:
                        "Servicios sociales administran lo editorial; solo tú controlas negocio, pagos y permisos críticos.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group rounded-3xl border border-white/10 bg-[#091423]/80 p-4 transition hover:border-cyan-300/20 hover:bg-[#0b1729]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.12)]">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-300">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        <section
          id="modelo"
          className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20"
        >
          <SectionHeading
            badge="Modelo del sitio"
            title="La web debe sentirse como medio, laboratorio y plataforma editorial al mismo tiempo"
            text="La idea es que visualmente se vea premium y tecnológica, pero detrás tenga una lógica muy clara: contenido abierto, comunidad registrada, colaboradores visibles, recursos descargables y monetización futura sin rehacer todo."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Globe,
                title: "Frente público",
                text:
                  "Home, manifiesto, líneas temáticas, publicaciones abiertas y autoridad de marca.",
              },
              {
                icon: Lock,
                title: "Zona premium",
                text:
                  "Biblioteca de mapas, bases, reportes y colecciones descargables para miembros.",
              },
              {
                icon: Briefcase,
                title: "Back office editorial",
                text:
                  "Panel para servicios sociales, borradores, revisión, programación y carga de recursos.",
              },
              {
                icon: CreditCard,
                title: "Negocio listo",
                text:
                  "Cobro desactivado hoy, pero estructura preparada para activar membresías cuando quieras.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.06 }}
              >
                <GlassCard className="h-full p-6 transition hover:-translate-y-1">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-200 shadow-[0_0_25px_rgba(52,211,153,0.10)]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.text}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <SectionHeading
            badge="Gobierno interno"
            title="Tus servicios sociales sí participan. Tus datos bancarios y la capa crítica, no."
            text="Eso se resuelve bien desde arquitectura y permisos. Los administradores editoriales deben poder trabajar cómodos, pero sin tocar nada del negocio ni de la seguridad de la plataforma."
          />

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {roles.map((rol, idx) => (
              <motion.div
                key={rol.titulo}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
              >
                <GlassCard className="h-full p-6">
                  <Pill
                    tone={
                      idx === 0
                        ? "emerald"
                        : idx === 1
                          ? "cyan"
                          : idx === 2
                            ? "violet"
                            : "amber"
                    }
                  >
                    {rol.titulo}
                  </Pill>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {rol.texto}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="colaboradores"
          className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20"
        >
          <SectionHeading
            badge="Publicaciones de colaboradores"
            title="Una sección separada, elegante y visible para voces internas e invitadas"
            text="Aquí viven tu mesa editorial, tus servicios sociales y luego las firmas invitadas. El sitio deja claro que existe una casa editorial con identidad propia y múltiples voces bajo un mismo estándar."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {colaboradores.map((colaborador, idx) => (
              <motion.div
                key={colaborador.nombre}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.06 }}
              >
                <GlassCard className="group h-full p-6 transition hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-cyan-200">
                      {colaborador.iniciales}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {colaborador.nombre}
                      </p>
                      <p className="text-sm text-slate-400">
                        {colaborador.rol}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Pill
                      tone={
                        colaborador.tipo === "Externo" ? "violet" : "default"
                      }
                    >
                      {colaborador.tipo}
                    </Pill>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {colaborador.bio}
                  </p>
                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition group-hover:text-white">
                    Ver perfil
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="biblioteca"
          className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20"
        >
          <SectionHeading
            badge="Biblioteca editorial"
            title="Notas, bases, mapas y recursos con filtros de acceso desde el primer día"
            text="Hoy todo puede verse público si así lo quieres. Mañana activas premium y la capa de negocio sin rediseñar la experiencia. Esa es la ventaja de construir bien desde ahora."
          />

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full flex-col gap-3 md:flex-row lg:w-auto">
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por tema, autor o categoría"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/20 focus:bg-white/7 lg:w-[340px]"
              />

              <div className="flex flex-wrap gap-2">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoria(cat)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      categoria === cat
                        ? "border-white bg-white text-slate-950"
                        : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300">
              <UserPlus className="h-4 w-4" />
              Crear cuenta
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publicacionesFiltradas.map((publicacion, idx) => (
              <motion.div
                key={publicacion.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GlassCard className="group h-full overflow-hidden p-6 transition hover:-translate-y-1 hover:border-cyan-300/20">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Pill>{publicacion.categoria}</Pill>
                    <Pill
                      tone={
                        publicacion.acceso === "premium" ? "amber" : "emerald"
                      }
                    >
                      {publicacion.acceso === "premium" ? "Premium" : "Público"}
                    </Pill>
                    <Pill tone="cyan">{publicacion.tipo}</Pill>
                  </div>

                  <h3 className="text-xl font-semibold leading-7 text-white">
                    {publicacion.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {publicacion.resumen}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-sm text-white">{publicacion.autor}</p>
                    <p className="text-xs text-slate-400">
                      {publicacion.rol} · {publicacion.fecha}
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition group-hover:text-white">
                      Leer más
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="membresias"
          className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20"
        >
          <SectionHeading
            badge="Monetización gradual"
            title="No cobramos hoy. Diseñamos el negocio desde hoy."
            text="Eso te permite enfocarte en reputación, tracción y contenido sin desperdiciar trabajo. Cuando llegue el momento, activas el modelo de membresía sobre una plataforma que ya nació lista para monetizar."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {planes.map((plan, idx) => (
              <motion.div
                key={plan.nombre}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                <GlassCard
                  className={`h-full p-7 ${
                    plan.destacado
                      ? "border-cyan-300/20 bg-gradient-to-b from-cyan-400/10 via-white/[0.05] to-emerald-300/10"
                      : ""
                  }`}
                >
                  {plan.destacado && <Pill tone="cyan">Fase futura clave</Pill>}
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {plan.nombre}
                  </h3>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-white">
                    {plan.precio}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {plan.descripcion}
                  </p>

                  <div className="mt-6 space-y-3">
                    {plan.items.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-slate-200"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`mt-8 w-full rounded-full px-4 py-3 font-medium transition ${
                      plan.destacado
                        ? "bg-white text-slate-950 hover:bg-slate-100"
                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {plan.nombre === "Abierto"
                      ? "Seguir abierto"
                      : "Preparar plan"}
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="panel"
          className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20"
        >
          <SectionHeading
            badge="Panel administrativo"
            title="Subir contenido debe sentirse simple, no técnico"
            text="Esta parte es clave: tus administradores editoriales no deberían tocar código. Deben entrar al panel, crear borradores, adjuntar recursos y programar piezas. Todo lo sensible de negocio se queda contigo."
          />

          <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
            <GlassCard className="p-6 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Alta rápida de publicación
                  </h3>
                  <p className="text-sm text-slate-400">
                    Pensado para ti y para tus servicios sociales.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  value={nuevoPost.titulo}
                  onChange={(e) =>
                    setNuevoPost({ ...nuevoPost, titulo: e.target.value })
                  }
                  placeholder="Título"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/20 focus:bg-white/7"
                />

                <textarea
                  value={nuevoPost.resumen}
                  onChange={(e) =>
                    setNuevoPost({ ...nuevoPost, resumen: e.target.value })
                  }
                  placeholder="Resumen o bajada"
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/20 focus:bg-white/7"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={nuevoPost.autor}
                    onChange={(e) =>
                      setNuevoPost({ ...nuevoPost, autor: e.target.value })
                    }
                    placeholder="Autor"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/20 focus:bg-white/7"
                  />
                  <input
                    value={nuevoPost.rol}
                    onChange={(e) =>
                      setNuevoPost({ ...nuevoPost, rol: e.target.value })
                    }
                    placeholder="Rol del autor"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/20 focus:bg-white/7"
                  />
                  <input
                    value={nuevoPost.categoria}
                    onChange={(e) =>
                      setNuevoPost({ ...nuevoPost, categoria: e.target.value })
                    }
                    placeholder="Categoría"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/20 focus:bg-white/7"
                  />
                  <select
                    value={nuevoPost.acceso}
                    onChange={(e) =>
                      setNuevoPost({
                        ...nuevoPost,
                        acceso: e.target.value as "publico" | "premium",
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/20 focus:bg-white/7"
                  >
                    <option value="publico">Público</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={crearBorrador}
                    className="rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-100"
                  >
                    Guardar borrador
                  </button>
                  <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10">
                    Subir imagen
                  </button>
                  <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10">
                    Adjuntar base o mapa
                  </button>
                </div>
              </div>
            </GlassCard>

            <div className="grid gap-5">
              <GlassCard className="p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <TrendingUp className="h-5 w-5 text-emerald-300" />
                  Qué sí pueden hacer tus administradores
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <li>• Crear y editar borradores.</li>
                  <li>• Subir imágenes de portada y recursos editoriales.</li>
                  <li>• Asignar piezas a la sección de colaboradores.</li>
                  <li>• Programar publicación o mandar a revisión.</li>
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Shield className="h-5 w-5 text-amber-300" />
                  Qué queda solo para ti
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <li>• Datos bancarios y configuración de pago.</li>
                  <li>• Creación de planes y precios.</li>
                  <li>• Políticas, legal, accesos críticos y facturación.</li>
                  <li>• Activación o desactivación de contenido premium.</li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:px-8">
          <GlassCard className="overflow-hidden p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <div>
                <Pill tone="cyan">Dirección recomendada</Pill>
                <h3 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                  Hoy dejamos andando el frente visual. Mañana nutres contenido
                  sobre una base que sí puede volverse plataforma real.
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                  La ruta profesional es: diseño premium, publicaciones abiertas,
                  biblioteca preparada, roles claros y luego autenticación, base
                  de datos, storage y membresías reales. Así se ve hermoso hoy y
                  crece con seriedad mañana.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  "Frontend visual premium",
                  "Panel editorial por roles",
                  "Biblioteca pública y premium",
                  "Monetización activable después",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1628]/85 px-5 py-4 text-white"
                  >
                    <ChevronRight className="h-4 w-4 text-cyan-200" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}