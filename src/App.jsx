import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Login from './components/Auth/Login';
import QuoteList from './components/Quotes/QuoteList';
import FornecedoresEContatos from './components/Contacts/FornecedoresEContatos';

// Estilo personalizado para o cabeçalho
const StyledHeader = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

// Estilo personalizado para o container principal
const StyledContainer = styled(Container)`
  text-align: center;
  padding-top: 40px;
`;

// Estilo personalizado para a logo
const LogoImage = styled('img')`
  max-width: 200px;
  margin-top: 20px;
`;

const App = () => {
  return (
    <Router>
      <StyledContainer maxWidth="sm">
        <StyledHeader variant="h4" component="h1" gutterBottom>
          Sistema de Compras do INFNET
        </StyledHeader>
        <LogoImage src="/public/logo.png" alt="Logo" />
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
