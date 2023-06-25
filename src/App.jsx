import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import QuoteList from './components/Quotes/QuoteList';

const App = () => {
  return (
    <Router>
      <h1>Sistema de Compras do Infnet</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quotes" element={<QuoteList />} />
      </Routes>
    </Router>
  );
};

export default App;