const mexico = {
  nombre: "México",
  lat: 23.6345,
  lon: -102.5528
};

const URL_CSV = "/visores/comercio-mundo/csv/comercio-mundo.csv";
const URL_WORLD = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const contenedor = document.getElementById("app");
const panelPais = document.getElementById("pais-actual");
const panelDetalle = document.getElementById("detalle-actual");
const nombrePaisSuperior = document.getElementById("nombre-pais-superior");
const periodoPanel = document.getElementById("periodo-panel");

let width = contenedor.clientWidth;
let height = contenedor.clientHeight;
let dpr = window.devicePixelRatio || 1;

const canvas = document.createElement("canvas");
const contexto = canvas.getContext("2d");
contenedor.insertBefore(canvas, contenedor.firstChild);

let projection;
let path;
let land;
let borders;
let countriesFeatures = [];
let worldReady = false;
let tokenAnimacion = 0;
let paises = [];
let periodoActual = "—";

const tilt = 18;

let escalaGrosor = d3.scaleSqrt().domain([0, 1]).range([1.5, 5.5]);

function formatearValor(valor) {
  const signo = valor >= 0 ? "+" : "−";
  const abs = Math.abs(valor);

  if (abs >= 1e9) return `${signo}${(abs / 1e9).toFixed(2)} mil MDD`;
  if (abs >= 1e6) return `${signo}${(abs / 1e6).toFixed(2)} MDD`;
  return `${signo}${d3.format(",.0f")(abs)} USD`;
}

function colorPorValor(valor) {
  return valor >= 0 ? "#38bdf8" : "#ef4444";
}

class Versor {
  static fromAngles([l, p, g]) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;
    const sl = Math.sin(l), cl = Math.cos(l);
    const sp = Math.sin(p), cp = Math.cos(p);
    const sg = Math.sin(g), cg = Math.cos(g);
    return [
      cl * cp * cg + sl * sp * sg,
      sl * cp * cg - cl * sp * sg,
      cl * sp * cg + sl * cp * sg,
      cl * cp * sg - sl * sp * cg
    ];
  }

  static toAngles([a, b, c, d]) {
    return [
      Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
      Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
      Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI
    ];
  }

  static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return t => Versor.toAngles(i(t));
  }

  static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    a2 -= a1; b2 -= b1; c2 -= c1; d2 -= d1;
    const x = new Array(4);
    return t => {
      const l = Math.hypot(
        x[0] = a1 + a2 * t,
        x[1] = b1 + b2 * t,
        x[2] = c1 + c2 * t,
        x[3] = d1 + d2 * t
      );
      x[0] /= l; x[1] /= l; x[2] /= l; x[3] /= l;
      return x;
    };
  }

  static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) {
      a2 = -a2; b2 = -b2; c2 = -c2; d2 = -d2;
      dot = -dot;
    }
    if (dot > 0.9995) {
      return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]);
    }
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot(
      a2 -= a1 * dot,
      b2 -= b1 * dot,
      c2 -= c1 * dot,
      d2 -= d1 * dot
    );
    a2 /= l; b2 /= l; c2 /= l; d2 /= l;
    return t => {
      const theta = theta0 * t;
      const s = Math.sin(theta);
      const c = Math.cos(theta);
      x[0] = a1 * c + a2 * s;
      x[1] = b1 * c + b2 * s;
      x[2] = c1 * c + c2 * s;
      x[3] = d1 * c + d2 * s;
      return x;
    };
  }
}

function actualizarCanvas() {
  width = contenedor.clientWidth;
  height = contenedor.clientHeight;
  dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  contexto.setTransform(1, 0, 0, 1, 0, 0);
  contexto.scale(dpr, dpr);

  projection = d3.geoOrthographic()
    .fitExtent([[40, 40], [width - 40, height - 40]], { type: "Sphere" });

  path = d3.geoPath(projection, contexto);
}

