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
 *       match /terdemol/{document} {
 *         allow read, write: if true;  // cubre /lots y /config
 *       }
 *       match /terdemol_backups/{doc} {
 *         allow read, write: if true;
 *       }
 *       match /{document=**} {
 *         allow read, write: if false;
 *       }
 *     }
 *   }
 */

window.__FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDIS85Jshf6_hs9dQlrAq3v1F99b2VkDnQ",
  authDomain:        "tioayuda-eadb2.firebaseapp.com",
  projectId:         "tioayuda-eadb2",
  storageBucket:     "tioayuda-eadb2.firebasestorage.app",
  messagingSenderId: "205060998133",
  appId:             "1:205060998133:web:1d9088cb1c8f7d3e2416bc"
};
