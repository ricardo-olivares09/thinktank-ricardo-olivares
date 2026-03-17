"use client";

import { useMemo, useRef, useState } from "react";
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

function escaparHtml(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderizarTextoEnHtml(texto: string) {
  let html = escaparHtml(texto);

  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-300 underline underline-offset-4">$1</a>'
  );

  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  html = html.replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/g, "<u>$1</u>");
  html = html.replace(/&lt;sup&gt;(.*?)&lt;\/sup&gt;/g, "<sup>$1</sup>");
  html = html.replace(/&lt;sub&gt;(.*?)&lt;\/sub&gt;/g, "<sub>$1</sub>");

  html = html.replace(
    /(^|\n)-\s+(.*?)(?=\n|$)/g,
    '$1<li class="ml-5 list-disc">$2</li>'
  );
  html = html.replace(
    /((?:<li class="ml-5 list-disc">.*?<\/li>\n?)+)/g,
    '<ul class="list-disc pl-6 space-y-1">$1</ul>'
  );

  html = html.replace(
    /(^|\n)\d+\.\s+(.*?)(?=\n|$)/g,
    '$1<li class="ml-5 list-decimal">$2</li>'
  );
  html = html.replace(
    /((?:<li class="ml-5 list-decimal">.*?<\/li>\n?)+)/g,
    '<ol class="list-decimal pl-6 space-y-1">$1</ol>'
  );

  html = html.replace(/\n/g, "<br />");

  return html;
}

function limpiarTextoFrontmatter(valor: string) {
  return valor.replace(/\r?\n/g, " ").trim();
}

