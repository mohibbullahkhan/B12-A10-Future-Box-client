// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCzjn997Gd9_dlnAyz8iBBtS74BtFa9msg",
  // authDomain: "assignment-ten-6e4fb.firebaseapp.com",
  // projectId: "assignment-ten-6e4fb",
  // storageBucket: "assignment-ten-6e4fb.firebasestorage.app",
  // messagingSenderId: "286604699725",
  // appId: "1:286604699725:web:d11d388498a64b78d35404",
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
