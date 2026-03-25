const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const svg = d3.select("svg.overlay");
const app = document.getElementById("app");

const tituloSuperior = document.getElementById("titulo-superior");
const mesPanel = document.getElementById("mes-panel");
const detallePanel = document.getElementById("detalle-panel");

const URL_CSV = "/visores/choques/csv/choques.csv";
const URL_MAPA = "https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json";

let width = app.clientWidth;
let height = app.clientHeight;
let dpr = window.devicePixelRatio || 1;

let projection;
let path;
let geoEstados;
let animacionId = null;
let frame = 0;
let meses = [];

const colores = {
  seguridad: "#ef4444",
  clima: "#38bdf8",
  logistica: "#f59e0b"
};

const corredores = [
  {
    nombre: "Frontera noreste",
    tipo: "logistica",
    coords: [[-99.55, 27.49], [-100.31, 25.67], [-100.98, 25.42], [-101.25, 20.95]]
  },
  {
    nombre: "Pacífico portuario",
    tipo: "logistica",
    coords: [[-117.04, 32.51], [-107.39, 24.80], [-104.32, 19.05], [-102.20, 17.96]]
  },
  {
    nombre: "Centro-sur",
    tipo: "seguridad",
    coords: [[-101.25, 20.95], [-99.80, 18.90], [-98.20, 19.04], [-96.14, 19.17]]
  },
  {
    nombre: "Golfo logístico",
    tipo: "clima",
    coords: [[-97.87, 22.40], [-96.14, 19.17], [-92.93, 17.99]]
  }
];

const etiquetas = [
  { nombre: "Tijuana", lon: -117.04, lat: 32.51 },
  { nombre: "Nuevo Laredo", lon: -99.55, lat: 27.49 },
  { nombre: "Monterrey", lon: -100.31, lat: 25.67 },
  { nombre: "Manzanillo", lon: -104.32, lat: 19.05 },
  { nombre: "Lázaro Cárdenas", lon: -102.20, lat: 17.96 },
  { nombre: "Veracruz", lon: -96.14, lat: 19.17 }
];

function resize() {
  width = app.clientWidth;
  height = app.clientHeight;
  dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  svg.attr("width", width).attr("height", height);

  projection = d3.geoMercator()
    .center([-102, 23.5])
    .scale(Math.min(width * 1.45, height * 2.1))
    .translate([width / 2, height / 2 + 30]);

  path = d3.geoPath(projection, ctx);

  dibujarEtiquetas();
}

function colorTipo(tipo) {
  return colores[tipo] || "#94a3b8";
}

function drawGlow(x, y, color, radio) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, radio * 4);
  g.addColorStop(0, color + "ff");
  g.addColorStop(0.35, color + "88");
  g.addColorStop(1, color + "00");

  ctx.beginPath();
  ctx.fillStyle = g;
  ctx.arc(x, y, radio * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radio, 0, Math.PI * 2);
  ctx.fill();
}

function drawBackground() {
  ctx.clearRect(0, 0, width, height);
}

function drawMapBase(datosMes) {
  if (!geoEstados) return;

  ctx.save();

  geoEstados.features.forEach(feature => {
    const nombre = feature.properties.NOMGEO || feature.properties.name || "";
    const estado = datosMes.estados[nombre];

    ctx.beginPath();
    path(feature);

    if (estado) {
      const c = d3.color(colorTipo(estado.tipo));
      c.opacity = 0.18 + estado.intensidad * 0.52;
      ctx.fillStyle = c.formatRgb();
    } else {
      ctx.fillStyle = "#94a3b8";
    }

    ctx.fill();
    ctx.strokeStyle = "rgba(0, 34, 77, 0.25)";
    ctx.lineWidth = 0.9;
    ctx.stroke();
  });

  ctx.restore();
}

function drawCorridors(datosMes, tiempo) {
  corredores.forEach((corredor, i) => {
    const puntos = corredor.coords.map(d => projection(d));
    if (puntos.some(p => !p)) return;

    const activo = datosMes.corredor === corredor.nombre;
    const color = colorTipo(corredor.tipo);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(puntos[0][0], puntos[0][1]);
    for (let j = 1; j < puntos.length; j++) {
      ctx.lineTo(puntos[j][0], puntos[j][1]);
    }
    ctx.strokeStyle = activo ? color + "cc" : color + "33";
    ctx.lineWidth = activo ? 4 : 2;
    ctx.shadowColor = activo ? color : "transparent";
    ctx.shadowBlur = activo ? 18 : 0;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();

    if (activo) {
      const t = ((tiempo * 0.00028) + i * 0.17) % 1;
      const segmento = puntos.length - 1;
      const pos = t * segmento;
      const idx = Math.min(Math.floor(pos), segmento - 1);
      const frac = pos - idx;

      const x = puntos[idx][0] + (puntos[idx + 1][0] - puntos[idx][0]) * frac;
      const y = puntos[idx][1] + (puntos[idx + 1][1] - puntos[idx][1]) * frac;
      drawGlow(x, y, color, 4.5);
    }
  });
}

