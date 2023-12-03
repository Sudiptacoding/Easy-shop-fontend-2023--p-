
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDybP75pb0z327GMsnzwJkf2aAiF_Uwlgs",
  authDomain: "practic-8bfd9.firebaseapp.com",
  projectId: "practic-8bfd9",
  storageBucket: "practic-8bfd9.appspot.com",
  messagingSenderId: "596465714213",
  appId: "1:596465714213:web:e82d6458ea078f41916bcc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;