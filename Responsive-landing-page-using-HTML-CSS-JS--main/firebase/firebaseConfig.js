// Import the Firebase libraries
// firebase/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp0HiJP6LEDu5_avmIYVYyKuCwQVZf8cY",
  authDomain: "learningmanagementsystem-423f0.firebaseapp.com",
  projectId: "learningmanagementsystem-423f0",
  storageBucket: "learningmanagementsystem-423f0.appspot.com",
  messagingSenderId: "27805455426",
  appId: "1:27805455426:web:f03674d4f958f1cf1909db",
  measurementId: "G-RKCNM4CBPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
// const storage = getStorage(app);

// Export Firestore and Storage
export { db, app };
