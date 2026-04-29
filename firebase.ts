import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh_GCj9Imce4v858B8P8-u56gf7gImYWo",
  authDomain: "visitorcounter-7f1ac.firebaseapp.com",
  databaseURL: "https://visitorcounter-7f1ac-default-rtdb.firebaseio.com",
  projectId: "visitorcounter-7f1ac",
  storageBucket: "visitorcounter-7f1ac.firebasestorage.app",
  messagingSenderId: "798464104130",
  appId: "1:798464104130:web:89bd0c0bdb429ad2860d5b",
  measurementId: "G-JE6MNVN8K7"
};

// Initialize Firebase Core
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db: Database = getDatabase(app);

// Initialize Analytics Safely
export let analytics: Analytics | null = null;

// isSupported() checks if the browser environment allows Analytics to run smoothly
let analyticsInitialized = false;
const initializeAnalytics = async () => {
  if (analyticsInitialized) return analytics;
  
  try {
    const supported = await isSupported();
    if (supported && !analytics) {
      analytics = getAnalytics(app);
      analyticsInitialized = true;
      console.log("Firebase Analytics initialized successfully.");
    }
  } catch (err) {
    console.warn("Firebase Analytics failed to initialize:", err);
  }
  return analytics;
};

// Auto-initialize when module loads
initializeAnalytics();