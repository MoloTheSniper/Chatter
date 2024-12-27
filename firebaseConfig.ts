// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyB39C8YjkY1tRba2r4TZIm7QtP5QQvHVCc",
  authDomain: "chatter-2c0e9.firebaseapp.com",
  projectId: "chatter-2c0e9",
  storageBucket: "chatter-2c0e9.firebasestorage.app",
  messagingSenderId: "268633709815",
  appId: "1:268633709815:web:6af07fd9945b0a34da87f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');