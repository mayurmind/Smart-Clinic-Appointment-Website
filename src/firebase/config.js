// Firebase configuration for Smart Clinic Appointment Website
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAfOI7UTLfmxvUwtX4B9GOa4FlFw5SSIzg",
  authDomain: "smart-clinic-appointment-6ae7c.firebaseapp.com",
  projectId: "smart-clinic-appointment-6ae7c",
  storageBucket: "smart-clinic-appointment-6ae7c.firebasestorage.app",
  messagingSenderId: "205432589224",
  appId: "1:205432589224:web:450041b7c365ffbf80ab9d",
  measurementId: "G-EW8HCNDPZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics (only in browser)
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

export default app;
