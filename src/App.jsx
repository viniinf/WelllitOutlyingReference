import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import Login from './components/Auth/Login';
import QuoteList from './components/Quotes/QuoteList';
import FornecedoresEContatos from './components/Contacts/FornecedoresEContatos';
import Navigation from './components/Layout/Navigation';

const StyledContainer = styled(Container)`
  text-align: center;
  padding-top: 40px;
`;

const App = () => {
  return (
    <Router>
      <Navigation />
      <StyledContainer maxWidth="sm">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cotacoes" element={<QuoteList />} />
          <Route path="/fornecedores-e-contatos" element={<FornecedoresEContatos />} />
        </Routes>
      </StyledContainer>
    </Router>
  );
};

export default App;
