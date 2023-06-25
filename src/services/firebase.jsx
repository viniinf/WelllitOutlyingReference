import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

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
    const quotesCollection = collection(firestore, 'quotes');
    const quotesSnapshot = await getDocs(quotesCollection);
    const quotes = quotesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return quotes;
  } catch (error) {
    throw new Error('Erro ao obter as cotações: ' + error.message);
  }
};

// Função para criar uma nova cotação
export const createQuote = async (quote) => {
  try {
    const quotesCollection = collection(firestore, 'quotes');
    await addDoc(quotesCollection, quote);
  } catch (error) {
    throw new Error('Erro ao criar a cotação: ' + error.message);
  }
};

// Função para atualizar uma cotação existente
export const updateQuote = async (quoteId, updatedQuote) => {
  try {
    const quoteDoc = doc(firestore, 'quotes', quoteId);
    await updateDoc(quoteDoc, updatedQuote);
  } catch (error) {
    throw new Error('Erro ao atualizar a cotação: ' + error.message);
  }
};

// Função para excluir uma cotação
export const deleteQuote = async (quoteId) => {
  try {
    const quoteDoc = doc(firestore, 'quotes', quoteId);
    await deleteDoc(quoteDoc);
  } catch (error) {
    throw new Error('Erro ao excluir a cotação: ' + error.message);
  }
};
