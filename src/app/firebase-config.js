import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdN4FUZa6SN_SepV7p-Ux_IC8nfP3HCS8",
  authDomain: "ovidot-imagegallery.firebaseapp.com",
  projectId: "ovidot-imagegallery",
  storageBucket: "ovidot-imagegallery.appspot.com",
  messagingSenderId: "724384203410",
  appId: "1:724384203410:web:a4fe34b5071d3073701c4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
