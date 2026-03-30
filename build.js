/**
 * build.js — Genera index.html para Urb. Terdemol
 * Uso: node build.js
 *
 * Lee la imagen del plano desde terdemol_mapa.jsx (línea 1)
 * y combina con el código de _app.jsx para producir un único index.html
 * listo para abrir en el navegador o subir a cualquier hosting.
 */

const fs = require("fs");
const path = require("path");
const Babel = require("@babel/standalone");

const dir = __dirname;

// 1. Extraer PLANO_IMG de terdemol_mapa.jsx (busca la línea que contiene PLANO_IMG)
const mapaRaw = fs.readFileSync(path.join(dir, "terdemol_mapa.jsx"), "utf8");
const planoLine = mapaRaw.split("\n").find(l => l.startsWith("const PLANO_IMG"));
if (!planoLine) {
  console.error("❌  No se encontró PLANO_IMG en terdemol_mapa.jsx");
  process.exit(1);
}
// planoLine es: const PLANO_IMG = "data:image/jpeg;base64,...";
// La transformamos para asignarla a window.__PLANO_IMG
const planoAssignment = planoLine.trim().replace("const PLANO_IMG", "window.__PLANO_IMG");

// 2. Leer y precompilar el código de la app (JSX → JS puro)
const appRaw = fs.readFileSync(path.join(dir, "_app.jsx"), "utf8");
const appCode = Babel.transform(appRaw, { presets: ["react"] }).code;

// 3. Leer firebase-config.js (si existe y tiene valores reales)
const firebaseConfigPath = path.join(dir, "firebase-config.js");
let firebaseConfigCode = "";
let firebaseReady = false;
try {
  firebaseConfigCode = fs.readFileSync(firebaseConfigPath, "utf8");
  firebaseReady = !firebaseConfigCode.includes("PEGAR-AQUI");
} catch { /* archivo no existe aún */ }

const firebaseScripts = `
  <!-- Firebase 10 compat (Firestore) -->
  <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js"></script>`;

const firebaseInitBlock = firebaseReady
  ? `<!-- Firebase config + inicialización -->
<script>
${firebaseConfigCode}
if (window.__FIREBASE_CONFIG) {
  firebase.initializeApp(window.__FIREBASE_CONFIG);
}
</script>`
  : `<!-- firebase-config.js no configurado aún — usando localStorage como fallback -->
<script>
window.__FIREBASE_CONFIG = null;
</script>`;

const storageStatus = firebaseReady
  ? "☁️  Firebase Firestore configurado"
  : "⚠️   Firebase no configurado → datos en localStorage (solo este dispositivo)";

// 4. Construir el HTML final
const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <meta name="description" content="Urb. Terdemol Santivañez — Control de Ventas de Lotes">
  <title>Urb. Terdemol · Santivañez</title>

  <!-- React 18 -->${firebaseScripts}
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <!-- Fuente -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap" rel="stylesheet">

  <style>
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    html, body { margin: 0; padding: 0; }
    body { font-family: 'DM Sans', 'Segoe UI', sans-serif; }
    ::-webkit-scrollbar { display: none; }
    select, input, textarea { font-family: inherit; }
  </style>
</head>
<body>

<div id="root">
  <!-- Pantalla de carga mientras Babel transpila -->
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;">
    <div style="text-align:center;color:#64748b;">
      <div style="font-size:40px;margin-bottom:12px">🏘️</div>
      <div style="font-weight:700;color:#94a3b8;font-family:sans-serif">Cargando Terdemol...</div>
    </div>
  </div>
</div>

<!-- Script 1: imagen del plano -->
<script>
${planoAssignment}
</script>

<!-- Script 2: Firebase config -->
${firebaseInitBlock}

<!-- Script 3: app React (precompilada) -->
<script>
${appCode}
</script>

</body>
</html>`;

// 5. Escribir el archivo
const outPath = path.join(dir, "index.html");
fs.writeFileSync(outPath, html, "utf8");

const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
console.log("✅  index.html generado correctamente");
console.log("    Tamaño: " + sizeKB + " KB");
console.log("    Ruta:   " + outPath);
console.log("    Storage: " + storageStatus);
console.log("");
if (!firebaseReady) {
  console.log("⚠️  Para activar la base de datos en la nube:");
  console.log("    1. Crea un proyecto en https://console.firebase.google.com");
  console.log("    2. Activa Firestore Database");
  console.log("    3. Rellena firebase-config.js con tus credenciales");
  console.log("    4. Ejecuta node build.js de nuevo");
  console.log("");
}
console.log("👉  Para abrirlo: doble clic en index.html");
console.log("👉  Para regenerar después de cambios: node build.js");
