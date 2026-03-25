const ancho = 920;
const alto = 640;

const URL_MUNDO = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const URL_SOCIOS = "/visores/atlas-comercio-exterior/csv/socios.csv";
const URL_SECTORES = "/visores/atlas-comercio-exterior/csv/sectores.csv";
const URL_RIESGO = "/visores/atlas-comercio-exterior/csv/riesgo.csv";

const svg = d3.select("#mapa").attr("viewBox", `0 0 ${ancho} ${alto}`);
const tooltip = d3.select("#tooltip");
const estadoTexto = document.getElementById("estadoTexto");
const descripcionModo = document.getElementById("descripcionModo");
const tituloPanel = document.getElementById("tituloPanel");
const textoPanel = document.getElementById("textoPanel");
const detallePanel = document.getElementById("detallePanel");

const mexico = [-102, 23.5];
let progreso = 0;
let modo = "socios";

const paneles = {
  socios: {
    titulo: "Socios comerciales",
    texto: "Esta versión resalta conexiones bilaterales clave. La transición sirve para ir de una lectura geopolítica a una operativa sin romper la experiencia visual.",
    items: [
      ["Enfoque", "Países y corredores principales"],
      ["Interacción", "Hover con tooltip + clic futuro"],
      ["Mejor uso", "Home y módulo de exploración global"]
    ],
    descripcion: "Flujos bilaterales de México con socios estratégicos."
  },
  sectores: {
    titulo: "Sectores estratégicos",
    texto: "Aquí el mapa deja de mostrar solo países y empieza a contar una historia sectorial: automotriz, electrónica, agroindustria y energía.",
    items: [
      ["Enfoque", "Capas por sector exportador"],
      ["Lectura", "Productos, destino y peso relativo"],
      ["Mejor uso", "Presentar especialización productiva"]
    ],
    descripcion: "Capas por industria para mostrar especialización exportadora."
  },
  riesgo: {
    titulo: "Riesgo logístico",
    texto: "Este modo dialoga perfecto con tu perfil: el mapa se convierte en una herramienta para ubicar disrupciones, vulnerabilidades y exposición comercial.",
    items: [
      ["Enfoque", "Eventos anormales y cuellos de botella"],
      ["Lectura", "Choques, severidad y rutas afectadas"],
      ["Mejor uso", "Nearshoring, logística y alertas"]
    ],
    descripcion: "Disrupciones y vulnerabilidades sobre rutas clave del comercio exterior."
  }
};

let datos = {
  socios: [],
  sectores: [],
  riesgo: []
};

const projectionOrtho = d3.geoOrthographic()
  .translate([ancho / 2, alto / 2])
  .scale(255)
  .rotate([102, -23])
  .clipAngle(90)
  .precision(0.5);

const projectionEq = d3.geoEquirectangular()
  .translate([ancho / 2, alto / 2])
  .scale(150)
  .center([0, 15]);

function proyeccionInterpolada(lambda, phi) {
  const a = projectionOrtho([lambda, phi]);
  const b = projectionEq([lambda, phi]);
  if (!a && !b) return null;
  if (!a) return b;
  if (!b) return a;
  return [a[0] * (1 - progreso) + b[0] * progreso, a[1] * (1 - progreso) + b[1] * progreso];
}

const proyeccionCustom = d3.geoProjection(function(lambda, phi) {
  const coord = proyeccionInterpolada(lambda * 180 / Math.PI, phi * 180 / Math.PI);
  return coord ? [(coord[0] - ancho / 2) / 220, -(coord[1] - alto / 2) / 220] : null;
}).scale(220).translate([ancho / 2, alto / 2]);

const path = d3.geoPath(proyeccionCustom);
const graticule = d3.geoGraticule10();

const defs = svg.append("defs");

const gradienteFondo = defs.append("radialGradient")
  .attr("id", "halo")
  .attr("cx", "50%")
  .attr("cy", "45%");

gradienteFondo.append("stop").attr("offset", "0%").attr("stop-color", "rgba(2, 132, 199, 0.15)");
gradienteFondo.append("stop").attr("offset", "100%").attr("stop-color", "rgba(2, 132, 199, 0)");

svg.append("rect")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("fill", "url(#halo)");

const gBase = svg.append("g");
const gRutas = svg.append("g");
const gPuntos = svg.append("g");

const esfera = { type: "Sphere" };

gBase.append("path")
  .datum(esfera)
  .attr("class", "esfera")
  .attr("fill", "rgba(2, 132, 199, 0.05)")
  .attr("stroke", "rgba(0, 34, 77, 0.1)")
  .attr("stroke-width", 1.1);

gBase.append("path")
  .datum(graticule)
  .attr("class", "reticula")
  .attr("fill", "none")
  .attr("stroke", "rgba(0, 34, 77, 0.05)")
  .attr("stroke-width", 0.7);

function normalizarFila(fila) {
  return {
    nombre: fila.nombre,
    coord: [Number(fila.lon), Number(fila.lat)],
    valor: fila.valor,
    color: fila.color
  };
}

function lineaCurva(origen, destino) {
  return {
    type: "LineString",
    coordinates: [origen, destino]
  };
}

async function cargarDatos() {
  const [socios, sectores, riesgo] = await Promise.all([
    d3.csv(URL_SOCIOS),
    d3.csv(URL_SECTORES),
    d3.csv(URL_RIESGO)
  ]);

  datos.socios = socios.map(normalizarFila);
  datos.sectores = sectores.map(normalizarFila);
  datos.riesgo = riesgo.map(normalizarFila);
}

