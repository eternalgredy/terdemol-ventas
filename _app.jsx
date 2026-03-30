// La imagen del plano es inyectada por build.js via window.__PLANO_IMG
const PLANO_IMG = window.__PLANO_IMG;
const { useState, useEffect } = React;

// ─── DATOS COMPARTIDOS ────────────────────────────────────────────────────────
const MANZANAS_INIT = {
  A: [{ id:"A-01", sup:300.0 }, { id:"A-02", sup:332.98 }, { id:"A-03", sup:325.12 }, { id:"A-04", sup:317.29 }, { id:"A-05", sup:309.45 }, { id:"A-06", sup:300.01 }, { id:"A-07", sup:300.0 }, { id:"A-08", sup:300.0 }, { id:"A-09", sup:299.96 }, { id:"A-10", sup:300.0 }, { id:"A-11", sup:300.0 }, { id:"A-12", sup:300.0 }, { id:"A-13", sup:300.0 }, { id:"A-14", sup:301.29 }, { id:"A-15", sup:301.29 }, { id:"A-16", sup:301.29 }, { id:"A-17", sup:301.26 }, { id:"A-18", sup:292.86 }, { id:"A-19", sup:272.41 }, { id:"A-20", sup:282.0 }, { id:"A-21", sup:262.96 }],
  B: [{ id:"B-01", sup:292.86 }, { id:"B-02", sup:300.0 }, { id:"B-03", sup:300.0 }, { id:"B-04", sup:300.0 }, { id:"B-05", sup:300.0 }, { id:"B-06", sup:300.0 }, { id:"B-07", sup:300.0 }, { id:"B-08", sup:300.0 }, { id:"B-09", sup:300.0 }, { id:"B-10", sup:300.0 }, { id:"B-11", sup:300.0 }, { id:"B-12", sup:300.0 }, { id:"B-13", sup:300.0 }, { id:"B-14", sup:300.0 }, { id:"B-15", sup:300.0 }, { id:"B-16", sup:300.0 }, { id:"B-17", sup:300.0 }, { id:"B-18", sup:300.0 }, { id:"B-19", sup:292.87 }, { id:"B-20", sup:285.13 }, { id:"B-21", sup:285.13 }],
  D: [{ id:"D-01", sup:300.0 }, { id:"D-02", sup:300.0 }, { id:"D-03", sup:370.05 }, { id:"D-04", sup:325.71 }, { id:"D-05", sup:323.67 }, { id:"D-06", sup:323.72 }, { id:"D-07", sup:323.62 }, { id:"D-08", sup:324.11 }, { id:"D-09", sup:336.73 }, { id:"D-10", sup:455.69 }, { id:"D-11", sup:300.0 }, { id:"D-12", sup:300.0 }],
  E: [{ id:"E-01", sup:350.61 }, { id:"E-02", sup:351.11 }, { id:"E-03", sup:306.0 }, { id:"E-04", sup:300.0 }, { id:"E-05", sup:300.0 }, { id:"E-06", sup:300.0 }, { id:"E-07", sup:300.0 }, { id:"E-08", sup:300.0 }, { id:"E-09", sup:300.0 }, { id:"E-10", sup:300.0 }, { id:"E-11", sup:300.0 }, { id:"E-13", sup:429.76 }, { id:"E-14", sup:429.76 }],
  F: [{ id:"F-01", sup:309.71 }, { id:"F-03", sup:300.0 }, { id:"F-04", sup:300.0 }, { id:"F-05", sup:300.0 }, { id:"F-06", sup:300.0 }, { id:"F-07", sup:300.0 }, { id:"F-08", sup:300.0 }, { id:"F-09", sup:300.0 }, { id:"F-10", sup:300.0 }, { id:"F-16", sup:300.0 }, { id:"F-17", sup:300.0 }, { id:"F-18", sup:300.0 }, { id:"F-19", sup:300.0 }, { id:"F-20", sup:300.0 }, { id:"F-21", sup:300.0 }, { id:"F-22", sup:300.0 }, { id:"F-23", sup:300.0 }, { id:"F-24", sup:300.0 }, { id:"F-25", sup:300.0 }, { id:"F-28", sup:300.0 }],
  G: [{ id:"G-01", sup:300.0 }, { id:"G-02", sup:300.0 }, { id:"G-03", sup:300.0 }, { id:"G-04", sup:300.0 }, { id:"G-05", sup:300.0 }, { id:"G-06", sup:341.3 }, { id:"G-07", sup:303.8 }, { id:"G-08", sup:351.25 }, { id:"G-09", sup:265.79 }, { id:"G-10", sup:291.12 }, { id:"G-11", sup:296.67 }, { id:"G-12", sup:300.0 }, { id:"G-13", sup:280.0 }, { id:"G-14", sup:280.0 }, { id:"G-15", sup:280.0 }],
  H: [{ id:"H-02", sup:300.0 }, { id:"H-03", sup:300.0 }, { id:"H-04", sup:300.0 }, { id:"H-05", sup:300.0 }, { id:"H-06", sup:300.0 }, { id:"H-07", sup:300.0 }, { id:"H-08", sup:300.0 }, { id:"H-09", sup:300.0 }, { id:"H-10", sup:300.0 }, { id:"H-11", sup:300.0 }, { id:"H-12", sup:300.0 }, { id:"H-13", sup:300.0 }, { id:"H-14", sup:300.0 }, { id:"H-15", sup:300.0 }, { id:"H-16", sup:300.0 }],
  J: [{ id:"J-01", sup:398.5 }, { id:"J-02", sup:300.0 }, { id:"J-03", sup:292.9 }, { id:"J-04", sup:364.7 }],
  I: [{ id:"I-01", sup:300.0 }, { id:"I-02", sup:300.0 }, { id:"I-03", sup:300.0 }, { id:"I-04", sup:498.4 }, { id:"I-05", sup:376.58 }, { id:"I-06", sup:326.86 }, { id:"I-07", sup:300.0 }, { id:"I-08", sup:300.0 }, { id:"I-26", sup:300.0 }, { id:"I-27", sup:369.13 }],
};

  "J-01": "73.6,887.8 32.9,865.0 20.0,887.8 21.1,900.3 47.9,933.3",
  "J-02": "89.2,860.1 48.6,837.1 32.9,865.0 73.6,887.8",
  "J-03": "48.6,837.1 89.2,860.1 105.2,831.8 74.2,814.3 59.1,818.6",
  "J-04": "98.1,901.6 73.6,887.8 105.2,831.8 129.7,845.6",
