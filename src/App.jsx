import React, { useState } from 'react';
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
  const [userType, setUserType] = useState('');

  const handleLoginSuccess = (userRole) => {
    setUserType(userRole);
  };

  return (
    <Router>
      <StyledContainer maxWidth="sm">
        <Navigation userType={userType} />
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/cotacoes" element={<QuoteList />} />
          <Route path="/fornecedores-e-contatos" element={<FornecedoresEContatos />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StyledContainer>
    </Router>
  );
};

export default App;