import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Container, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Menu as MenuIcon } from '@mui/icons-material';
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

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Compras do INFNET
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/cotacoes">
            <ListItemText primary="Cotações" />
          </ListItem>
          <ListItem button component={Link} to="/fornecedores-e-contatos">
            <ListItemText primary="Fornecedores e Contatos" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <StyledContainer maxWidth="sm">
        <StyledHeader variant="h4" component="h1" gutterBottom>
          Sistema de Compras do INFNET
        </StyledHeader>
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