const LOT_POLYGONS = { w:800, h:977, polys:{
  "E-02": "331.4,390.9 315.7,384.0 301.5,388.7 277.0,432.2 305.3,445.6",
  "D-02": "343.9,372.0 328.7,365.4 323.5,349.7 345.7,310.3 368.0,320.8",
  "D-06": "435.5,264.2 411.6,315.0 437.5,327.3 461.4,276.4",
  "D-01": "392.0,332.2 368.2,382.7 343.9,372.0 368.0,320.8",
  "G-14": "224.5,695.3 255.2,640.9 274.6,651.9 243.9,706.2",
  "G-02": "175.8,611.5 229.2,641.6 217.3,662.8 163.9,632.7",
  "G-01": "163.9,632.7 217.3,662.8 205.1,684.3 161.4,659.7 157.2,644.5",
  "F-01": "396.6,778.4 420.2,728.5 372.1,705.7 372.4,712.2 396.6,778.4",
  "B-17": "660.3,240.9 716.8,267.6 706.6,289.2 650.1,262.5",
  "B-21": "612.5,271.1 592.8,313.8 619.9,326.6 639.9,284.1",
  "A-18": "496.4,268.3 518.2,221.9 545.0,234.6 527.9,270.8 513.1,276.2",
  "A-09": "571.0,39.6 541.4,28.2 521.8,69.7 550.4,83.3",
  "E-01": "297.7,507.7 323.1,454.0 277.0,432.2 275.4,435.0 274.6,444.3",
  "A-21": "469.6,199.0 447.0,188.3 424.2,234.2 447.8,245.3",
  "A-02": "421.4,176.2 432.8,156.0 496.5,186.1 486.6,207.0 421.4,176.2",
  "A-20": "494.3,210.7 469.6,199.0 447.8,245.3 472.5,257.0",
  "G-08": "243.8,634.5 255.2,640.9 289.0,581.0 278.9,553.5 235.8,630.0 243.8,634.5",
  "A-11": "599.2,50.6 577.7,96.2 604.4,108.8 621.7,72.2 615.7,57.0",
  "B-08": "664.1,86.9 644.7,127.9 668.8,139.3 693.4,87.2 678.2,81.3",
  "I-01": "307.1,917.5 328.1,874.7 299.0,860.5 283.4,892.1 288.0,906.7",
  "I-08": "328.1,874.7 307.1,917.5 333.9,932.6 355.6,888.3",
  "I-07": "355.6,888.3 333.9,932.6 359.7,947.2 382.3,901.4",
  "I-06": "382.3,901.4 410.0,915.0 408.9,919.3 392.8,952.3 377.3,957.1 359.7,947.2",
  "G-12": "321.0,714.7 278.3,690.6 263.3,717.2 297.2,736.3 312.7,731.5",
  "F-16": "520.0,538.0 576.5,564.6 566.3,586.2 509.8,559.5",
  "F-10": "463.6,511.3 520.0,538.0 509.8,559.5 453.4,532.9",
  "F-17": "509.8,559.5 566.3,586.2 556.1,607.8 499.7,581.1",
  "F-09": "453.4,532.9 509.8,559.5 499.7,581.1 443.2,554.5",
  "F-18": "499.7,581.1 556.1,607.8 545.9,629.4 489.5,602.7",
  "F-08": "443.2,554.5 499.7,581.1 489.5,602.7 433.0,576.1",
  "F-19": "489.5,602.7 545.9,629.4 535.7,651.0 479.3,624.3",
  "F-07": "433.0,576.1 489.5,602.7 479.3,624.3 422.8,597.7",
  "F-20": "479.3,624.3 535.7,651.0 525.5,672.6 469.1,645.9",
  "F-06": "422.8,597.7 479.3,624.3 469.1,645.9 412.6,619.3",
  "F-21": "469.1,645.9 525.5,672.6 515.3,694.1 458.9,667.5",
  "F-05": "412.6,619.3 469.1,645.9 458.9,667.5 402.4,640.9",
  "F-22": "458.9,667.5 515.3,694.1 505.1,715.7 448.7,689.1",
  "F-04": "402.4,640.9 458.9,667.5 448.7,689.1 392.2,662.4",
  "F-23": "448.7,689.1 505.1,715.7 494.9,737.3 438.5,710.7",
  "F-03": "392.2,662.4 448.7,689.1 438.5,710.7 382.0,684.0",
  "F-24": "438.5,710.7 494.9,737.3 484.7,758.9 428.3,732.3",
  "E-08": "374.5,470.3 422.9,493.2 411.0,518.4 362.6,495.5",
  "E-09": "362.6,495.5 411.0,518.4 399.1,543.6 350.8,520.7",
  "E-13": "371.5,476.8 349.3,466.4 311.7,545.9 323.5,578.3",
  "E-14": "323.1,454.0 297.7,507.7 311.7,545.9 349.3,466.4",
  "I-02": "355.0,888.0 299.0,860.5 309.5,839.0 365.5,866.6",
  "I-03": "365.5,866.6 309.5,839.0 320.1,817.6 376.1,845.1",
  "I-04": "381.4,834.3 376.1,845.1 320.1,817.6 340.3,776.5 360.7,777.6",
  "G-04": "199.9,568.8 252.9,599.5 241.2,620.4 187.7,590.4",
  "G-15": "205.1,684.3 235.8,630.0 255.2,640.9 224.5,695.3",
  "G-07": "263.0,509.8 234.9,561.1 265.0,578.1 278.9,553.5",
  "G-09": "299.0,608.6 274.6,651.9 255.2,640.9 289.0,581.0",
  "G-10": "299.0,608.6 274.6,651.9 325.3,680.5",
  "G-11": "328.5,699.4 321.0,714.7 278.3,690.6 294.0,662.8 325.3,680.5 325.3,680.5 329.0,690.6",
  "G-06": "263.0,509.8 234.9,561.1 211.7,548.0 239.4,498.9 259.5,500.5",
  "H-08": "285.4,787.1 237.3,759.9 250.9,735.7 288.5,757.0 293.0,771.6",
  "H-09": "285.4,787.1 237.3,759.9 224.3,783.0 273.6,811.1",
  "H-10": "262.0,834.6 211.7,805.3 224.3,783.0 273.6,811.1",
  "H-11": "262.0,834.6 237.3,820.3 212.1,863.9 229.6,873.8 245.1,869.0",
  "B-12": "727.5,132.6 714.2,160.7 757.5,181.2 770.8,153.1",
  "B-09": "668.8,139.3 693.4,87.2 717.2,96.5 691.9,150.2",
  "B-10": "691.9,150.2 717.2,96.5 740.3,105.4 714.2,160.7",
  "B-11": "770.8,153.1 727.5,132.6 740.3,105.4 774.0,118.5 780.0,133.7",
  "B-06": "634.5,149.5 690.9,176.1 680.7,197.7 624.3,171.1",
  "B-14": "690.9,176.1 747.3,202.8 737.2,224.4 680.7,197.7",
  "B-05": "624.3,171.1 680.7,197.7 670.5,219.3 614.1,192.7",
  "B-15": "680.7,197.7 737.2,224.4 727.0,246.0 670.5,219.3",
  "B-04": "614.1,192.7 670.5,219.3 660.3,240.9 603.9,214.3",
  "B-16": "670.5,219.3 727.0,246.0 716.8,267.6 660.3,240.9",
  "B-03": "603.9,214.3 660.3,240.9 650.1,262.5 593.7,235.9",
  "B-02": "593.7,235.9 650.1,262.5 639.9,284.1 583.5,257.4",
  "B-18": "650.1,262.5 706.6,289.2 696.4,310.7 639.9,284.1",
  "B-07": "644.7,127.9 701.1,154.6 690.9,176.1 634.5,149.5",
  "B-13": "701.1,154.6 757.5,181.2 747.3,202.8 690.9,176.1",
  "I-05": "410.0,915.0 355.0,888.0 381.4,834.3 409.3,910.7 410.0,915.0",
  "A-10": "577.7,96.2 599.2,50.6 571.0,39.6 550.4,83.3",
  "A-08": "521.8,69.7 541.4,28.2 520.4,20.0 506.7,24.9 489.9,54.7",
  "A-01": "424.3,234.2 447.0,188.3 421.4,176.2 402.0,210.5 407.0,226.0",
  "A-19": "518.2,221.9 494.3,210.7 472.5,257.0 496.4,268.3",
  "A-12": "546.9,81.6 604.4,108.8 594.5,129.9 536.7,102.6",
  "A-07": "546.9,81.6 489.9,54.7 478.4,75.1 536.7,102.6",
  "A-13": "536.0,102.3 526.2,123.2 584.6,150.8 594.5,129.9 536.0,102.3",
  "A-06": "536.0,102.3 526.2,123.2 467.0,95.2 478.4,75.1",
  "A-14": "584.6,150.8 526.2,123.2 516.3,144.2 574.7,171.7",
  "A-05": "467.0,95.2 455.6,115.5 516.3,144.2 526.2,123.2",
  "A-15": "574.7,171.7 516.3,144.2 506.4,165.1 564.8,192.7",
  "A-04": "455.6,115.5 516.3,144.2 506.4,165.1 444.2,135.7",
  "A-03": "444.2,135.7 506.4,165.1 496.5,186.1 432.8,156.0",
  "A-16": "564.8,192.7 506.4,165.1 496.5,186.1 554.9,213.6 564.8,192.7",
  "A-17": "554.9,213.6 496.5,186.1 486.6,207.0 545.0,234.6",
  "E-06": "436.7,437.0 398.2,420.2 386.4,445.2 434.8,468.0 442.3,452.0",
  "E-07": "434.8,468.0 386.4,445.2 374.5,470.3 422.9,493.2",
  "E-10": "350.8,520.7 399.1,543.6 387.1,568.9 338.9,545.8",
  "E-11": "338.9,545.8 387.1,568.9 375.2,594.1 327.0,570.9",
  "E-05": "398.2,420.2 376.3,410.6 349.9,466.6 371.5,476.8",
  "E-04": "376.3,410.6 354.3,400.9 327.9,456.3 349.9,466.6",
  "E-03": "354.3,400.9 331.4,390.9 305.3,445.6 327.9,456.3",
  "G-13": "263.3,717.2 294.0,662.8 274.6,651.9 243.9,706.2",
  "G-03": "187.7,590.4 241.2,620.4 229.2,641.6 175.8,611.5",
  "G-05": "211.7,548.0 265.0,578.1 252.9,599.5 199.9,568.8",
  "H-12": "237.3,820.3 211.7,805.3 186.7,849.6 212.1,863.9",
  "H-07": "218.8,792.7 198.9,781.5 231.0,724.5 250.9,735.7",
  "H-13": "218.8,792.7 198.9,781.5 166.8,838.4 186.7,849.6",
  "H-06": "198.9,781.5 179.1,770.3 211.2,713.3 231.0,724.5",
  "H-14": "198.9,781.5 179.1,770.3 147.0,827.2 166.8,838.4",
  "H-05": "179.1,770.3 159.2,759.1 191.3,702.1 211.2,713.3",
  "H-15": "179.1,770.3 159.2,759.1 127.1,816.0 147.0,827.2",
  "H-04": "159.2,759.1 139.4,747.9 171.5,690.9 191.3,702.1",
  "H-16": "159.2,759.1 139.4,747.9 107.3,804.8 127.1,816.0",
  "H-03": "119.6,711.1 150.3,728.5 171.5,690.9 150.5,679.1 135.3,683.3",
  "H-02": "150.3,728.5 119.6,711.1 98.9,748.0 129.5,765.3",
  "F-28": "407.4,808.1 440.5,738.0 420.2,728.5 396.6,778.4",
  "F-25": "471.7,786.5 427.5,765.6 440.5,738.0 484.7,758.9",
  "I-26": "458.7,814.1 414.5,793.2 427.5,765.6 471.7,786.5",
  "I-27": "414.5,793.2 407.4,808.1 421.9,847.5 442.4,848.5 458.7,814.1",
  "B-19": "647.2,339.5 667.1,296.9 696.4,310.7 681.1,343.2 666.2,348.5",
  "B-20": "667.1,296.9 639.9,284.1 619.9,326.6 647.2,339.5",
  "B-01": "583.5,257.4 568.2,289.9 573.5,304.7 592.8,313.8 612.5,271.1",



  "D-04": "409.7,252.0 385.7,302.8 357.5,289.5 380.1,249.4 394.5,244.8",
  "D-05": "409.7,252.0 385.7,302.8 411.6,315.0 435.5,264.2",
  "D-07": "461.4,276.4 437.5,327.3 463.4,339.5 487.2,288.6",
  "D-08": "487.2,288.6 463.4,339.5 489.6,351.9 508.9,311.1 503.6,296.3",
  "D-03": "357.5,289.5 426.3,322.0 416.1,343.6 345.7,310.3",
  "D-09": "426.3,322.0 489.6,351.9 479.4,373.5 416.1,343.6",
  "D-12": "392.0,332.2 368.2,382.7 392.9,393.5 416.1,343.6",
  "D-11": "416.1,343.6 392.9,393.5 418.2,404.6 440.5,355.1",
  "D-10": "479.4,373.5 440.5,355.1 418.2,404.6 446.8,417.1 461.4,411.7 479.4,373.5",
} };

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
            <div style={{ borderRadius:16, overflow:"hidden", border:"2px solid #1e293b", background:"#0f172a" }}>
              <svg viewBox={`0 0 ${LOT_POLYGONS.w} ${LOT_POLYGONS.h}`} style={{ width:"100%", display:"block" }}>
                {(() => {
                  const supMap = Object.fromEntries(Object.values(MANZANAS_INIT).flat().map(l => [l.id, l.sup]));
                  return Object.entries(LOT_POLYGONS.polys).map(([lotId, pts]) => {
                    const mza = lotId.split("-")[0];
                    const status = lots[lotId]?.status || "disponible";
                    const fillMap = { disponible:"#22c55e", reservado:"#f59e0b", vendido:"#ef4444" };
                    const fill = fillMap[status] || "#22c55e";
                    const pts2d = pts.split(" ").map(p => p.split(",").map(Number));
                    const cx = pts2d.reduce((s,p) => s+p[0], 0) / pts2d.length;
                    const cy = pts2d.reduce((s,p) => s+p[1], 0) / pts2d.length;
                    const sup = supMap[lotId];
                    const num = lotId.split("-")[1];
                    return (
                      <g key={lotId} style={{ cursor:"pointer" }} onClick={() => setActiveMza(mza)}>
                        <polygon points={pts}
                          fill={fill + "55"} stroke={fill} strokeWidth="1.5"
                          style={{ transition:"fill 0.15s" }}
                          onMouseEnter={e => e.target.setAttribute("fill", fill + "bb")}
                          onMouseLeave={e => e.target.setAttribute("fill", fill + "55")}
                        >
                          <title>{lotId} — {sup} m² — {status}</title>
                        </polygon>
                        <text x={cx} y={cy - 3} textAnchor="middle" dominantBaseline="middle"
                          stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke"
                          style={{ fontSize:6, fontWeight:"bold", fill:"#ffffff", pointerEvents:"none" }}
                        >{lotId}</text>
                        <text x={cx} y={cy + 5} textAnchor="middle" dominantBaseline="middle"
                          stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" paintOrder="stroke"
                          style={{ fontSize:4.5, fill:"#ffffff", pointerEvents:"none" }}
                        >{sup}m²</text>
                      </g>
                    );
                  });
                })()}
                {Object.keys(MANZANAS_INIT).map(mza => {
                  const mzaPolys = Object.entries(LOT_POLYGONS.polys).filter(([id]) => id.startsWith(mza + "-"));
                  if (!mzaPolys.length) return null;
                  const allPts = mzaPolys.flatMap(([,pts]) => pts.split(" ").map(p => p.split(",").map(Number)));
                  const cx = allPts.reduce((s,p) => s+p[0], 0) / allPts.length;
                  const cy = allPts.reduce((s,p) => s+p[1], 0) / allPts.length;
                  return (
                    <text key={mza} x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                      stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" paintOrder="stroke"
                      style={{ fontSize:18, fontWeight:"bold", fill:"#fff9", pointerEvents:"none" }}
                    >{mza}</text>
                  );
                })}
              </svg>
            </div>
            <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:14, flexWrap:"wrap" }}>
              {[
                { color:"#22c55e", label:"Disponible" },
                { color:"#f59e0b", label:"Reservado" },
                { color:"#ef4444", label:"Vendido" },
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
