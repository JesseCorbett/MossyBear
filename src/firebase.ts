import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCUIdJ7s-o6-NkyDlyGYTgjmQfgeVIX3Pc",
  authDomain: "mossy-bear.firebaseapp.com",
  projectId: "mossy-bear",
  storageBucket: "mossy-bear.appspot.com",
  messagingSenderId: "701326674610",
  appId: "1:701326674610:web:5ab70edf98c85c5dabd7ab"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')
