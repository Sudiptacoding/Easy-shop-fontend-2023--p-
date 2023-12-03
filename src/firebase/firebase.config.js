
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0Yijfdgjx9FvyK7FmahRUCZ-M6eIsuV4",
  authDomain: "easy-shop-1df4d.firebaseapp.com",
  projectId: "easy-shop-1df4d",
  storageBucket: "easy-shop-1df4d.appspot.com",
  messagingSenderId: "769597411111",
  appId: "1:769597411111:web:f6d305070ebc284634e302"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;