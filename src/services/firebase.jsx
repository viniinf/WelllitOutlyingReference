import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkI2cFXcXZRdGn9L6cAKeNjygjpIXf7ZE",
  authDomain: "dr2at202306.firebaseapp.com",
  projectId: "dr2at202306",
  storageBucket: "dr2at202306.appspot.com",
  messagingSenderId: "599576507373",
  appId: "1:599576507373:web:84002f542be8cb4fa42de4"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Referência para o serviço de autenticação do Firebase
export const auth = firebase.auth();

// Referência para o serviço Firestore do Firebase
export const firestore = firebase.firestore();

export default firebase;