function encontrarFeaturePais(nombreMapa) {
  return countriesFeatures.find(d =>
    d.properties &&
    d.properties.name &&
    d.properties.name.toLowerCase() === String(nombreMapa).toLowerCase()
  );
}

function estaVisible(lon, lat) {
  const centro = projection.invert([width / 2, height / 2]);
  if (!centro) return false;
  return d3.geoDistance([lon, lat], centro) <= Math.PI / 2;
}

function dibujarFondoEsfera() {
  contexto.beginPath();
  path({ type: "Sphere" });

  const grad = contexto.createRadialGradient(
    width * 0.42, height * 0.38, 30,
    width * 0.5, height * 0.5, Math.min(width, height) * 0.42
  );
  grad.addColorStop(0, "#0f1b34");
  grad.addColorStop(0.55, "#091427");
  grad.addColorStop(1, "#030712");

  contexto.fillStyle = grad;
  contexto.fill();
}

function dibujarGraticula() {
  const graticula = d3.geoGraticule10();
  contexto.beginPath();
  path(graticula);
  contexto.strokeStyle = "rgba(148, 163, 184, 0.10)";
  contexto.lineWidth = 0.7;
  contexto.stroke();
}

function dibujarGlowPunto([x, y], color, radioBase) {
  const grad = contexto.createRadialGradient(x, y, 0, x, y, radioBase * 4);
  grad.addColorStop(0, color + "ff");
  grad.addColorStop(0.35, color + "88");
  grad.addColorStop(1, color + "00");

  contexto.beginPath();
  contexto.fillStyle = grad;
  contexto.arc(x, y, radioBase * 4, 0, Math.PI * 2);
  contexto.fill();

  contexto.beginPath();
  contexto.fillStyle = color;
  contexto.arc(x, y, radioBase, 0, Math.PI * 2);
  contexto.fill();
}

function render(destino = null, arco = null, progresoPulso = 0) {
  contexto.clearRect(0, 0, width, height);

  dibujarFondoEsfera();
  dibujarGraticula();

  contexto.beginPath();
  path(land);
  contexto.fillStyle = "#cad5e1";
  contexto.fill();

  if (destino) {
    const featurePais = encontrarFeaturePais(destino.mapa);
    if (featurePais) {
      contexto.save();
      contexto.beginPath();
      path(featurePais);
      contexto.fillStyle = colorPorValor(destino.valor);
      contexto.shadowColor = colorPorValor(destino.valor);
      contexto.shadowBlur = 14;
      contexto.fill();
      contexto.restore();
    }
  }

  contexto.beginPath();
  path(borders);
  contexto.strokeStyle = "rgba(255,255,255,0.45)";
  contexto.lineWidth = 0.55;
  contexto.stroke();

  if (arco && destino) {
    contexto.save();
    contexto.beginPath();
    path(arco);
    contexto.strokeStyle = colorPorValor(destino.valor);
    contexto.lineWidth = escalaGrosor(Math.abs(destino.valor));
    contexto.shadowColor = colorPorValor(destino.valor);
    contexto.shadowBlur = 16;
    contexto.lineCap = "round";
    contexto.stroke();
    contexto.restore();
  }

  const puntoMexico = projection([mexico.lon, mexico.lat]);
  if (puntoMexico && estaVisible(mexico.lon, mexico.lat)) {
    dibujarGlowPunto(puntoMexico, "#f59e0b", 4.5 + progresoPulso);
  }

  if (destino) {
    const puntoDestino = projection([destino.lon, destino.lat]);
    if (puntoDestino && estaVisible(destino.lon, destino.lat)) {
      dibujarGlowPunto(puntoDestino, colorPorValor(destino.valor), 4 + progresoPulso * 0.7);
    }
  }

  contexto.beginPath();
  path({ type: "Sphere" });
  contexto.strokeStyle = "rgba(255,255,255,0.16)";
  contexto.lineWidth = 1.2;
  contexto.stroke();
}

