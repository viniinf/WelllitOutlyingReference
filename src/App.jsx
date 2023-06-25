import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import QuoteList from './components/Quotes/QuoteList';
import FornecedoresEContatos from './components/Contacts/FornecedoresEContatos';

const App = () => {
  return (
    <Router>
      <h1>Sistema de Compras do Infnet</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cotacoes" element={<QuoteList />} />
        <Route path="/fornecedores-e-contatos" element={<FornecedoresEContatos />} />
      </Routes>
    </Router>
  );
};

export default App;