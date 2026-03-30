// La imagen del plano es inyectada por build.js via window.__PLANO_IMG
const PLANO_IMG = window.__PLANO_IMG;
const { useState, useEffect } = React;

// ─── DATOS COMPARTIDOS ────────────────────────────────────────────────────────
const MANZANAS_INIT = {
  A: [{ id:"A-01", sup:294.52 }, { id:"A-02", sup:299.96 }, { id:"A-03", sup:300.0 }, { id:"A-04", sup:291.95 }, { id:"A-05", sup:300.0 }, { id:"A-06", sup:600.0 }, { id:"A-07", sup:300.01 }, { id:"A-08", sup:300.0 }, { id:"A-09", sup:600.0 }, { id:"A-10", sup:309.45 }, { id:"A-11", sup:300.0 }],
  B: [{ id:"B-01", sup:293.72 }, { id:"B-02", sup:300.0 }, { id:"B-03", sup:300.0 }, { id:"B-04", sup:291.95 }, { id:"B-05", sup:300.0 }, { id:"B-06", sup:300.0 }, { id:"B-07", sup:300.0 }, { id:"B-08", sup:300.0 }, { id:"B-09", sup:300.0 }, { id:"B-10", sup:300.0 }, { id:"B-11", sup:300.0 }, { id:"B-12", sup:300.0 }, { id:"B-13", sup:300.0 }],
  C: [{ id:"C-01", sup:317.29 }, { id:"C-02", sup:301.29 }, { id:"C-03", sup:325.12 }, { id:"C-04", sup:301.29 }, { id:"C-05", sup:332.98 }, { id:"C-06", sup:301.29 }, { id:"C-07", sup:291.93 }, { id:"C-08", sup:301.26 }, { id:"C-09", sup:262.96 }, { id:"C-10", sup:282.0 }, { id:"C-11", sup:272.41 }, { id:"C-12", sup:292.86 }],
  D: [{ id:"D-01", sup:300.0 }, { id:"D-02", sup:300.0 }, { id:"D-03", sup:300.0 }, { id:"D-04", sup:300.0 }, { id:"D-05", sup:292.86 }, { id:"D-06", sup:285.13 }, { id:"D-07", sup:285.13 }, { id:"D-08", sup:292.87 }],
  E: [{ id:"E-01", sup:319.45 }, { id:"E-02", sup:323.67 }, { id:"E-03", sup:323.72 }, { id:"E-04", sup:323.62 }, { id:"E-05", sup:370.05 }, { id:"E-06", sup:316.98 }, { id:"E-07", sup:291.62 }, { id:"E-08", sup:336.73 }, { id:"E-09", sup:300.03 }, { id:"E-10", sup:300.0 }, { id:"E-11", sup:300.0 }, { id:"E-12", sup:448.9 }],
  F: [{ id:"F-01", sup:345.16 }, { id:"F-02", sup:306.0 }, { id:"F-03", sup:300.0 }, { id:"F-04", sup:300.0 }, { id:"F-05", sup:292.51 }, { id:"F-06", sup:349.32 }, { id:"F-07", sup:300.0 }, { id:"F-08", sup:429.76 }, { id:"F-09", sup:300.0 }, { id:"F-10", sup:494.09 }, { id:"F-11", sup:300.0 }],
  G: [{ id:"G-01", sup:293.21 }, { id:"G-02", sup:288.59 }, { id:"G-03", sup:294.44 }, { id:"G-04", sup:292.51 }, { id:"G-05", sup:300.0 }, { id:"G-06", sup:288.96 }, { id:"G-07", sup:300.0 }, { id:"G-08", sup:300.0 }, { id:"G-09", sup:300.0 }, { id:"G-10", sup:300.0 }, { id:"G-11", sup:300.0 }, { id:"G-12", sup:300.0 }, { id:"G-13", sup:300.0 }],
  H: [{ id:"H-01", sup:322.33 }, { id:"H-02", sup:300.0 }, { id:"H-03", sup:303.8 }, { id:"H-04", sup:300.0 }, { id:"H-05", sup:300.0 }, { id:"H-06", sup:300.0 }, { id:"H-07", sup:319.41 }],
  I: [{ id:"I-01", sup:351.25 }, { id:"I-02", sup:300.0 }, { id:"I-03", sup:265.79 }, { id:"I-04", sup:556.9 }, { id:"I-05", sup:300.0 }, { id:"I-06", sup:291.12 }, { id:"I-07", sup:292.87 }, { id:"I-08", sup:280.0 }, { id:"I-09", sup:280.0 }, { id:"I-10", sup:280.0 }, { id:"I-11", sup:295.61 }, { id:"I-12", sup:292.13 }],
  J: [{ id:"J-01", sup:300.0 }, { id:"J-02", sup:300.0 }, { id:"J-03", sup:300.0 }, { id:"J-04", sup:300.0 }, { id:"J-05", sup:300.0 }, { id:"J-06", sup:300.0 }, { id:"J-07", sup:300.0 }, { id:"J-08", sup:300.0 }],
  K: [{ id:"K-01", sup:292.87 }, { id:"K-02", sup:300.0 }, { id:"K-03", sup:300.0 }, { id:"K-04", sup:300.0 }, { id:"K-05", sup:309.14 }, { id:"K-06", sup:300.0 }, { id:"K-07", sup:300.0 }],
  L: [{ id:"L-01", sup:300.0 }, { id:"L-02", sup:309.29 }, { id:"L-03", sup:300.0 }, { id:"L-04", sup:300.0 }, { id:"L-05", sup:300.0 }, { id:"L-06", sup:948.64 }, { id:"L-07", sup:348.64 }],
  M: [{ id:"M-01", sup:300.0 }, { id:"M-02", sup:300.0 }, { id:"M-03", sup:293.56 }, { id:"M-04", sup:300.0 }, { id:"M-05", sup:600.0 }, { id:"M-06", sup:300.0 }, { id:"M-07", sup:300.0 }, { id:"M-08", sup:300.0 }, { id:"M-09", sup:299.99 }, { id:"M-10", sup:292.14 }],
  N: [{ id:"N-01", sup:292.86 }, { id:"N-02", sup:300.0 }, { id:"N-03", sup:364.66 }, { id:"N-04", sup:398.5 }, { id:"N-05", sup:327.42 }],
  O: [{ id:"O-01", sup:478.24 }, { id:"O-02", sup:300.0 }, { id:"O-03", sup:300.0 }, { id:"O-04", sup:293.55 }, { id:"O-05", sup:376.45 }, { id:"O-06", sup:300.0 }, { id:"O-07", sup:300.0 }, { id:"O-08", sup:318.86 }],
};

