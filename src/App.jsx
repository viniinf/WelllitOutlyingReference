import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import Login from './components/Auth/Login';
import QuoteList from './components/Quotes/QuoteList';
import FornecedoresEContatos from './components/Contacts/FornecedoresEContatos';
import NotFoundPage from './components/Layout/NotFoundPage';
import Navigation from './components/Layout/Navigation';
const StyledContainer = styled(Container)`
  text-align: center;
  padding-top: 40px;
`;

const App = () => {
  return (
    <Router>
      <StyledContainer maxWidth="sm">
         <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cotacoes" element={<QuoteList />} />
          <Route path="/fornecedores-e-contatos" element={<FornecedoresEContatos />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StyledContainer>
    </Router>
  );
};

export default App;