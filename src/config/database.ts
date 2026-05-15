import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQRlgHOmZc9OhpVJE8VoheFuvUD3BXJGA",
  authDomain: "rainsafe-8b13a.firebaseapp.com",
  projectId: "rainsafe-8b13a",
  storageBucket: "rainsafe-8b13a.firebasestorage.app",
  messagingSenderId: "731452910242",
  appId: "1:731452910242:web:4e030ce470a997b86c05fb",
  measurementId: "G-4XZB9EVGFR"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