const STATUS = {
  disponible: { label:"Disponible", color:"#22c55e", bg:"#dcfce7", text:"#166534" },
  reservado:  { label:"Reservado",  color:"#f59e0b", bg:"#fef3c7", text:"#92400e" },
  vendido:    { label:"Vendido",    color:"#ef4444", bg:"#fee2e2", text:"#991b1b" },
};

const STORAGE_KEY        = "terdemol-lots-v1";
const FIRESTORE_DOC      = "terdemol/lots";
const BACKUP_COLLECTION  = "terdemol_backups";
const CONFIG_PLACEHOLDER = "PEGAR-AQUI";

// Devuelve true si Firebase está inicializado con una config real
function firebaseReady() {
  const cfg = window.__FIREBASE_CONFIG;
  return cfg && cfg.apiKey && cfg.apiKey !== CONFIG_PLACEHOLDER && typeof firebase !== "undefined";
}

async function loadLots() {
  if (firebaseReady()) {
    try {
      const snap = await firebase.firestore().doc(FIRESTORE_DOC).get();
      if (snap.exists) return snap.data().lots || null;
      return null; // documento aún vacío
    } catch(e) {
      console.warn("Firestore no disponible, usando localStorage:", e.message);
    }
  }
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}

// Guarda el estado principal + un backup en un único batch atómico
// meta = { lotId, modifiedBy } para el registro de auditoría
async function saveLots(data, meta = {}) {
  const timestamp = new Date().toISOString();
  if (firebaseReady()) {
    try {
      const db = firebase.firestore();
      const batch = db.batch();
      batch.set(db.doc(FIRESTORE_DOC), { lots: data });
      batch.set(db.collection(BACKUP_COLLECTION).doc(timestamp), {
        lots: data, timestamp,
        lotId:      meta.lotId      || null,
        modifiedBy: meta.modifiedBy || "?",
      });
      await batch.commit();
      return;
    } catch(e) {
      console.warn("Firestore no disponible, guardando en localStorage:", e.message);
    }
  }
  // Fallback localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem("terdemol-backup-last", JSON.stringify({ lots: data, timestamp, ...meta }));
  } catch {}
}

// ─── AUTH / CONFIG ────────────────────────────────────────────────────────────
const AUTH_KEY   = "terdemol-auth-v1";
const CONFIG_DOC = "terdemol/config";

function getStoredAuth() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
}
function storeAuth(auth) {
  try { localStorage.setItem(AUTH_KEY, JSON.stringify(auth)); } catch {}
}
function clearStoredAuth() {
  try { localStorage.removeItem(AUTH_KEY); } catch {}
}

async function getAdminConfig() {
  if (firebaseReady()) {
    try {
      const snap = await firebase.firestore().doc(CONFIG_DOC).get();
      return snap.exists ? snap.data() : {};
    } catch(e) { console.warn(e.message); }
  }
  return {};
}
async function saveAdminConfig(data) {
  if (firebaseReady()) {
    try {
      await firebase.firestore().doc(CONFIG_DOC).set(data, { merge: true });
      return true;
    } catch(e) { console.warn(e.message); }
  }
  return false;
}

async function loadHistory(limitN = 30) {
  if (!firebaseReady()) return [];
  try {
    const snap = await firebase.firestore()
      .collection(BACKUP_COLLECTION)
      .orderBy("timestamp", "desc")
      .limit(limitN)
      .get();
    return snap.docs.map(d => d.data());
  } catch(e) { console.warn("Historial:", e.message); return []; }
}

function formatDate(iso) {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60)    return "ahora";
  if (diff < 3600)  return Math.floor(diff / 60) + " min";
  if (diff < 86400) return Math.floor(diff / 3600) + " h";
  return new Date(iso).toLocaleDateString("es-BO", { day:"2-digit", month:"2-digit", year:"2-digit" });
}

function buildInitialState() {
  const state = {};
  Object.values(MANZANAS_INIT).flat().forEach(lot => {
    state[lot.id] = { status:"disponible", comprador:"", precio:"", nota:"", origen:"", origenSecundario:"" };
  });
  return state;
}

