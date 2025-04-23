// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { Platform } from "react-native";
import { getAuth,getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fitfeast-ai.firebaseapp.com",
  projectId: "fitfeast-ai",
  storageBucket: "fitfeast-ai.firebasestorage.app",
  messagingSenderId: "426352589585",
  appId: "1:426352589585:web:9ea5eda887a4d54dd5aab0",
  measurementId: "G-FLQMBM0HP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = Platform.OS=='web'?getAuth(app):initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})