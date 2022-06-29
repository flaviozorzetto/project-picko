import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { ENV } from "./config/environment.js"

const app = firebase.initializeApp({
    apiKey: ENV.REACT_APP_FIREBASE_API_KEY,
    authDomain: ENV.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.REACT_APP_FIREBASE_APP_ID
});

export const auth = app.auth();
export default app