// ─── HELPERS MAPA ─────────────────────────────────────────────────────────────
function getMzaStats(mza, lots) {
  const lotes = MANZANAS_INIT[mza] || [];
  const total = lotes.length;
  const vendidos = lotes.filter(l => lots[l.id]?.status === "vendido").length;
  const reservados = lotes.filter(l => lots[l.id]?.status === "reservado").length;
  const disponibles = total - vendidos - reservados;
  const pctVendido = total > 0 ? Math.round((vendidos / total) * 100) : 0;
  return { total, vendidos, reservados, disponibles, pctVendido };
}

function getMzaColor(stats) {
  const { vendidos, reservados, total } = stats;
  if (vendidos === total) return "#ef4444";
  if (vendidos > 0 || reservados > 0) {
    const pct = (vendidos + reservados) / total;
    if (pct > 0.66) return "#f97316";
    if (pct > 0.33) return "#f59e0b";
    return "#84cc16";
  }
  return "#22c55e";
}

const MZA_POSITIONS = Object.fromEntries(
  Object.keys(MANZANAS_INIT).map((mza, i) => {
    // Posiciones aproximadas distribuidas en la imagen; ajustar si es necesario
    const positions = {
      A:{x:62,y:28}, B:{x:55,y:33}, C:{x:48,y:30},
      D:{x:40,y:27}, E:{x:54,y:22}, F:{x:46,y:20},
      G:{x:54,y:18}, H:{x:62,y:18}, I:{x:68,y:23},
      J:{x:18,y:52}, K:{x:55,y:52}, L:{x:42,y:62},
      M:{x:50,y:62}, N:{x:40,y:55}, O:{x:55,y:58},
    };
    return [mza, positions[mza] || { x: 50, y: 50 }];
  })
);

// ─── UI COMPARTIDA ────────────────────────────────────────────────────────────
const inputStyle = {
  width:"100%", padding:"10px 12px", borderRadius:8,
  border:"2px solid #e2e8f0", fontSize:13, color:"#0f172a",
  outline:"none", fontFamily:"inherit", boxSizing:"border-box",
  background:"#f8fafc", resize:"vertical",
};

const Icon = ({ name }) => {
  const icons = {
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={14} height={14}><polyline points="20 6 9 17 4 12"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={14} height={14}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    x:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={14} height={14}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    search:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    save:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  };
  return icons[name] || null;
};

function Badge({ status }) {
  const s = STATUS[status];
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      padding:"2px 8px", borderRadius:99,
      background:s.bg, color:s.text,
      fontSize:11, fontWeight:700, letterSpacing:"0.04em",
    }}>
      {status === "disponible" && <Icon name="check"/>}
      {status === "reservado" && <Icon name="clock"/>}
      {status === "vendido" && <Icon name="x"/>}
      {s.label}
    </span>
  );
}

