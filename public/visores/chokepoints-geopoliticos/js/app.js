const URL_CSV = "/visores/chokepoints-geopoliticos/csv/chokepoints-geopoliticos.csv";
const URL_WORLD = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const svg = d3.select("svg.overlay");
const app = document.getElementById("app");

const tituloSuperior = document.getElementById("titulo-superior");
const focusPanel = document.getElementById("focus-panel");
const detallePanel = document.getElementById("detalle-panel");

let width = app.clientWidth;
let height = app.clientHeight;
let dpr = window.devicePixelRatio || 1;

let projection;
let path;
let land;
let borders;
let animacionId = null;
let frame = 0;

let puntos = [];
let rutas = [];
let etiquetas = [];

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

  projection = d3.geoNaturalEarth1()
    .fitExtent([[24, 24], [width - 24, height - 24]], { type: "Sphere" });

  path = d3.geoPath(projection, ctx);
  dibujarEtiquetas();
}

function drawBackground() {
  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  path({ type: "Sphere" });
  ctx.fillStyle = "rgba(0, 34, 77, 0.02)";
  ctx.fill();
}

function drawGraticule() {
  const graticule = d3.geoGraticule10();
  ctx.beginPath();
  path(graticule);
  ctx.strokeStyle = "rgba(0, 34, 77, 0.04)";
  ctx.lineWidth = 0.7;
  ctx.stroke();
}

function drawMap() {
  ctx.beginPath();
  path(land);
  ctx.fillStyle = "#94a3b8";
  ctx.fill();

  ctx.beginPath();
  path(borders);
  ctx.strokeStyle = "rgba(0, 34, 77, 0.25)";
  ctx.lineWidth = 0.6;
  ctx.stroke();
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

function drawRoutes(tiempo) {
  rutas.forEach((ruta, i) => {
    const puntosRuta = ruta.coords.map(d => projection(d)).filter(Boolean);
    if (puntosRuta.length < 2) return;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(puntosRuta[0][0], puntosRuta[0][1]);
    for (let j = 1; j < puntosRuta.length; j++) {
      ctx.lineTo(puntosRuta[j][0], puntosRuta[j][1]);
    }
    ctx.strokeStyle = (ruta.color || "#38bdf8") + "44";
    ctx.lineWidth = 2.2;
    ctx.shadowColor = ruta.color || "#38bdf8";
    ctx.shadowBlur = 12;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();

    const t = ((tiempo * 0.00022) + i * 0.18) % 1;
    const segs = puntosRuta.length - 1;
    const pos = t * segs;
    const idx = Math.min(Math.floor(pos), segs - 1);
    const frac = pos - idx;

    const x = puntosRuta[idx][0] + (puntosRuta[idx + 1][0] - puntosRuta[idx][0]) * frac;
    const y = puntosRuta[idx][1] + (puntosRuta[idx + 1][1] - puntosRuta[idx][1]) * frac;
    drawGlow(x, y, "#38bdf8", 3.4);
  });
}

function drawPoints(tiempo, foco) {
  puntos.forEach((p, i) => {
    const pos = projection([p.lon, p.lat]);
    if (!pos) return;

    const pulso = 1 + 0.25 * Math.sin(tiempo * 0.004 + i);
    const esFoco = foco && foco.nombre === p.nombre;
    const radioBase = esFoco ? p.radio * 0.9 : p.radio * 0.65;
    drawGlow(pos[0], pos[1], p.color, radioBase * pulso);
  });
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

function actualizarPanel(foco) {
  tituloSuperior.textContent = `Chokepoints geopolíticos · ${foco.nombre}`;
  focusPanel.textContent = foco.nombre;
  detallePanel.innerHTML = `
    <strong>Nivel de tensión:</strong> ${foco.tension}<br>
    <strong>Riesgo dominante:</strong> ${foco.riesgo}<br>
    <strong>Importancia:</strong> ${foco.importancia}
  `;
}

function tick(tiempo) {
  if (!puntos.length || !land || !borders) return;

  const idx = Math.floor(frame / 240) % puntos.length;
  const foco = puntos[idx];

  actualizarPanel(foco);
  drawBackground();
  drawGraticule();
  drawMap();
  drawRoutes(tiempo);
  drawPoints(tiempo, foco);

  ctx.beginPath();
  path({ type: "Sphere" });
  ctx.strokeStyle = "rgba(0, 34, 77, 0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();

  frame += 1;
  animacionId = requestAnimationFrame(tick);
}

function colorPorTension(tension) {
  const t = String(tension).toLowerCase();
  if (t === "alta") return "#ef4444";
  if (t === "media") return "#f59e0b";
  return "#38bdf8";
}

function radioPorTension(tension) {
  const t = String(tension).toLowerCase();
  if (t === "alta") return 10;
  if (t === "media") return 8;
  return 7;
}

function normalizarPunto(fila) {
  return {
    nombre: fila.nombre,
    lon: Number(fila.lon),
    lat: Number(fila.lat),
    tension: fila.tension,
    riesgo: fila.riesgo,
    importancia: fila.importancia,
    color: colorPorTension(fila.tension),
    radio: radioPorTension(fila.tension)
  };
}

function agruparDatos(filas) {
  const filasPuntos = filas.filter(f => String(f.tipo).toLowerCase() === "punto");
  const filasRutas = filas.filter(f => String(f.tipo).toLowerCase() === "ruta");

  puntos = filasPuntos.map(normalizarPunto);

  rutas = d3.groups(filasRutas, d => d.ruta).map(([nombre, grupo]) => ({
    nombre,
    color: grupo[0].color_ruta || "#38bdf8",
    coords: grupo
      .sort((a, b) => Number(a.orden) - Number(b.orden))
      .map(d => [Number(d.lon), Number(d.lat)])
  }));

  etiquetas = puntos.map(p => ({
    nombre: p.etiqueta || p.nombre,
    lon: p.lon,
    lat: p.lat
  }));
}

async function cargarCSV() {
  const filas = await d3.csv(URL_CSV);

  if (!filas.length) {
    throw new Error("El CSV está vacío.");
  }

  const columnasEsperadas = ["tipo", "nombre", "lon", "lat"];
  const faltantes = columnasEsperadas.filter(col => !filas.columns.includes(col));

  if (faltantes.length) {
    throw new Error(`Faltan columnas en el CSV: ${faltantes.join(", ")}`);
  }

  agruparDatos(filas);

  if (!puntos.length) {
    throw new Error("No se encontraron puntos válidos en el CSV.");
  }
}

async function cargarMapa() {
  const world = await d3.json(URL_WORLD);
  land = topojson.feature(world, world.objects.land);
  borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
}

async function iniciar() {
  try {
    resize();

    await Promise.all([
      cargarMapa(),
      cargarCSV()
    ]);

    cancelAnimationFrame(animacionId);
    animacionId = requestAnimationFrame(tick);
  } catch (error) {
    console.error("Error al cargar chokepoints-geopoliticos:", error);
    tituloSuperior.textContent = "Error al cargar datos";
    focusPanel.textContent = "Carga fallida";
    detallePanel.innerHTML = `<strong>Error:</strong> ${error.message}`;
  }
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => resize(), 120);
});

iniciar();
