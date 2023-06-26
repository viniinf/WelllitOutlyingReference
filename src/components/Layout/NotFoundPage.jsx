import React from 'react';
import { Container, Typography } from '@mui/material';

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
    textAlign: 'center',
  };

  return (
    <div style={styles}>
      <Container>
        <Typography variant="h2" component="h2">
          Página Não Encontrada
        </Typography>
        <Typography variant="body1">
          A página que você está procurando não existe ou não está disponível.
        </Typography>
      </Container>
    </div>
  );
};

export default NotFoundPage;