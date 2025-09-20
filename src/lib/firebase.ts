// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-1865251129-c5841",
  "appId": "1:89113961769:web:781718763ff394d47a0338",
  "apiKey": "AIzaSyCIpkEO78gnAU0-vMpXQNUHE6SSW-kc87A",
  "authDomain": "studio-1865251129-c5841.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "89113961769"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
