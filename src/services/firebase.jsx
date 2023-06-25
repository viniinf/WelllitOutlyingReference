import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCkI2cFXcXZRdGn9L6cAKeNjygjpIXf7ZE",
  authDomain: "dr2at202306.firebaseapp.com",
  projectId: "dr2at202306",
  storageBucket: "dr2at202306.appspot.com",
  messagingSenderId: "599576507373",
  appId: "1:599576507373:web:84002f542be8cb4fa42de4"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