function actualizarPanel(destino) {
  panelPais.textContent = destino.nombre;
  nombrePaisSuperior.textContent = destino.nombre;
  periodoPanel.textContent = periodoActual;

  panelDetalle.innerHTML = `
    <strong>Valor ${periodoActual}:</strong> ${formatearValor(destino.valor)}<br>
    <strong>Sentido visual:</strong> ${destino.valor >= 0 ? "positivo" : "negativo"}<br>
    <strong>Ruta:</strong> México → ${destino.nombre}
  `;
}

async function animarTour() {
  const miToken = ++tokenAnimacion;

  let p1 = [mexico.lon, mexico.lat];
  let r1 = [-mexico.lon, tilt - mexico.lat, 0];

  while (worldReady && miToken === tokenAnimacion) {
    for (const destino of paises) {
      if (miToken !== tokenAnimacion) return;

      actualizarPanel(destino);

      const p2 = [destino.lon, destino.lat];
      const r2 = [-p2[0], tilt - p2[1], 0];
      const interpolarGeo = d3.geoInterpolate(p1, p2);
      const interpolarRotacion = Versor.interpolateAngles(r1, r2);

      await d3.transition()
        .duration(1800)
        .ease(d3.easeCubicInOut)
        .tween("rotar", () => t => {
          projection.rotate(interpolarRotacion(t));
          render(destino, {
            type: "LineString",
            coordinates: [p1, interpolarGeo(Math.min(t, 0.85))]
          }, 0.8 * Math.sin(Math.PI * t));
        })
        .transition()
        .duration(1100)
        .ease(d3.easeLinear)
        .tween("trazar", () => t => {
          render(destino, {
            type: "LineString",
            coordinates: [interpolarGeo(t), p2]
          }, 0.5 * Math.sin(Math.PI * t));
        })
        .end();

      await new Promise(resolve => setTimeout(resolve, 900));

      p1 = p2;
      r1 = r2;
    }
  }
}

function normalizarFila(fila) {
  return {
    nombre: fila.nombre,
    mapa: fila.mapa,
    lat: Number(fila.lat),
    lon: Number(fila.lon),
    valor: Number(fila.valor)
  };
}

async function cargarCSV() {
  const filas = await d3.csv(URL_CSV);

  if (!filas.length) {
    throw new Error("El CSV está vacío.");
  }

  const columnasEsperadas = ["nombre", "mapa", "lat", "lon", "valor"];
  const faltantes = columnasEsperadas.filter(col => !filas.columns.includes(col));

  if (faltantes.length) {
    throw new Error(`Faltan columnas en el CSV: ${faltantes.join(", ")}`);
  }

  periodoActual = filas[0].periodo || "—";

  paises = filas
    .filter(fila =>
      fila.nombre &&
      fila.mapa &&
      fila.lat &&
      fila.lon &&
      fila.valor !== ""
    )
    .map(normalizarFila);

  if (!paises.length) {
    throw new Error("No hay países válidos en el CSV.");
  }

  escalaGrosor = d3.scaleSqrt()
    .domain(d3.extent(paises, d => Math.abs(d.valor)))
    .range([1.5, 5.5]);
}

async function cargarMapa() {
  const world = await d3.json(URL_WORLD);

  land = topojson.feature(world, world.objects.land);
  borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
  countriesFeatures = topojson.feature(world, world.objects.countries).features;
}

async function iniciar() {
  try {
    actualizarCanvas();

    await Promise.all([
      cargarMapa(),
      cargarCSV()
    ]);

    worldReady = true;
    render();
    animarTour();
  } catch (error) {
    console.error("Error al cargar comercio-mundo:", error);
    panelPais.textContent = "Carga fallida";
    nombrePaisSuperior.textContent = "Error al cargar datos";
    panelDetalle.innerHTML = `<strong>Error:</strong> ${error.message}`;
    periodoPanel.textContent = "Error";
  }
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    actualizarCanvas();
    if (worldReady) {
      render();
      animarTour();
    }
  }, 120);
});

iniciar();