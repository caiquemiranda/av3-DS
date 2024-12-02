// Importar as funções necessárias do SDKs do Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase para o seu aplicativo web
const firebaseConfig = {
  apiKey: "AIzaSyAiKfCtAW-yO2rt5kKMiBB1_3qspknAEvo",
  authDomain: "recipeshare-ce1a8.firebaseapp.com",
  projectId: "recipeshare-ce1a8",
  storageBucket: "recipeshare-ce1a8.firebasestorage.app",
  messagingSenderId: "658700133271",
  appId: "1:658700133271:web:ee72472fe90d7c2d3b5ad2",
  measurementId: "G-WVT4VE0T9S",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
