import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import { initializeApp } from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDn5zOmLGtEMCXg6_Cd62NE28KSHPzBERs",
    authDomain: "clone-b11b3.firebaseapp.com",
    projectId: "clone-b11b3",
    storageBucket: "clone-b11b3.appspot.com",
    messagingSenderId: "360842909045",
    appId: "1:360842909045:web:f06ad6e8cf78b9b5182f3c",
    measurementId: "G-KQZ8YCTPTL"
};

const provider = new GoogleAuthProvider()
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app)

const GoogleLogin = async() => {
    await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromError(result);
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export {GoogleLogin, auth, database, storage}