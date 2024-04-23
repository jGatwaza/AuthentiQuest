import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDocs, getFirestore, collection } from "firebase/firestore";
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
initializeApp(firebaseConfig)
const db = getFirestore()
const colRef = collection(db, 'people')
getDocs(colRef).then((snapshot) => {
  let documents = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  console.log(documents);
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="448490934032-bfki9knuormavidrnjrto4s7gkfpp44a.apps.googleusercontent.com"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
