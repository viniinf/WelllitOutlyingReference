import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import Login from './components/Auth/Login';
import QuoteList from './components/Quotes/QuoteList';
import NotFoundPage from './components/Layout/NotFoundPage';
import Navigation from './components/Layout/Navigation';
import FormularioFornecedor from './components/Contacts/FormularioFornecedor';
//import FormularioContato from './components/Contacts/FormularioContato';
import Lista from './components/Contacts/Lista';

const StyledContainer = styled(Container)`
  text-align: center;
  padding-top: 40px;
`;

const App = () => {
  const [userType, setUserType] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [contatos, setContatos] = useState([]);

  const handleLoginSuccess = (userRole) => {
    setUserType(userRole);
  };

  const adicionarFornecedor = (fornecedor) => {
    setFornecedores([...fornecedores, fornecedor]);
  };

  const adicionarContato = (contato) => {
    setContatos([...contatos, contato]);
  };

  const removerFornecedor = (id) => {
    const novosFornecedores = fornecedores.filter((fornecedor) => fornecedor.id !== id);
    setFornecedores(novosFornecedores);
  };

  const removerContato = (id) => {
    const novosContatos = contatos.filter((contato) => contato.id !== id);
    setContatos(novosContatos);
  };

  return (
    <Router>
      <StyledContainer maxWidth="sm">
        <Navigation userType={userType} />
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/cotacoes" element={<QuoteList />} />
          <Route
            path="/fornecedores-e-contatos"
            element={
              <div>
                <FormularioFornecedor adicionarFornecedor={adicionarFornecedor} />
                {/* <FormularioContato adicionarContato={adicionarContato} /> */}
                <Lista itens={fornecedores} removerItem={removerFornecedor} />
                <Lista itens={contatos} removerItem={removerContato} />
              </div>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StyledContainer>
    </Router>
  );
};

export default App;
