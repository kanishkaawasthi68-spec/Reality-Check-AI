import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-m7Rbf-ajeniISVYOYg6iWkr-XImsTTo",
  authDomain: "reality-check-ai-59345.firebaseapp.com",
  projectId: "reality-check-ai-59345",
  storageBucket: "reality-check-ai-59345.firebasestorage.app",
  messagingSenderId: "115842797081",
  appId: "1:115842797081:web:78f289ac3e363f81536488",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;