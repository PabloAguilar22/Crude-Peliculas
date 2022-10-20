import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDkl_NovQNCkXrbXABQSMn4rcdcw6qXpZM",
  authDomain: "crude-react-3de71.firebaseapp.com",
  databaseURL: "https://crude-react-3de71-default-rtdb.firebaseio.com",
  projectId: "crude-react-3de71",
  storageBucket: "crude-react-3de71.appspot.com",
  messagingSenderId: "554912286724",
  appId: "1:554912286724:web:f492ed8915a55a6c3f4d51"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);