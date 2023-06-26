import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Menu as MenuIcon } from '@mui/icons-material';

const StyledHeader = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

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
