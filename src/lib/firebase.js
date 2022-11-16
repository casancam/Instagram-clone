import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyBCM0I5YTfaU9VyQVcl1H6jJXQ_AcWjfg0",
  authDomain: "insta-c184c.firebaseapp.com",
  projectId: "insta-c184c",
  storageBucket: "insta-c184c.appspot.com",
  messagingSenderId: "956312345485",
  appId: "1:956312345485:web:ab736bb54868be4b49fbc4",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seed
// seedDatabase(firebase);

export { firebase, FieldValue };
