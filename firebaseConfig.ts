import { initializeApp } from "firebase/app";

import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'


// 1. create new project on firebase console
// 2. enable email and password auth provider in authentication
// 3. create a web app and copy the firebseConfigs below 

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

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
