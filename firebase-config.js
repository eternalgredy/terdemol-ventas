/**
 * firebase-config.js — Configuración de Firebase
 *
 * PASOS PARA OBTENER ESTOS VALORES:
 *   1. Ve a https://console.firebase.google.com
 *   2. Crea un proyecto (o abre el tuyo)
 *   3. En el panel izquierdo → Configuración del proyecto (ícono ⚙️)
 *   4. Baja hasta "Tus apps" → clic en "</>" (web) → registra la app
 *   5. Copia el objeto firebaseConfig que te aparece
 *   6. Pega los valores abajo
 *   7. Ejecuta: node build.js
 *   8. Haz git add index.html && git commit -m "firebase" && git push
 *
 * REGLAS DE FIRESTORE (pegar en Firebase Console → Firestore → Reglas):
 *
 *   rules_version = '2';
 *   service cloud.firestore {
 *     match /databases/{database}/documents {
 *       match /terdemol/lots {
 *         allow read, write: if true;
 *       }
 *       match /{document=**} {
 *         allow read, write: if false;
 *       }
 *     }
 *   }
 */

window.__FIREBASE_CONFIG = {
  apiKey:            "PEGAR-AQUI",
  authDomain:        "PEGAR-AQUI.firebaseapp.com",
  projectId:         "PEGAR-AQUI",
  storageBucket:     "PEGAR-AQUI.firebasestorage.app",
  messagingSenderId: "PEGAR-AQUI",
  appId:             "PEGAR-AQUI"
};
