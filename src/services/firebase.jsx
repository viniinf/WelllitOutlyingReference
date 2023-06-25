import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';





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
const app = initializeApp(firebaseConfig);

// Referência para o serviço de autenticação do Firebase
export const auth = getAuth(app);

// Referência para o serviço Firestore do Firebase
export const firestore = getFirestore(app);

// Função para obter as cotações
export const getQuotes = async () => {
  try {
    const quotesCollectionRef = collection(firestore, 'quotes');
    const quotesSnapshot = await getDocs(quotesCollectionRef);
    const quotes = quotesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return quotes;
  } catch (error) {
    console.log('Erro ao obter cotações:', error);
    return [];
  }
};