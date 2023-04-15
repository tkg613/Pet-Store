import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRY1D6tyRyqB-vBwXsEc39RDIPK83Tl7A",
  authDomain: "pet-store-app-107d4.firebaseapp.com",
  projectId: "pet-store-app-107d4",
  storageBucket: "pet-store-app-107d4.appspot.com",
  messagingSenderId: "77820951413",
  appId: "1:77820951413:web:780ee368e6f85c2e74b13c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()