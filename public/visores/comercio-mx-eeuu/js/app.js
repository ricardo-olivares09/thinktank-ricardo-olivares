const URL_CSV = "/visores/comercio-mx-eeuu/csv/comercio-mx-eeuu.csv";

const nombresRama = {
  "111": "Agro",
  "112": "Pecuario",
  "113": "Forestal",
  "114": "Pesca",
  "211": "Petróleo",
  "212": "Minería",
  "311": "Alimentos",
  "312": "Bebidas",
  "313": "Textiles",
  "314": "Textil hogar",
  "315": "Prendas",
  "316": "Cuero",
  "321": "Madera",
  "322": "Papel",
  "323": "Impresión",
  "324": "Petroquímica",
  "325": "Química",
  "326": "Plástico/Caucho",
  "327": "No metálicos",
  "331": "Metales básicos",
  "332": "Metalmecánica",
  "333": "Maquinaria",
  "334": "Electrónica",
  "335": "Equipo eléctrico",
  "336": "Transporte",
  "337": "Muebles",
  "339": "Manufacturas varias",
  "910": "Scrap",
  "930": "Usados",
  "980": "Retornos",
  "990": "Especial"
};

const paleta = [
  "#FF204E", // rojo IMEG
  "#A0153E", // vino profundo
  "#00224D", // azul institucional
  "#2563EB", // azul intenso
  "#0EA5E9", // azul brillante
  "#14B8A6", // turquesa controlado
  "#F59E0B", // ámbar
  "#7C3AED", // violeta estratégico
  "#BE123C", // rojo oscuro
  "#1D4ED8", // azul medio
  "#0891B2", // cian profundo
  "#B45309", // cobre/ámbar oscuro
  "#DB2777", // magenta editorial
  "#475569", // gris pizarra
  "#0F766E", // verde petróleo
  "#C2410C", // naranja quemado
  "#7E22CE", // púrpura fuerte
  "#0369A1", // azul atlántico
  "#9F1239", // granate
  "#CA8A04", // mostaza elegante
  "#334155", // gris azulado fuerte
  "#E11D48", // rojo secundario
  "#1E40AF", // azul oscuro vivo
  "#0F172A", // casi navy
  "#9333EA", // violeta
  "#0D9488", // teal
  "#EA580C", // naranja intenso
  "#64748B", // gris de apoyo
  "#38BDF8", // celeste brillante
  "#7C2D12"  // terracota oscuro
];

const tooltip = d3.select("#tooltip");
const legend = d3.select("#legend");
const estadoFiltro = d3.select("#estado-filtro");
const subtitulo = document.getElementById("subtitulo");

const formatoNumero = d3.format(",.0f");

let rawData = [];
let ramasUnicas = [];
let color = null;
let total = 0;
let periodoActual = "—";
let ramaActiva = null;
let nodosGlobales = null;

function formatearUSD(valor) {
  if (valor >= 1e9) return `${(valor / 1e9).toFixed(2)} mil MDD`;
  if (valor >= 1e6) return `${(valor / 1e6).toFixed(1)} MDD`;
  return `${formatoNumero(valor)} USD`;
}

function limpiarNombreSector(texto) {
  return texto.replace(/^\d{4}\s*/, "");
}

function cortarTexto(texto, max) {
  return texto.length > max ? texto.slice(0, max - 1) + "…" : texto;
}

function actualizarEstadoFiltro() {
  if (!ramaActiva) {
    estadoFiltro.html("");
    return;
  }

  const valorRama = d3.sum(rawData.filter(d => d.rama === ramaActiva), d => d.value);
  const share = (100 * valorRama / total).toFixed(2);

  estadoFiltro.html(`
    <span>
      Rama activa: <b>${ramaActiva}</b> · ${nombresRama[ramaActiva] || "Sin etiqueta"} · ${formatearUSD(valorRama)} · ${share}% del total
    </span>
    <button class="btn-limpiar" id="btn-limpiar">Limpiar selección</button>
  `);

  d3.select("#btn-limpiar").on("click", () => {
    ramaActiva = null;
    aplicarResaltado();
  });
}

function dibujarLeyenda() {
  legend.selectAll("*").remove();

  legend.selectAll("div")
    .data(ramasUnicas)
    .join("div")
    .attr("class", "legend-item")
    .attr("data-rama", d => d)
    .html(d => `
      <span class="legend-swatch" style="background:${color(d)}"></span>
      <span><b>${d}</b> · ${nombresRama[d] || "Rama " + d}</span>
    `)
    .on("click", (_, d) => {
      ramaActiva = ramaActiva === d ? null : d;
      aplicarResaltado();
    });
}

function aplicarResaltado() {
  if (!nodosGlobales) return;

  nodosGlobales
    .classed("activo", d => ramaActiva && d.data.rama === ramaActiva)
    .classed("atenuado", d => ramaActiva && d.data.rama !== ramaActiva);

  legend.selectAll(".legend-item")
    .classed("activa", d => ramaActiva && d === ramaActiva)
    .classed("atenuada", d => ramaActiva && d !== ramaActiva);

  actualizarEstadoFiltro();
}

