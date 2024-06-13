
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBtxilDngy8bE9XTgKj8yIHYfw3KGekjBg",
  authDomain: "fir-001-17dfd.firebaseapp.com",
  databaseURL: "https://fir-001-17dfd-default-rtdb.firebaseio.com",
  projectId: "fir-001-17dfd",
  storageBucket: "fir-001-17dfd.appspot.com",
  messagingSenderId: "1063593775316",
  appId: "1:1063593775316:web:ff76f6e2219bc4b34a6b41",
  measurementId: "G-8CV3ZS7YNH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