// ─── MODAL MANZANA (vista mapa) ───────────────────────────────────────────────
// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [tab, setTab] = useState("promotor");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstSetup, setFirstSetup] = useState(false);

  useEffect(() => {
    if (tab === "admin") {
      getAdminConfig().then(cfg => setFirstSetup(!cfg.adminPassword));
    }
  }, [tab]);

  const handlePromotor = () => {
    if (!name.trim()) { setError("Ingresa tu nombre"); return; }
    const auth = { role: "promotor", name: name.trim() };
    storeAuth(auth);
    onLogin(auth);
  };

  const handleAdmin = async () => {
    if (!password) { setError("Ingresa la contraseña"); return; }
    setLoading(true);
    setError("");
    try {
      const cfg = await getAdminConfig();
      if (!cfg.adminPassword) {
        await saveAdminConfig({ adminPassword: password });
        const auth = { role: "admin", name: "Admin" };
        storeAuth(auth);
        onLogin(auth);
      } else if (cfg.adminPassword === password) {
        const auth = { role: "admin", name: "Admin" };
        storeAuth(auth);
        onLogin(auth);
      } else {
        setError("Contraseña incorrecta");
      }
    } catch { setError("Error de conexión"); }
    setLoading(false);
  };

  const darkInput = { ...inputStyle, background:"#1e293b", border:"2px solid #334155", color:"#fff" };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f172a", padding:16 }}>
      <div style={{ width:"100%", maxWidth:360 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🏘️</div>
          <div style={{ fontWeight:900, fontSize:22, color:"#fff" }}>Urb. Terdemol</div>
          <div style={{ fontSize:12, color:"#475569" }}>Santivañez · Control de Ventas</div>
        </div>

        <div style={{ display:"flex", background:"#1e293b", borderRadius:12, padding:4, marginBottom:24 }}>
          {[["promotor","👤 Promotor"],["admin","🔑 Administrador"]].map(([v, lbl]) => (
            <button key={v} onClick={() => { setTab(v); setError(""); }} style={{
              flex:1, padding:"10px 8px", borderRadius:9, border:"none", cursor:"pointer",
              background: tab === v ? "#3b82f6" : "transparent",
              color: tab === v ? "#fff" : "#64748b",
              fontWeight:700, fontSize:13, transition:"all 0.15s",
            }}>{lbl}</button>
          ))}
        </div>

        {tab === "promotor" && (
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Tu nombre</div>
            <input
              value={name} onChange={e => { setName(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handlePromotor()}
              placeholder="Ej: Juan Pérez" autoFocus style={{ ...darkInput, marginBottom:16 }}
            />
            {error && <div style={{ color:"#f87171", fontSize:12, marginBottom:12 }}>{error}</div>}
            <button onClick={handlePromotor} style={{
              width:"100%", padding:"13px", borderRadius:10, border:"none",
              background:"#3b82f6", color:"#fff", fontWeight:800, fontSize:14, cursor:"pointer",
            }}>Entrar</button>
          </div>
        )}

        {tab === "admin" && (
          <div>
            {firstSetup && (
              <div style={{ background:"#1e3a5f", border:"1px solid #3b82f6", borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:12, color:"#93c5fd" }}>
                Primera vez: establece la contraseña de administrador
              </div>
            )}
            <div style={{ fontSize:11, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>
              {firstSetup ? "Nueva contraseña" : "Contraseña"}
            </div>
            <input
              type="password" value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleAdmin()}
              placeholder="••••••••" autoFocus style={{ ...darkInput, marginBottom:16 }}
            />
            {error && <div style={{ color:"#f87171", fontSize:12, marginBottom:12 }}>{error}</div>}
            <button onClick={handleAdmin} disabled={loading} style={{
              width:"100%", padding:"13px", borderRadius:10,
              border:"2px solid #3b82f6",
              background: loading ? "#1e293b" : "#0f172a",
              color:"#fff", fontWeight:800, fontSize:14,
              cursor: loading ? "wait" : "pointer",
            }}>
              {loading ? "Verificando..." : (firstSetup ? "Establecer contraseña" : "Ingresar")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MzaModal({ mza, lots, onClose, onSaveLot }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(null);
  const lotes = MANZANAS_INIT[mza];
  const stats = getMzaStats(mza, lots);

  const openLot = (lot) => {
    setSelected(lot);
    setForm({ ...(lots[lot.id] || { status:"disponible", comprador:"", precio:"", nota:"" }) });
  };

  const handleSave = () => {
    onSaveLot(selected.id, form);
    setSelected(null);
  };

  if (selected && form) return (
    <div
      style={{ position:"fixed", inset:0, background:"#000a", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, padding:16 }}
      onClick={e => e.target === e.currentTarget && setSelected(null)}
    >
      <div style={{ background:"#fff", borderRadius:16, padding:24, width:"100%", maxWidth:420, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 60px #0004" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:18, color:"#0f172a" }}>Lote {selected.id}</div>
            <div style={{ fontSize:12, color:"#94a3b8" }}>{selected.sup.toFixed(2)} m²</div>
          </div>
          <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:20, color:"#94a3b8", lineHeight:1 }}>✕</button>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Estado</div>
          <div style={{ display:"flex", gap:8 }}>
            {Object.entries(STATUS).map(([k, s]) => (
              <button key={k} onClick={() => setForm(f => ({ ...f, status:k }))} style={{
                flex:1, padding:"8px 4px", borderRadius:8, cursor:"pointer",
                border:"2px solid " + (form.status === k ? s.color : "#e2e8f0"),
                background: form.status === k ? s.bg : "#f8fafc",
                color: form.status === k ? s.text : "#94a3b8",
                fontWeight:700, fontSize:11,
              }}>{s.label}</button>
            ))}
          </div>
        </div>
        {[
          { key:"comprador", label:"Comprador", placeholder:"Nombre completo", type:"text" },
          { key:"precio", label:"Precio (Bs.)", placeholder:"Ej: 45000", type:"number" },
          { key:"nota", label:"Observaciones", placeholder:"Notas...", type:"textarea" },
        ].map(({ key, label, placeholder, type }) => (
          <div key={key} style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>{label}</div>
            {type === "textarea"
              ? <textarea rows={3} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))} placeholder={placeholder} style={inputStyle}/>
              : <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))} placeholder={placeholder} style={inputStyle}/>
            }
          </div>
        ))}
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => setSelected(null)} style={{ flex:1, padding:"11px", borderRadius:10, border:"2px solid #e2e8f0", background:"#f8fafc", fontWeight:700, fontSize:13, cursor:"pointer", color:"#64748b" }}>Cancelar</button>
          <button onClick={handleSave} style={{ flex:2, padding:"11px", borderRadius:10, border:"none", background:"#0f172a", color:"#fff", fontWeight:800, fontSize:13, cursor:"pointer" }}>💾 Guardar</button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{ position:"fixed", inset:0, background:"#000a", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:16 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background:"#fff", borderRadius:16, padding:24, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 60px #0004" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:20, color:"#0f172a" }}>Manzana {mza}</div>
            <div style={{ fontSize:12, color:"#94a3b8" }}>{stats.total} lotes · {stats.vendidos} vendidos · {stats.reservados} reservados</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:"#94a3b8" }}>✕</button>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          {[
            ["✅","disponibles",stats.disponibles,"#dcfce7","#166534"],
            ["⏳","reservados",stats.reservados,"#fef3c7","#92400e"],
            ["🔴","vendidos",stats.vendidos,"#fee2e2","#991b1b"],
          ].map(([icon, lbl, val, bg, col]) => (
            <div key={lbl} style={{ flex:1, background:bg, borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
              <div style={{ fontSize:18 }}>{icon}</div>
              <div style={{ fontWeight:900, fontSize:18, color:col }}>{val}</div>
              <div style={{ fontSize:10, color:col, textTransform:"uppercase", letterSpacing:"0.06em" }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:8 }}>
          {lotes.map(lot => {
            const d = lots[lot.id] || { status:"disponible" };
            const s = STATUS[d.status];
            return (
              <button key={lot.id} onClick={() => openLot(lot)} style={{
                textAlign:"left", cursor:"pointer", padding:"10px 12px",
                borderRadius:10, border:"2px solid " + s.color,
                background: d.status !== "disponible" ? s.bg : "#f8fafc",
                transition:"all 0.15s", outline:"none",
              }}>
                <div style={{ fontWeight:800, fontSize:12, color:"#0f172a" }}>Lote {lot.id}</div>
                <div style={{ fontSize:10, color:"#94a3b8", marginTop:2 }}>{lot.sup.toFixed(0)} m²</div>
                <div style={{ fontSize:10, fontWeight:700, color:s.text, marginTop:4 }}>{s.label}</div>
                {d.comprador && <div style={{ fontSize:10, color:"#475569", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>👤 {d.comprador}</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── MODAL VENTAS (edición detallada) ────────────────────────────────────────
function VentasModal({ lot, data, onClose, onSave }) {
  const [form, setForm] = useState({ ...data });
  if (!lot) return null;
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));

  return (
    <div
      style={{ position:"fixed", inset:0, background:"#00000088", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:16 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background:"#fff", borderRadius:16, padding:24, width:"100%", maxWidth:440, boxShadow:"0 20px 60px #0003", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:18, color:"#0f172a" }}>Lote {lot.id}</div>
            <div style={{ fontSize:12, color:"#94a3b8" }}>{lot.sup.toFixed(2)} m²</div>
            {data.modifiedBy && (
              <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>
                ✏️ {data.modifiedBy} · {formatDate(data.modifiedAt)}
              </div>
            )}
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", padding:4 }}>
            <Icon name="close"/>
          </button>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:8 }}>Estado</label>
          <div style={{ display:"flex", gap:8 }}>
            {Object.entries(STATUS).map(([key, s]) => (
              <button key={key} onClick={() => set("status", key)} style={{
                flex:1, padding:"8px 4px", borderRadius:8, cursor:"pointer",
                border:"2px solid " + (form.status === key ? s.color : "#e2e8f0"),
                background: form.status === key ? s.bg : "#f8fafc",
                color: form.status === key ? s.text : "#94a3b8",
                fontWeight:700, fontSize:11, transition:"all 0.15s",
              }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {[
          { key:"comprador", label:"Nombre del Comprador", placeholder:"Ej: Juan Pérez", type:"text" },
          { key:"precio", label:"Precio de Venta (Bs.)", placeholder:"Ej: 45000", type:"number" },
          { key:"nota", label:"Observaciones", placeholder:"Notas adicionales...", type:"textarea" },
        ].map(({ key, label, placeholder, type }) => (
          <div key={key} style={{ marginBottom:14 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:6 }}>{label}</label>
            {type === "textarea"
              ? <textarea rows={3} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} style={inputStyle}/>
              : <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} style={inputStyle}/>
            }
          </div>
        ))}
        <button onClick={() => onSave(lot.id, form)} style={{
          width:"100%", padding:"12px", borderRadius:10, border:"none",
          background:"#0f172a", color:"#fff", fontWeight:800, fontSize:14,
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          <Icon name="save"/> Guardar Cambios
        </button>
      </div>
    </div>
  );
}

// ─── VISTA MAPA ───────────────────────────────────────────────────────────────
function MapaView({ lots, onSaveLot }) {
  const [activeMza, setActiveMza] = useState(null);
  const [subView, setSubView] = useState("mapa");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleSave = (lotId, form) => {
    onSaveLot(lotId, form);
    setActiveMza(null);
    showToast("✓ Lote " + lotId + " guardado");
  };

  const allLots = Object.values(MANZANAS_INIT).flat();
  const total = allLots.length;
  const vendidos = allLots.filter(l => lots[l.id]?.status === "vendido").length;
  const reservados = allLots.filter(l => lots[l.id]?.status === "reservado").length;
  const disponibles = total - vendidos - reservados;

  return (
    <div style={{ minHeight:"100vh", background:"#0f172a", color:"#fff" }}>
      {/* Stats + sub-tabs */}
      <div style={{ background:"#0f172a", borderBottom:"1px solid #1e293b", padding:"12px 16px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontSize:12, color:"#475569" }}>Toca una manzana para editar sus lotes</div>
            <div style={{ display:"flex", gap:6 }}>
              {[["mapa","🗺️ Mapa"],["lista","📋 Lista"]].map(([v, lbl]) => (
                <button key={v} onClick={() => setSubView(v)} style={{
                  padding:"6px 12px", borderRadius:8, border:"none", cursor:"pointer",
                  background: subView === v ? "#3b82f6" : "#1e293b",
                  color: subView === v ? "#fff" : "#64748b",
                  fontWeight:700, fontSize:12,
                }}>{lbl}</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:2, scrollbarWidth:"none" }}>
            {[
              { label:"Total", val:total, c:"#94a3b8" },
              { label:"Disponibles", val:disponibles, c:"#22c55e" },
              { label:"Reservados", val:reservados, c:"#f59e0b" },
              { label:"Vendidos", val:vendidos, c:"#ef4444" },
              { label:"% Vendido", val:Math.round(vendidos/total*100)+"%", c:"#818cf8" },
            ].map(s => (
              <div key={s.label} style={{ background:"#1e293b", borderRadius:10, padding:"8px 14px", minWidth:80, flexShrink:0, textAlign:"center" }}>
                <div style={{ fontWeight:900, fontSize:18, color:s.c }}>{s.val}</div>
                <div style={{ fontSize:10, color:"#475569" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"16px" }}>
        {subView === "mapa" ? (
          <div>
            <div style={{ position:"relative", borderRadius:16, overflow:"hidden", border:"2px solid #1e293b", background:"#1e293b" }}>
              <img src={PLANO_IMG} alt="Plano Terdemol" style={{ width:"100%", display:"block", opacity:0.85 }}/>
              {Object.entries(MZA_POSITIONS).map(([mza, pos]) => {
                const stats = getMzaStats(mza, lots);
                const color = getMzaColor(stats);
                return (
                  <button key={mza} onClick={() => setActiveMza(mza)} style={{
                    position:"absolute",
                    left:pos.x + "%", top:pos.y + "%",
                    transform:"translate(-50%,-50%)",
                    background:color,
                    border:"2px solid #fff",
                    borderRadius:8, cursor:"pointer",
                    padding:"4px 8px", minWidth:52,
                    textAlign:"center",
                    boxShadow:"0 2px 12px " + color + "99",
                    transition:"all 0.15s",
                    zIndex:10,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.15)"; e.currentTarget.style.zIndex = "20"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1)"; e.currentTarget.style.zIndex = "10"; }}
                  >
                    <div style={{ fontWeight:900, fontSize:13, color:"#fff", lineHeight:1 }}>{mza}</div>
                    <div style={{ fontSize:9, color:"#fff", opacity:0.9, lineHeight:1.2 }}>{stats.vendidos}/{stats.total}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:14, flexWrap:"wrap" }}>
              {[
                { color:"#22c55e", label:"0% vendido" },
                { color:"#84cc16", label:"<33%" },
                { color:"#f59e0b", label:"33–66%" },
                { color:"#f97316", label:">66%" },
                { color:"#ef4444", label:"100% vendido" },
              ].map(l => (
                <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:14, height:14, borderRadius:4, background:l.color }}/>
                  <span style={{ fontSize:11, color:"#64748b" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {Object.keys(MANZANAS_INIT).map(mza => {
              const stats = getMzaStats(mza, lots);
              const color = getMzaColor(stats);
              return (
                <button key={mza} onClick={() => setActiveMza(mza)} style={{
                  width:"100%", textAlign:"left", cursor:"pointer",
                  background:"#1e293b", border:"2px solid " + color + "44",
                  borderRadius:12, padding:"14px 16px", marginBottom:10,
                  display:"flex", alignItems:"center", gap:14, outline:"none",
                  transition:"all 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color}
                onMouseLeave={e => e.currentTarget.style.borderColor = color + "44"}
                >
                  <div style={{ width:44, height:44, borderRadius:10, background:color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18, color:"#fff", flexShrink:0 }}>{mza}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:14, color:"#f1f5f9" }}>
                      Manzana {mza}
                      <span style={{ fontWeight:400, color:"#475569", fontSize:12, marginLeft:8 }}>· {stats.total} lotes</span>
                    </div>
                    <div style={{ display:"flex", gap:12, marginTop:4 }}>
                      <span style={{ fontSize:11, color:"#22c55e" }}>✅ {stats.disponibles}</span>
                      <span style={{ fontSize:11, color:"#f59e0b" }}>⏳ {stats.reservados}</span>
                      <span style={{ fontSize:11, color:"#ef4444" }}>🔴 {stats.vendidos}</span>
                    </div>
                  </div>
                  <div style={{ width:60, flexShrink:0 }}>
                    <div style={{ height:6, background:"#0f172a", borderRadius:99, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:stats.pctVendido + "%", background:color, borderRadius:99 }}/>
                    </div>
                    <div style={{ fontSize:10, color:"#475569", textAlign:"right", marginTop:3 }}>{stats.pctVendido}%</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeMza && (
        <MzaModal
          mza={activeMza}
          lots={lots}
          onClose={() => setActiveMza(null)}
          onSaveLot={handleSave}
        />
      )}

      {toast && (
        <div style={{
          position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)",
          background:"#22c55e", color:"#fff", padding:"10px 20px",
          borderRadius:99, fontWeight:700, fontSize:13,
          boxShadow:"0 4px 20px #0004", zIndex:999,
        }}>{toast}</div>
      )}
    </div>
  );
}

// ─── VISTA VENTAS ─────────────────────────────────────────────────────────────
function VentasView({ lots, onSaveLot }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMza, setFilterMza] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg, color) => {
    setToast({ msg, color: color || "#22c55e" });
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = (lotId, form) => {
    onSaveLot(lotId, form);
    setSelected(null);
    showToast("Lote " + lotId + " actualizado");
  };

  const allLotIds = Object.values(MANZANAS_INIT).flat();
  const total = allLotIds.length;
  const vendidos = allLotIds.filter(l => lots[l.id]?.status === "vendido").length;
  const reservados = allLotIds.filter(l => lots[l.id]?.status === "reservado").length;
  const disponibles = total - vendidos - reservados;
  const totalVentas = allLotIds.reduce((acc, l) => {
    const d = lots[l.id];
    return d?.status === "vendido" && d.precio ? acc + Number(d.precio) : acc;
  }, 0);

  const mzaKeys = Object.keys(MANZANAS_INIT);
  const filteredMzas = filterMza === "all" ? mzaKeys : [filterMza];

  return (
    <div style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      {/* Stats bar */}
      <div style={{ background:"#0f172a", padding:"16px 20px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" }}>
            {[
              { label:"Total Lotes", val:total, color:"#94a3b8", icon:"🗂️" },
              { label:"Disponibles", val:disponibles, color:"#22c55e", icon:"✅" },
              { label:"Reservados", val:reservados, color:"#f59e0b", icon:"⏳" },
              { label:"Vendidos", val:vendidos, color:"#ef4444", icon:"🔴" },
              { label:"Ingresos Bs.", val:(totalVentas/1000).toFixed(0)+"K", color:"#818cf8", icon:"💰" },
            ].map(s => (
              <div key={s.label} style={{ background:"#1e293b", borderRadius:10, padding:"10px 16px", minWidth:100, flexShrink:0, textAlign:"center" }}>
                <div style={{ fontSize:16 }}>{s.icon}</div>
                <div style={{ fontWeight:900, fontSize:20, color:s.color, lineHeight:1.1 }}>{s.val}</div>
                <div style={{ fontSize:10, color:"#64748b", marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"12px 20px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:10, flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, minWidth:160 }}>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#94a3b8" }}>
              <Icon name="search"/>
            </span>
            <input
              placeholder="Buscar lote o comprador..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft:34 }}
            />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...inputStyle, flex:"0 0 auto", width:"auto", cursor:"pointer" }}>
            <option value="all">Todos los estados</option>
            {Object.entries(STATUS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
          </select>
          <select value={filterMza} onChange={e => setFilterMza(e.target.value)} style={{ ...inputStyle, flex:"0 0 auto", width:"auto", cursor:"pointer" }}>
            <option value="all">Todas las manzanas</option>
            {mzaKeys.map(m => <option key={m} value={m}>Manzana {m}</option>)}
          </select>
        </div>
      </div>

      {/* Grid de lotes */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"20px 16px 40px" }}>
        {filteredMzas.map(mza => {
          const mzaLots = MANZANAS_INIT[mza].filter(lot => {
            const d = lots[lot.id] || { status:"disponible" };
            const matchStatus = filterStatus === "all" || d.status === filterStatus;
            const q = search.toLowerCase();
            const matchSearch = !q || lot.id.toLowerCase().includes(q) || (d.comprador || "").toLowerCase().includes(q);
            return matchStatus && matchSearch;
          });
          if (!mzaLots.length) return null;

          const mVendidos = mzaLots.filter(l => lots[l.id]?.status === "vendido").length;
          const mReservados = mzaLots.filter(l => lots[l.id]?.status === "reservado").length;

          return (
            <div key={mza} style={{ marginBottom:28 }}>
              <div style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                marginBottom:12, padding:"10px 14px",
                background:"#0f172a", borderRadius:10,
              }}>
                <div style={{ fontWeight:900, fontSize:15, color:"#fff" }}>
                  Manzana {mza}
                  <span style={{ fontWeight:400, color:"#64748b", fontSize:12, marginLeft:8 }}>{mzaLots.length} lotes</span>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  {mVendidos > 0 && <Badge status="vendido"/>}
                  {mReservados > 0 && <Badge status="reservado"/>}
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:10 }}>
                {mzaLots.map(lot => {
                  const d = lots[lot.id] || { status:"disponible" };
                  const s = STATUS[d.status];
                  return (
                    <button key={lot.id} onClick={() => setSelected(lot)} style={{
                      width:"100%", textAlign:"left", cursor:"pointer",
                      background:"#fff", border:"2px solid " + s.color,
                      borderRadius:10, padding:"10px 12px",
                      transition:"all 0.15s", outline:"none",
                      boxShadow: d.status !== "disponible" ? "0 2px 8px " + s.color + "33" : "0 1px 3px #0001",
                      display:"flex", flexDirection:"column", gap:4,
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontWeight:800, fontSize:13, color:"#1e293b" }}>Lote {lot.id}</span>
                        <Badge status={d.status}/>
                      </div>
                      <div style={{ fontSize:11, color:"#64748b" }}>{lot.sup.toFixed(2)} m²</div>
                      {d.comprador && (
                        <div style={{ fontSize:11, color:"#334155", fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                          👤 {d.comprador}
                        </div>
                      )}
                      {d.precio && (
                        <div style={{ fontSize:11, color:"#059669", fontWeight:700 }}>
                          💰 Bs. {Number(d.precio).toLocaleString()}
                        </div>
                      )}
                      {d.modifiedBy && (
                        <div style={{ fontSize:10, color:"#94a3b8", marginTop:2 }}>
                          ✏️ {d.modifiedBy} · {formatDate(d.modifiedAt)}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div style={{ background:"#fff", borderTop:"1px solid #e2e8f0", padding:"16px 20px", textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
          {Object.entries(STATUS).map(([k, s]) => (
            <div key={k} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:12, height:12, borderRadius:3, background:s.color }}/>
              <span style={{ fontSize:12, color:"#475569" }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize:11, color:"#94a3b8", marginTop:8 }}>
          Datos guardados automáticamente · Urb. Terdemol de Santivañez
        </div>
      </div>

      {selected && (
        <VentasModal
          lot={selected}
          data={lots[selected.id] || { status:"disponible", comprador:"", precio:"", nota:"" }}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}

      {toast && (
        <div style={{
          position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)",
          background:toast.color, color:"#fff", padding:"10px 20px",
          borderRadius:99, fontWeight:700, fontSize:13,
          boxShadow:"0 4px 20px #0003", zIndex:2000,
        }}>
          ✓ {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─── HISTORIAL (solo admin) ───────────────────────────────────────────────────
function HistorialView() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    loadHistory(40).then(h => setHistory(h));
  }, []);

  if (!history) return (
    <div style={{ textAlign:"center", padding:60, color:"#94a3b8", background:"#f1f5f9", minHeight:"100vh" }}>
      <div style={{ fontSize:28, marginBottom:8 }}>⏳</div>
      <div style={{ fontWeight:700 }}>Cargando historial...</div>
    </div>
  );

  if (!history.length) return (
    <div style={{ textAlign:"center", padding:60, color:"#94a3b8", background:"#f1f5f9", minHeight:"100vh" }}>
      <div style={{ fontSize:36, marginBottom:8 }}>📭</div>
      <div style={{ fontWeight:700 }}>Sin historial aún</div>
      <div style={{ fontSize:12, marginTop:4 }}>Los cambios aparecerán aquí</div>
    </div>
  );

  return (
    <div style={{ background:"#f1f5f9", minHeight:"100vh" }}>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"20px 16px 40px" }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontWeight:800, fontSize:16, color:"#0f172a" }}>Historial de cambios</div>
          <div style={{ fontSize:12, color:"#94a3b8" }}>Últimos {history.length} registros · solo visible para el administrador</div>
        </div>
        {history.map((entry, i) => {
          const lot = entry.lotId && entry.lots ? entry.lots[entry.lotId] : null;
          const s = lot ? STATUS[lot.status] : null;
          const isAdmin = entry.modifiedBy === "Admin";
          return (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:12,
              background:"#fff", borderRadius:10, padding:"12px 14px",
              marginBottom:8, boxShadow:"0 1px 3px #0001",
            }}>
              <div style={{
                width:36, height:36, borderRadius:99, flexShrink:0,
                background: isAdmin ? "#0f172a" : "#3b82f6",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontWeight:800, fontSize:14,
              }}>
                {(entry.modifiedBy || "?").charAt(0).toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>
                    {isAdmin ? "🔑 Admin" : "👤 " + (entry.modifiedBy || "—")}
                  </span>
                  <span style={{ fontSize:11, color:"#94a3b8" }}>{formatDate(entry.timestamp)}</span>
                </div>
                {entry.lotId ? (
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3, flexWrap:"wrap" }}>
                    <span style={{ fontSize:12, color:"#64748b" }}>Lote {entry.lotId}</span>
                    {s && (
                      <span style={{ fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:99, background:s.bg, color:s.text }}>
                        {s.label}
                      </span>
                    )}
                    {lot?.comprador && (
                      <span style={{ fontSize:11, color:"#475569" }}>· {lot.comprador}</span>
                    )}
                    {lot?.precio && (
                      <span style={{ fontSize:11, color:"#059669", fontWeight:700 }}>· Bs. {Number(lot.precio).toLocaleString()}</span>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Cambio general</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
function App() {
  const [auth, setAuth] = useState(() => getStoredAuth());
  const [tab, setTab] = useState("mapa");
  const [lots, setLots] = useState(null);

  useEffect(() => {
    if (auth) loadLots().then(saved => setLots(saved || buildInitialState()));
  }, [auth]);

  const handleLogin = (authData) => setAuth(authData);

  const handleLogout = () => {
    clearStoredAuth();
    setAuth(null);
    setLots(null);
  };

  const handleSaveLot = (lotId, form) => {
    const enriched = { ...form, modifiedBy: auth.name, modifiedAt: new Date().toISOString() };
    const next = { ...lots, [lotId]: enriched };
    setLots(next);
    saveLots(next, { lotId, modifiedBy: auth.name });
  };

  if (!auth) return <LoginScreen onLogin={handleLogin}/>;

  if (!lots) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f172a" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:12 }}>🏘️</div>
        <div style={{ fontWeight:700, color:"#94a3b8", fontFamily:"sans-serif", fontSize:14 }}>
          Conectando a la base de datos...
        </div>
      </div>
    </div>
  );

  const isAdmin = auth.role === "admin";
  const tabs = [
    ["mapa",     "🗺️ Mapa"],
    ["ventas",   "📋 Ventas"],
    ...(isAdmin ? [["historial", "📜 Historial"]] : []),
  ];

  const tabStyle = (active) => ({
    flex:1, padding:"14px 8px", border:"none", cursor:"pointer",
    background: active ? "#3b82f6" : "transparent",
    color: active ? "#fff" : "#64748b",
    fontWeight:800, fontSize:13,
    borderBottom: active ? "3px solid #60a5fa" : "3px solid transparent",
    transition:"all 0.15s",
  });

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ position:"sticky", top:0, zIndex:500, background:"#0f172a", display:"flex", boxShadow:"0 2px 12px #0004" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", width:"100%", padding:"0 4px", alignItems:"center" }}>
          {tabs.map(([v, lbl]) => (
            <button key={v} onClick={() => setTab(v)} style={tabStyle(tab === v)}>{lbl}</button>
          ))}
          {/* Indicador de usuario + salir */}
          <div style={{ display:"flex", alignItems:"center", gap:6, padding:"0 8px", marginLeft:"auto", flexShrink:0 }}>
            <span style={{ fontSize:11, color:"#64748b", maxWidth:90, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {isAdmin ? "🔑" : "👤"} {auth.name}
            </span>
            <button onClick={handleLogout} style={{
              padding:"4px 8px", borderRadius:6,
              border:"1px solid #334155", background:"transparent",
              color:"#64748b", fontSize:11, cursor:"pointer",
            }}>Salir</button>
          </div>
        </div>
      </div>

      {tab === "mapa"      && <MapaView lots={lots} onSaveLot={handleSaveLot}/>}
      {tab === "ventas"    && <VentasView lots={lots} onSaveLot={handleSaveLot}/>}
      {tab === "historial" && isAdmin && <HistorialView/>}

      <style>{`
        * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        body { margin:0; }
        ::-webkit-scrollbar { display:none; }
        select, input, textarea { font-family:inherit; }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