function dibujarGrafico() {
  d3.select("#chart").select("svg").remove();

  const contenedor = document.getElementById("chart");
  const width = Math.min(980, contenedor.clientWidth);
  const height = Math.max(620, Math.round(width * 0.68));

  const raiz = d3.hierarchy({ children: rawData })
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  d3.pack()
    .size([width - 20, height - 20])
    .padding(4)(raiz);

  const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "transparent")
    .lower()
    .on("click", function() {
      ramaActiva = null;
      aplicarResaltado();
      tooltip.style("visibility", "hidden");
    });

  const grupoPrincipal = svg.append("g")
    .attr("transform", "translate(10,10)");

  const hojas = raiz.leaves();

  const nodos = grupoPrincipal
    .selectAll("g")
    .data(hojas)
    .join("g")
    .attr("class", "nodo")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .on("click", function(event, d) {
      event.stopPropagation();
      ramaActiva = ramaActiva === d.data.rama ? null : d.data.rama;
      aplicarResaltado();
    });

  nodos.append("circle")
    .attr("r", d => d.r)
    .attr("fill", d => color(d.data.rama))
    .attr("fill-opacity", 0.90);

  nodos.filter(d => d.r > 34).append("text")
    .attr("class", "etiqueta-codigo")
    .attr("dy", "-0.15em")
    .style("font-size", d => `${Math.min(13, Math.max(9, d.r / 3.2))}px`)
    .text(d => d.data.sector.slice(0, 4));

  nodos.filter(d => d.r > 42).append("text")
    .attr("class", "etiqueta-nombre")
    .attr("dy", "1.15em")
    .style("font-size", d => `${Math.min(10, Math.max(7, d.r / 4.8))}px`)
    .text(d => cortarTexto(limpiarNombreSector(d.data.sector), 16));

  nodos
    .on("mouseover", function(event, d) {
      const share = (100 * d.data.value / total).toFixed(2);
      const valorRama = d3.sum(rawData.filter(x => x.rama === d.data.rama), x => x.value);
      const shareRama = (100 * valorRama / total).toFixed(2);

      tooltip
        .style("visibility", "visible")
        .html(`
          <div class="titulo">${d.data.sector}</div>
          <div class="fila"><b>Rama:</b> ${d.data.rama} · ${nombresRama[d.data.rama] || "Sin etiqueta"}</div>
          <div class="fila"><b>Valor:</b> ${formatearUSD(d.data.value)}</div>
          <div class="fila"><b>Participación:</b> ${share}% del total</div>
          <div class="fila"><b>Total rama:</b> ${formatearUSD(valorRama)} (${shareRama}%)</div>
          <div class="fila"><b>Click:</b> resaltar toda la rama</div>
        `);
    })
    .on("mousemove", function(event) {
      tooltip
        .style("top", `${event.offsetY + 18}px`)
        .style("left", `${event.offsetX + 18}px`);
    })
    .on("mouseout", function() {
      tooltip.style("visibility", "hidden");
    });

  nodosGlobales = nodos;
  aplicarResaltado();
}

function normalizarFila(fila) {
  return {
    rama: String(fila.rama).trim(),
    sector: String(fila.sector).trim(),
    value: Number(fila.value)
  };
}

async function cargarCSV() {
  const filas = await d3.csv(URL_CSV);

  if (!filas.length) {
    throw new Error("El CSV está vacío.");
  }

  const columnasEsperadas = ["rama", "sector", "value"];
  const faltantes = columnasEsperadas.filter(col => !filas.columns.includes(col));

  if (faltantes.length) {
    throw new Error(`Faltan columnas en el CSV: ${faltantes.join(", ")}`);
  }

  periodoActual = filas[0].periodo || "—";

  rawData = filas
    .filter(fila =>
      fila.rama &&
      fila.sector &&
      fila.value !== ""
    )
    .map(normalizarFila)
    .filter(d => !Number.isNaN(d.value));

  if (!rawData.length) {
    throw new Error("No hay registros válidos en el CSV.");
  }

  ramasUnicas = Array.from(new Set(rawData.map(d => d.rama))).sort();
  color = d3.scaleOrdinal()
    .domain(ramasUnicas)
    .range(paleta);

  total = d3.sum(rawData, d => d.value);

  subtitulo.textContent = `Bubble chart por sector · ${periodoActual}`;
}

async function iniciar() {
  try {
    await cargarCSV();
    dibujarLeyenda();
    dibujarGrafico();
    window.addEventListener("resize", dibujarGrafico);
  } catch (error) {
    console.error("Error al cargar comercio-mx-eeuu:", error);
    subtitulo.textContent = "Error al cargar datos";
    estadoFiltro.html(`<strong>Error:</strong> ${error.message}`);
  }
}

iniciar();