function serializarValorYaml(valor: string) {
  return JSON.stringify(limpiarTextoFrontmatter(valor));
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
  const [linkDescarga, setLinkDescarga] = useState("");
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

  const refsBloques = useRef<
    Record<number, HTMLTextAreaElement | HTMLInputElement | null>
  >({});

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

  const aplicarFormato = (
    index: number,
    tipoFormato:
      | "bold"
      | "italic"
      | "underline"
      | "sup"
      | "sub"
      | "link"
      | "ul"
      | "ol"
  ) => {
    const elemento = refsBloques.current[index];
    const bloque = bloques[index];

    if (!elemento || bloque.tipo === "imagen") return;

    const inicio = elemento.selectionStart ?? 0;
    const fin = elemento.selectionEnd ?? 0;
    const contenidoActual = bloque.contenido;
    const textoSeleccionado = contenidoActual.slice(inicio, fin);
    const textoBase = textoSeleccionado || "texto";

    let reemplazo = textoBase;

    if (tipoFormato === "bold") {
      reemplazo = `**${textoBase}**`;
    }

    if (tipoFormato === "italic") {
      reemplazo = `*${textoBase}*`;
    }

    if (tipoFormato === "underline") {
      reemplazo = `<u>${textoBase}</u>`;
    }

    if (tipoFormato === "sup") {
      reemplazo = `<sup>${textoBase}</sup>`;
    }

    if (tipoFormato === "sub") {
      reemplazo = `<sub>${textoBase}</sub>`;
    }

    if (tipoFormato === "link") {
      const url = window.prompt("Pega la URL del enlace:");
      if (!url) return;
      reemplazo = `[${textoBase}](${url})`;
    }

    if (tipoFormato === "ul") {
      const lineas = (textoSeleccionado || "Elemento 1\nElemento 2")
        .split("\n")
        .map((linea) => linea.trim())
        .filter(Boolean);

      reemplazo = lineas.map((linea) => `- ${linea}`).join("\n");
    }

    if (tipoFormato === "ol") {
      const lineas = (textoSeleccionado || "Elemento 1\nElemento 2")
        .split("\n")
        .map((linea) => linea.trim())
        .filter(Boolean);

      reemplazo = lineas.map((linea, i) => `${i + 1}. ${linea}`).join("\n");
    }

    const nuevoContenido =
      contenidoActual.slice(0, inicio) +
      reemplazo +
      contenidoActual.slice(fin);

    actualizarBloque(index, { contenido: nuevoContenido });

    requestAnimationFrame(() => {
      const nodo = refsBloques.current[index];
      if (!nodo) return;

      nodo.focus();
      const nuevaPosicion = inicio + reemplazo.length;
      nodo.setSelectionRange(nuevaPosicion, nuevaPosicion);
    });
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
        const alt = bloque.pie?.trim() || `Imagen ${contadorImagenes}`;
        const pie = bloque.pie?.trim() ? `\n\n*${bloque.pie.trim()}*` : "";

        return `![${alt}](/publicaciones/${slugArticulo}/${nombreArchivo})${pie}`;
      })
      .filter((item) => item && item.trim() !== "")
      .join("\n\n");

    const footerLink = linkDescarga.trim()
      ? `\n\n---\n\n## Documento de investigación\n\nPuedes consultar el documento completo aquí:\n\n[Ver documento](${linkDescarga.trim()})`
      : "";

    return `---
titulo: ${serializarValorYaml(titulo)}
slug: ${serializarValorYaml(slugArticulo)}
categoria: ${serializarValorYaml(categoria)}
autor: ${serializarValorYaml(autor)}
fecha: ${serializarValorYaml(fecha)}
resumen: ${serializarValorYaml(resumen)}
destacada: ${destacada}
---

${cuerpo}${footerLink}
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
      titulo: tituloDataset.trim(),
      slug: slugDataset,
      categoria: categoriaDataset.trim(),
      resumen: resumenDataset.trim(),
      descripcion: descripcionDataset.trim(),
      fuentePrimaria: fuentePrimaria.trim(),
      metodologia: metodologia.trim(),
      frecuencia: frecuencia.trim(),
      cobertura: cobertura.trim(),
      actualizacion: actualizacion.trim(),
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
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
            Consola Editorial · Marzo 2026
          </p>
          <h1 className="mt-2 text-5xl font-bold tracking-tighter text-white">
            Editor Interno IMEG
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Genera artículos y datasets listos para integrarse al repositorio
            sin tocar las partes sensibles del sitio.
          </p>
        </header>

        <div className="mb-12 flex w-fit gap-4 rounded-2xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setModo("articulo")}
            className={`rounded-xl px-8 py-3 text-xs font-black transition-all ${
              modo === "articulo"
                ? "bg-white text-slate-950 shadow-2xl"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ARTÍCULO
          </button>

          <button
            onClick={() => setModo("dataset")}
            className={`rounded-xl px-8 py-3 text-xs font-black transition-all ${
              modo === "dataset"
                ? "bg-white text-slate-950 shadow-2xl"
                : "text-slate-400 hover:text-white"
            }`}
          >
            DATASET
          </button>
        </div>

        {modo === "articulo" && (
          <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
            <aside className="space-y-6">
              <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl">
                <h3 className="mb-6 text-xl font-bold text-white">
                  Metadatos de la obra
                </h3>

                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título del artículo..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />

                <textarea
                  value={resumen}
                  onChange={(e) => setResumen(e.target.value)}
                  placeholder="Resumen editorial..."
                  className="h-32 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    Link opcional de documento / PDF / referencia
                  </span>
                  <input
                    value={linkDescarga}
                    onChange={(e) => setLinkDescarga(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-cyan-400/20 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white outline-none focus:border-cyan-400"
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
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white outline-none focus:border-cyan-400"
                  >
                    {categoriasEditoriales.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  placeholder="16 de marzo de 2026"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />

                <label className="group flex cursor-pointer items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    checked={destacada}
                    onChange={(e) => setDestacada(e.target.checked)}
                    className="h-4 w-4 rounded accent-cyan-400"
                  />
                  <span className="text-sm text-slate-400 transition-colors group-hover:text-cyan-400">
                    Marcar como destacada en Home
                  </span>
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-400">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    Slug automático
                  </p>
                  <p className="mt-2 break-all text-cyan-300">
                    {slugArticulo || "se-generará-desde-el-titulo"}
                  </p>
                </div>

                <button
                  onClick={generarZipArticulo}
                  className="w-full rounded-xl bg-cyan-500 py-4 text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400"
                >
                  Exportar .zip
                </button>
              </div>
            </aside>

            <div className="space-y-8">
              <div className="flex w-fit gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
                <button
                  onClick={() => agregarBloque("subtitulo")}
                  className="rounded-lg px-4 py-2 text-[10px] font-black text-cyan-400 hover:bg-white/10"
                >
                  NUEVO SUBTÍTULO
                </button>
                <button
                  onClick={() => agregarBloque("parrafo")}
                  className="rounded-lg px-4 py-2 text-[10px] font-black hover:bg-white/10"
                >
                  NUEVO PÁRRAFO
                </button>
                <button
                  onClick={() => agregarBloque("imagen")}
                  className="rounded-lg px-4 py-2 text-[10px] font-black hover:bg-white/10"
                >
                  NUEVA IMAGEN
                </button>
              </div>

              <div className="rounded-[28px] border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm leading-7 text-slate-300">
                <p className="font-semibold text-white">Herramientas de formato</p>
                <p className="mt-1">
                  Usa markdown y formato inline seguro. El justificado y tamaños
                  del texto se controlan desde la página de publicación.
                </p>
              </div>

              <div className="space-y-12">
                {bloques.map((bloque, index) => (
                  <div key={index} className="group relative">
                    <button
                      onClick={() => eliminarBloque(index)}
                      className="absolute -left-14 top-2 text-[10px] font-bold text-red-400 opacity-0 transition-all group-hover:opacity-100"
                    >
                      BORRAR
                    </button>

                    {bloque.tipo !== "imagen" && (
                      <div className="mb-4 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "bold")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          B
                        </button>

                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "italic")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs italic text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          I
                        </button>

                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "underline")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs underline text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          U
                        </button>

                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "sup")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          X<sup>2</sup>
                        </button>

                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "sub")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          X<sub>2</sub>
                        </button>

                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "ul")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          • Lista
                        </button>

                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "ol")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          1. Lista
                        </button>

                        <button
                          type="button"
                          onClick={() => aplicarFormato(index, "link")}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-400/10"
                        >
                          LINK
                        </button>
                      </div>
                    )}

                    {bloque.tipo === "parrafo" && (
                      <div className="space-y-4">
                        <textarea
                          ref={(el) => {
                            refsBloques.current[index] = el;
                          }}
                          value={bloque.contenido}
                          onChange={(e) =>
                            actualizarBloque(index, {
                              contenido: e.target.value,
                            })
                          }
                          className="h-52 w-full border-l border-white/10 bg-transparent pl-8 leading-loose text-slate-300 outline-none transition-all focus:border-cyan-400"
                          placeholder="Contenido... Usa markdown limpio: **negritas**, *cursivas*, <u>subrayado</u>, H<sub>2</sub>O, listas y links."
                        />

                        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">
                            Vista previa
                          </p>
                          <div
                            className="max-w-none text-sm leading-8 text-slate-200 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_strong]:font-extrabold [&_em]:italic"
                            dangerouslySetInnerHTML={{
                              __html:
                                renderizarTextoEnHtml(bloque.contenido) ||
                                "<span class='text-slate-500'>Aquí verás el formato aplicado.</span>",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {bloque.tipo === "subtitulo" && (
                      <div className="space-y-4">
                        <input
                          ref={(el) => {
                            refsBloques.current[index] = el;
                          }}
                          value={bloque.contenido}
                          onChange={(e) =>
                            actualizarBloque(index, {
                              contenido: e.target.value,
                            })
                          }
                          className="w-full border-b border-white/5 bg-transparent pb-4 text-3xl font-extrabold text-white outline-none transition-all focus:border-cyan-400"
                          placeholder="Título de la sección"
                        />

                        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">
                            Vista previa del subtítulo
                          </p>
                          <div
                            className="text-2xl font-extrabold leading-tight text-white"
                            dangerouslySetInnerHTML={{
                              __html:
                                renderizarTextoEnHtml(bloque.contenido) ||
                                "<span class='text-slate-500'>Subtítulo vacío</span>",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {bloque.tipo === "imagen" && (
                      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-inner">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            actualizarBloque(index, {
                              archivo: e.target.files?.[0] || null,
                            })
                          }
                          className="mb-6 text-xs text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-xs file:font-bold file:text-slate-950"
                        />

                        <input
                          value={bloque.pie}
                          onChange={(e) =>
                            actualizarBloque(index, { pie: e.target.value })
                          }
                          className="w-full border-b border-white/10 bg-transparent py-2 text-xs italic text-slate-400 outline-none placeholder:text-slate-500 focus:border-cyan-400"
                          placeholder="Pie de gráfica, fuente técnica o descripción..."
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
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl">
              <h3 className="mb-6 text-xl font-bold text-white">
                Metadatos del dataset
              </h3>

              <input
                value={tituloDataset}
                onChange={(e) => setTituloDataset(e.target.value)}
                placeholder="Nombre del dataset..."
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />

              <select
                value={categoriaDataset}
                onChange={(e) => setCategoriaDataset(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
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
                placeholder="Resumen corto..."
                className="h-24 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />

              <textarea
                value={descripcionDataset}
                onChange={(e) => setDescripcionDataset(e.target.value)}
                placeholder="Descripción detallada..."
                className="h-32 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />

              <textarea
                value={fuentePrimaria}
                onChange={(e) => setFuentePrimaria(e.target.value)}
                placeholder="Fuente primaria..."
                className="h-24 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />

              <textarea
                value={metodologia}
                onChange={(e) => setMetodologia(e.target.value)}
                placeholder="Metodología IMEG..."
                className="h-28 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl">
              <h3 className="mb-6 text-xl font-bold text-white">
                Ficha técnica
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <input
                  value={frecuencia}
                  onChange={(e) => setFrecuencia(e.target.value)}
                  placeholder="Frecuencia"
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />

                <input
                  value={cobertura}
                  onChange={(e) => setCobertura(e.target.value)}
                  placeholder="Cobertura"
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <input
                value={actualizacion}
                onChange={(e) => setActualizacion(e.target.value)}
                placeholder="Última actualización"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />

              <textarea
                value={variablesTexto}
                onChange={(e) => setVariablesTexto(e.target.value)}
                placeholder="Variables clave, una por línea"
                className="h-36 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />

              <select
                value={visibilidad}
                onChange={(e) =>
                  setVisibilidad(e.target.value as "privado" | "publico")
                }
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
              >
                <option value="privado">Privado</option>
                <option value="publico">Público</option>
              </select>

              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvArchivo(e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-slate-300 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-xs file:font-bold file:text-slate-950"
              />

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-400">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Slug automático
                </p>
                <p className="mt-2 break-all text-cyan-300">
                  {slugDataset || "se-generará-desde-el-titulo"}
                </p>
              </div>

              <button
                onClick={generarZipDataset}
                className="w-full rounded-xl bg-white py-4 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:bg-slate-200"
              >
                Generar dataset .zip
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-400">
          <p className="font-semibold text-white">Notas de uso</p>
          <p className="mt-3">
            Esta versión exporta markdown limpio para que las negritas,
            cursivas, listas y formato inline sí se rendericen en la página
            pública.
          </p>
          <p className="mt-2">
            Formatos compatibles desde el editor:
            <span className="ml-2 font-bold text-white">**negritas**</span>,
            <span className="ml-2 italic text-white">*cursivas*</span>,
            <span className="ml-2 underline text-white">&lt;u&gt;subrayado&lt;/u&gt;</span>,
            <span className="ml-2 text-white">H&lt;sub&gt;2&lt;/sub&gt;O</span>,
            <span className="ml-2 text-white">x&lt;sup&gt;2&lt;/sup&gt;</span> y
            <span className="ml-2 text-cyan-300">[links](https://...)</span>.
          </p>
        </div>
      </div>
    </section>
  );
}