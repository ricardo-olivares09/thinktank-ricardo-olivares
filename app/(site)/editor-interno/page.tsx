"use client";

import { useMemo, useState } from "react";
import JSZip from "jszip";
import { categorias } from "@/lib/categorias";
import { colaboradores } from "@/lib/colaboradores";

type BloqueArticulo =
  | { tipo: "parrafo"; contenido: string }
  | { tipo: "subtitulo"; contenido: string }
  | { tipo: "imagen"; archivo: File | null; pie: string };

function slugify(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function descargarBlob(blob: Blob, nombre: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(url);
}

export default function EditorInternoPage() {
  const categoriasEditoriales = categorias.filter(
    (categoria) => categoria !== "Datos" && categoria !== "Mapas"
  );

  const autores = useMemo(
    () => colaboradores.map((colaborador) => colaborador.nombre),
    []
  );

  const [modo, setModo] = useState<"articulo" | "dataset">("articulo");

  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [autor, setAutor] = useState(autores[0] || "");
  const [categoria, setCategoria] = useState(categoriasEditoriales[0] || "");
  const [fecha, setFecha] = useState("");
  const [destacada, setDestacada] = useState(true);
  const [bloques, setBloques] = useState<BloqueArticulo[]>([
    { tipo: "parrafo", contenido: "" },
  ]);

  const [tituloDataset, setTituloDataset] = useState("");
  const [categoriaDataset, setCategoriaDataset] = useState("Datos");
  const [resumenDataset, setResumenDataset] = useState("");
  const [descripcionDataset, setDescripcionDataset] = useState("");
  const [fuentePrimaria, setFuentePrimaria] = useState("");
  const [metodologia, setMetodologia] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [cobertura, setCobertura] = useState("");
  const [actualizacion, setActualizacion] = useState("");
  const [variablesTexto, setVariablesTexto] = useState("");
  const [visibilidad, setVisibilidad] = useState<"privado" | "publico">(
    "privado"
  );
  const [csvArchivo, setCsvArchivo] = useState<File | null>(null);

  const slugArticulo = slugify(titulo);
  const slugDataset = slugify(tituloDataset);

  const agregarBloque = (tipo: BloqueArticulo["tipo"]) => {
    if (tipo === "imagen") {
      setBloques([...bloques, { tipo: "imagen", archivo: null, pie: "" }]);
      return;
    }
    setBloques([...bloques, { tipo, contenido: "" } as BloqueArticulo]);
  };

  const actualizarBloque = (index: number, valor: Partial<BloqueArticulo>) => {
    const nuevos = [...bloques];
    nuevos[index] = { ...nuevos[index], ...valor } as BloqueArticulo;
    setBloques(nuevos);
  };

  const eliminarBloque = (index: number) => {
    setBloques(bloques.filter((_, i) => i !== index));
  };

  const generarMarkdownArticulo = () => {
    let contadorImagenes = 0;

    const cuerpo = bloques
      .map((bloque) => {
        if (bloque.tipo === "parrafo") {
          return bloque.contenido.trim();
        }

        if (bloque.tipo === "subtitulo") {
          return `## ${bloque.contenido.trim()}`;
        }

        contadorImagenes += 1;
        const extension = bloque.archivo?.name.split(".").pop() || "png";
        const nombreArchivo = `imagen-${contadorImagenes}.${extension}`;

        return `![${bloque.pie || `Imagen ${contadorImagenes}`}](/publicaciones/${slugArticulo}/${nombreArchivo})`;
      })
      .filter(Boolean)
      .join("\n\n");

    return `---
titulo: "${titulo}"
slug: "${slugArticulo}"
categoria: "${categoria}"
autor: "${autor}"
fecha: "${fecha}"
resumen: "${resumen}"
destacada: ${destacada}
---

${cuerpo}
`;
  };

  const generarZipArticulo = async () => {
    if (!titulo || !resumen || !autor || !categoria || !fecha) {
      alert("Llena título, resumen, autor, categoría y fecha.");
      return;
    }

    const zip = new JSZip();
    const markdown = generarMarkdownArticulo();

    zip.file(`content/publicaciones/${slugArticulo}.md`, markdown);

    let contadorImagenes = 0;
    for (const bloque of bloques) {
      if (bloque.tipo === "imagen" && bloque.archivo) {
        contadorImagenes += 1;
        const extension = bloque.archivo.name.split(".").pop() || "png";
        const nombreArchivo = `imagen-${contadorImagenes}.${extension}`;
        zip.file(
          `public/publicaciones/${slugArticulo}/${nombreArchivo}`,
          bloque.archivo
        );
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    descargarBlob(blob, `${slugArticulo}.zip`);
  };

  const generarZipDataset = async () => {
    if (
      !tituloDataset ||
      !resumenDataset ||
      !descripcionDataset ||
      !fuentePrimaria ||
      !metodologia ||
      !frecuencia ||
      !cobertura ||
      !actualizacion ||
      !csvArchivo
    ) {
      alert("Llena todos los campos principales del dataset y sube el CSV.");
      return;
    }

    const variables = variablesTexto
      .split("\n")
      .map((linea) => linea.trim())
      .filter(Boolean);

    const metadata = {
      titulo: tituloDataset,
      slug: slugDataset,
      categoria: categoriaDataset,
      resumen: resumenDataset,
      descripcion: descripcionDataset,
      fuentePrimaria,
      metodologia,
      frecuencia,
      cobertura,
      actualizacion,
      variables,
      visibilidad,
    };

    const zip = new JSZip();

    zip.file(
      `content/datasets/${slugDataset}.json`,
      JSON.stringify(metadata, null, 2)
    );

    zip.file(`public/datasets/${slugDataset}.csv`, csvArchivo);

    const blob = await zip.generateAsync({ type: "blob" });
    descargarBlob(blob, `${slugDataset}.zip`);
  };

  return (
    <section className="min-h-screen bg-[#07111f] px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Herramienta interna
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            Editor interno IMEG
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Genera paquetes listos para integrarse al repositorio sin tocar las
            partes sensibles del sitio.
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setModo("articulo")}
            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
              modo === "articulo"
                ? "bg-white text-slate-950"
                : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            Generar artículo
          </button>

          <button
            onClick={() => setModo("dataset")}
            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
              modo === "dataset"
                ? "bg-white text-slate-950"
                : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            Generar dataset
          </button>
        </div>

        {modo === "articulo" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">
                Metadatos del artículo
              </h2>

              <div className="mt-6 space-y-4">
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <textarea
                  value={resumen}
                  onChange={(e) => setResumen(e.target.value)}
                  placeholder="Resumen"
                  className="min-h-[100px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <select
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                >
                  {autores.map((nombreAutor) => (
                    <option key={nombreAutor} value={nombreAutor}>
                      {nombreAutor}
                    </option>
                  ))}
                </select>

                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                >
                  {categoriasEditoriales.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  placeholder="Fecha (ej. 20 de marzo de 2026)"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <label className="flex items-center gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={destacada}
                    onChange={(e) => setDestacada(e.target.checked)}
                  />
                  Marcar como destacada
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                  <p>Slug automático:</p>
                  <p className="mt-2 text-cyan-300">
                    {slugArticulo || "se-generará-desde-el-titulo"}
                  </p>
                </div>

                <button
                  onClick={generarZipArticulo}
                  className="w-full rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
                >
                  Descargar paquete del artículo
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => agregarBloque("parrafo")}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                >
                  Agregar párrafo
                </button>
                <button
                  onClick={() => agregarBloque("subtitulo")}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                >
                  Agregar subtítulo
                </button>
                <button
                  onClick={() => agregarBloque("imagen")}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                >
                  Agregar imagen
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {bloques.map((bloque, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-sm uppercase tracking-[0.15em] text-cyan-300">
                        {bloque.tipo}
                      </p>
                      <button
                        onClick={() => eliminarBloque(index)}
                        className="text-sm text-red-300"
                      >
                        Eliminar
                      </button>
                    </div>

                    {bloque.tipo === "parrafo" && (
                      <textarea
                        value={bloque.contenido}
                        onChange={(e) =>
                          actualizarBloque(index, { contenido: e.target.value })
                        }
                        placeholder="Escribe el párrafo"
                        className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none"
                      />
                    )}

                    {bloque.tipo === "subtitulo" && (
                      <input
                        value={bloque.contenido}
                        onChange={(e) =>
                          actualizarBloque(index, { contenido: e.target.value })
                        }
                        placeholder="Escribe el subtítulo"
                        className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none"
                      />
                    )}

                    {bloque.tipo === "imagen" && (
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            actualizarBloque(index, {
                              archivo: e.target.files?.[0] || null,
                            })
                          }
                          className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none"
                        />

                        <input
                          value={bloque.pie}
                          onChange={(e) =>
                            actualizarBloque(index, { pie: e.target.value })
                          }
                          placeholder="Pie de imagen"
                          className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {modo === "dataset" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">
                Metadatos del dataset
              </h2>

              <div className="mt-6 space-y-4">
                <input
                  value={tituloDataset}
                  onChange={(e) => setTituloDataset(e.target.value)}
                  placeholder="Título del dataset"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <select
                  value={categoriaDataset}
                  onChange={(e) => setCategoriaDataset(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <textarea
                  value={resumenDataset}
                  onChange={(e) => setResumenDataset(e.target.value)}
                  placeholder="Resumen"
                  className="min-h-[80px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <textarea
                  value={descripcionDataset}
                  onChange={(e) => setDescripcionDataset(e.target.value)}
                  placeholder="Descripción amplia"
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <textarea
                  value={fuentePrimaria}
                  onChange={(e) => setFuentePrimaria(e.target.value)}
                  placeholder="Fuente primaria"
                  className="min-h-[80px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <textarea
                  value={metodologia}
                  onChange={(e) => setMetodologia(e.target.value)}
                  placeholder="Metodología y transformación IMEG"
                  className="min-h-[100px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">
                Archivo y salida
              </h2>

              <div className="mt-6 space-y-4">
                <input
                  value={frecuencia}
                  onChange={(e) => setFrecuencia(e.target.value)}
                  placeholder="Frecuencia"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <input
                  value={cobertura}
                  onChange={(e) => setCobertura(e.target.value)}
                  placeholder="Cobertura"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <input
                  value={actualizacion}
                  onChange={(e) => setActualizacion(e.target.value)}
                  placeholder="Última actualización"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <textarea
                  value={variablesTexto}
                  onChange={(e) => setVariablesTexto(e.target.value)}
                  placeholder="Variables clave, una por línea"
                  className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <select
                  value={visibilidad}
                  onChange={(e) =>
                    setVisibilidad(e.target.value as "privado" | "publico")
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                >
                  <option value="privado">Privado</option>
                  <option value="publico">Público</option>
                </select>

                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvArchivo(e.target.files?.[0] || null)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                />

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                  <p>Slug automático:</p>
                  <p className="mt-2 text-cyan-300">
                    {slugDataset || "se-generará-desde-el-titulo"}
                  </p>
                </div>

                <button
                  onClick={generarZipDataset}
                  className="w-full rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
                >
                  Descargar paquete del dataset
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-400">
          <p className="text-white">Cómo usar el paquete generado</p>
          <p className="mt-3">
            Artículos: descomprime y copia el archivo <strong>.md</strong> a{" "}
            <code>content/publicaciones/</code> y las imágenes a{" "}
            <code>public/publicaciones/slug-del-articulo/</code>.
          </p>
          <p className="mt-2">
            Datasets: descomprime y copia el <strong>.json</strong> a{" "}
            <code>content/datasets/</code> y el <strong>.csv</strong> a{" "}
            <code>public/datasets/</code>.
          </p>
        </div>
      </div>
    </section>
  );
}