import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Container, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Menu as MenuIcon } from '@mui/icons-material';

const StyledHeader = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const StyledContainer = styled(Container)`
  text-align: center;
  padding-top: 40px;
`;

const NotFoundPage = () => {
  const imageUrl = 'https://picsum.photos/1200/800';

  const styles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2rem',
  };

  return (
    <div style={styles}>
      <h2>Página Não Encontrada</h2>
      <p>A página que você está procurando não existe ou não está disponível</p>
    </div>
  );
};

const Navigation = ({ userType }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const menuItems = [
    { path: '/', label: 'Home', allowedUserTypes: ['usuario', 'gerente', 'admin'] },
    { path: '/cotacoes', label: 'Cotações', allowedUserTypes: ['gerente'] },
    { path: '/fornecedores-e-contatos', label: 'Fornecedores e Contatos', allowedUserTypes: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    return item.allowedUserTypes.includes(userType);
  });

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
          {filteredMenuItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.path}
              key={item.path}
              onClick={() => handleMenuItemClick(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navigation;