function drawHotspots(datosMes, tiempo) {
  datosMes.hotspots.forEach((h, i) => {
    const p = projection([h.lon, h.lat]);
    if (!p) return;

    const pulso = 1 + 0.35 * Math.sin(tiempo * 0.004 + i);
    const radio = 4 + h.intensidad * 10 * pulso;
    drawGlow(p[0], p[1], colorTipo(h.tipo), radio * 0.38);
  });
}

function drawTopFrame() {
  ctx.save();
  ctx.beginPath();
  path({ type: "Sphere" });
  ctx.strokeStyle = "rgba(0, 34, 77, 0.05)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function dibujarEtiquetas() {
  if (!projection) return;

  svg.selectAll("*").remove();

  svg.selectAll(".etiqueta")
    .data(etiquetas)
    .join("text")
    .attr("class", "etiqueta")
    .attr("x", d => projection([d.lon, d.lat])[0] + 8)
    .attr("y", d => projection([d.lon, d.lat])[1] - 8)
    .text(d => d.nombre);
}

function actualizarPanel(datosMes) {
  tituloSuperior.textContent = `Choques de oferta · ${datosMes.mes}`;
  mesPanel.textContent = datosMes.mes;
  detallePanel.innerHTML = `
    <strong>Eventos:</strong> ${datosMes.eventos}<br>
    <strong>Choque dominante:</strong> ${datosMes.dominante}<br>
    <strong>Corredor más presionado:</strong> ${datosMes.corredor}
  `;
}

function tick(tiempo) {
  if (!meses.length || !geoEstados) return;

  const idx = Math.floor(frame / 260) % meses.length;
  const datosMes = meses[idx];

  actualizarPanel(datosMes);
  drawBackground();
  drawMapBase(datosMes);
  drawCorridors(datosMes, tiempo);
  drawHotspots(datosMes, tiempo);
  drawTopFrame();

  frame += 1;
  animacionId = requestAnimationFrame(tick);
}

function transformarCSV(filas) {
  const agrupado = d3.groups(filas, d => d.mes);

  return agrupado.map(([mes, registrosMes]) => {
    const estados = {};
    const hotspots = [];

    registrosMes.forEach(d => {
      if (d.estado) {
        estados[d.estado] = {
          intensidad: Number(d.intensidad_estado || 0),
          tipo: d.tipo || "logistica"
        };
      }

      if (d.hotspot && d.lon && d.lat) {
        hotspots.push({
          nombre: d.hotspot,
          lon: Number(d.lon),
          lat: Number(d.lat),
          intensidad: Number(d.intensidad_hotspot || 0),
          tipo: d.tipo || "logistica"
        });
      }
    });

    return {
      mes,
      eventos: Number(registrosMes[0].eventos || 0),
      dominante: registrosMes[0].dominante || "—",
      corredor: registrosMes[0].corredor || "—",
      estados,
      hotspots
    };
  });
}

async function cargarCSV() {
  console.log("Intentando cargar CSV desde:", URL_CSV);

  const respuesta = await fetch(URL_CSV);
  console.log("Estatus CSV:", respuesta.status, respuesta.statusText);

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el CSV (${respuesta.status}) en ${URL_CSV}`);
  }

  const texto = await respuesta.text();
  console.log("Primeros 300 caracteres del CSV:");
  console.log(texto.slice(0, 300));

  const filas = d3.csvParse(texto);
  console.log("Filas CSV cargadas:", filas);

  if (!filas.length) {
    throw new Error("El CSV está vacío.");
  }

  const columnasEsperadas = [
    "mes",
    "eventos",
    "dominante",
    "corredor",
    "estado",
    "intensidad_estado",
    "tipo",
    "hotspot",
    "lon",
    "lat",
    "intensidad_hotspot"
  ];

  console.log("Columnas detectadas:", filas.columns);

  const faltantes = columnasEsperadas.filter(col => !filas.columns.includes(col));
  if (faltantes.length) {
    throw new Error(`Faltan columnas en el CSV: ${faltantes.join(", ")}`);
  }

  meses = transformarCSV(filas);
  console.log("Meses transformados:", meses);

  if (!meses.length) {
    throw new Error("No se pudieron transformar los datos del CSV.");
  }
}

async function cargarMapa() {
  console.log("Intentando cargar mapa...");
  const mx = await d3.json(URL_MAPA);

  if (!mx) {
    throw new Error("No se pudo cargar el GeoJSON/TopoJSON de México.");
  }

  if (mx.type === "FeatureCollection") {
    geoEstados = mx;
  } else {
    geoEstados = topojson.feature(mx, Object.values(mx.objects)[0]);
  }

  console.log("Mapa cargado correctamente.");
}

async function iniciar() {
  try {
    resize();

    await Promise.all([
      cargarMapa(),
      cargarCSV()
    ]);

    tituloSuperior.textContent = "Choques de oferta · Datos cargados";
    mesPanel.textContent = meses[0].mes;

    cancelAnimationFrame(animacionId);
    animacionId = requestAnimationFrame(tick);

  } catch (error) {
    console.error("Error al iniciar la visualización:", error);
    tituloSuperior.textContent = "Error al cargar datos";
    mesPanel.textContent = "Carga fallida";
    detallePanel.innerHTML = `
      <strong>Error:</strong> ${error.message}
    `;
  }
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resize();
  }, 120);
});

iniciar();