async function iniciar() {
  const [mundo] = await Promise.all([
    d3.json(URL_MUNDO),
    cargarDatos()
  ]);

  const paises = topojson.feature(mundo, mundo.objects.countries);

  gBase.append("path")
    .datum(paises)
    .attr("class", "tierra")
    .attr("fill", "#FFFFFF")
    .attr("stroke", "rgba(0, 34, 77, 0.15)")
    .attr("stroke-width", 0.5);

  renderizar();
  animarGlobo();
}

function renderizar() {
  gBase.selectAll("path").attr("d", path);

  const puntos = datos[modo];
  const rutas = puntos.map(d => ({ ...d, geo: lineaCurva(mexico, d.coord) }));

  const selRutas = gRutas.selectAll("path").data(rutas, d => d.nombre);
  selRutas.join(
    enter => enter.append("path")
      .attr("fill", "none")
      .attr("stroke", d => d.color)
      .attr("stroke-width", d => modo === "riesgo" ? 2.4 : 2)
      .attr("stroke-linecap", "round")
      .attr("opacity", 0.9)
      .attr("stroke-dasharray", modo === "riesgo" ? "4 7" : "2 6")
      .attr("d", d => path(d.geo)),
    update => update
      .transition().duration(400)
      .attr("stroke", d => d.color)
      .attr("stroke-width", d => modo === "riesgo" ? 2.4 : 2)
      .attr("stroke-dasharray", modo === "riesgo" ? "4 7" : "2 6")
      .attr("d", d => path(d.geo)),
    exit => exit.remove()
  );

  const selPuntos = gPuntos.selectAll("g.punto").data(puntos, d => d.nombre);

  const enterPuntos = selPuntos.enter().append("g").attr("class", "punto");
  enterPuntos.append("circle").attr("r", 0);
  enterPuntos.append("circle").attr("class", "pulso").attr("r", 0).attr("fill", "none");
  enterPuntos.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", -12)
    .attr("fill", "#00224D")
    .attr("font-size", 11)
    .attr("font-weight", 700)
    .text(d => d.nombre);

  const todosPuntos = enterPuntos.merge(selPuntos);

  todosPuntos.each(function(d) {
    const coord = proyeccionInterpolada(d.coord[0], d.coord[1]);
    if (!coord) return;
    d3.select(this).attr("transform", `translate(${coord[0]},${coord[1]})`);
  });

  todosPuntos.select("circle:not(.pulso)")
    .transition().duration(400)
    .attr("r", 5.5)
    .attr("fill", d => d.color)
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 1.5);

  todosPuntos.select("circle.pulso")
    .attr("stroke", d => d.color)
    .attr("stroke-width", 1.4)
    .transition().duration(400)
    .attr("r", 11)
    .attr("opacity", 0.45);

  todosPuntos.select("text")
    .attr("opacity", progreso > 0.15 ? 1 : 0.7)
    .attr("font-size", progreso > 0.6 ? 12 : 10);

  todosPuntos
    .on("mousemove", function(event, d) {
      tooltip.style("opacity", 1)
        .style("transform", "translateY(0)")
        .html(`<strong>${d.nombre}</strong><div>${d.valor}</div>`)
        .style("left", `${event.offsetX + 18}px`)
        .style("top", `${event.offsetY + 18}px`);
    })
    .on("mouseleave", function() {
      tooltip.style("opacity", 0).style("transform", "translateY(8px)");
    });

  const mx = proyeccionInterpolada(mexico[0], mexico[1]);
  const marcaMexico = svg.selectAll("circle.mexico-base").data(mx ? [mx] : []);
  marcaMexico.join("circle")
    .attr("class", "mexico-base")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("r", 7)
    .attr("fill", "#ffffff")
    .attr("stroke", "#3dd9c5")
    .attr("stroke-width", 2.2);

  estadoTexto.textContent = progreso < 0.5 ? "Vista globo" : "Vista analítica";
  actualizarPanel();
}

function actualizarPanel() {
  const panel = paneles[modo];
  tituloPanel.textContent = panel.titulo;
  textoPanel.textContent = panel.texto;
  descripcionModo.textContent = panel.descripcion;
  detallePanel.innerHTML = panel.items.map(([a, b]) => `
    <div class="detalle-item">
      <span>${a}</span>
      <strong>${b}</strong>
    </div>
  `).join("");
}

function transicionarMeta(meta) {
  const inicio = progreso;
  d3.transition()
    .duration(1400)
    .ease(d3.easeCubicInOut)
    .tween("proyeccion", () => {
      const interp = d3.interpolateNumber(inicio, meta);
      return t => {
        progreso = interp(t);
        renderizar();
      };
    });
}

function animarGlobo() {
  d3.timer((elapsed) => {
    if (progreso > 0.08) return;
    projectionOrtho.rotate([102 - elapsed * 0.0035, -23]);
    renderizar();
  });
}

document.getElementById("btnTransicion").addEventListener("click", () => transicionarMeta(1));
document.getElementById("btnReset").addEventListener("click", () => {
  progreso = 0;
  projectionOrtho.rotate([102, -23]);
  renderizar();
});

document.querySelectorAll("#chipsModo .chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#chipsModo .chip").forEach(x => x.classList.remove("activo"));
    btn.classList.add("activo");
    modo = btn.dataset.modo;
    renderizar();
  });
});

iniciar();