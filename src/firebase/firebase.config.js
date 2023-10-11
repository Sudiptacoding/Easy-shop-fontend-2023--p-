
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAV34IUaNvXWV7eCiQDQ203S2ouQHMSrQU",
  authDomain: "practic-project-501b7.firebaseapp.com",
  databaseURL: "https://practic-project-501b7-default-rtdb.firebaseio.com",
  projectId: "practic-project-501b7",
  storageBucket: "practic-project-501b7.appspot.com",
  messagingSenderId: "999353662256",
  appId: "1:999353662256:web:3ee301e8e0e666e53d66f5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;