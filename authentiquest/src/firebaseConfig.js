// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAhJJaVK1FaPsXKJzaoD014LqmH7esjBQM",
  authDomain: "authentiquest.firebaseapp.com",
  projectId: "authentiquest",
  storageBucket: "authentiquest.appspot.com",
  messagingSenderId: "448490934032",
  appId: "1:448490934032:web:44ede1643b54051c91df95",
  measurementId: "G-V1SZHVH1L6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getAuth(app);