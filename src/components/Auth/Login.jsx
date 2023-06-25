import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../services/firebase';
import SignUp from './SignUp';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import {
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Container,
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido!');

      const user = auth.currentUser;
      if (user) {
        const firestore = getFirestore();
        const userSnapshot = await getDoc(doc(firestore, 'users', user.uid));
        const userData = userSnapshot.data();
        const role = userData.role;

        console.log('Role do usuário:', role);

        if (role === 'gerente') {
          navigate('/cotacoes');
        } else if (role === 'administrador') {
          navigate('/fornecedores-e-contatos');
        } else {
          // Redirecionar para uma página padrão
        }
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error.message);
    }
  };

  const handleToggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário cadastrado com sucesso:', userCredential.user);

      // Redirecionar ou executar outras ações após o cadastro bem-sucedido
    } catch (error) {
      console.log('Erro ao cadastrar:', error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
        {showSignUp ? (
          <SignUp handleToggleSignUp={handleToggleSignUp} />
        ) : (
          <Typography variant="body1" sx={{ marginTop: '16px' }}>
            Não possui uma conta?{' '}
            <Link href="#" onClick={handleToggleSignUp}>
              Cadastre-se
            </Link>
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;