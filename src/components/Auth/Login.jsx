import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase';

import SignUp from './SignUp';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
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
  const [role, setRole] = useState('administrador');

  const auth = getAuth();
  const firestore = getFirestore();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido!');

      const user = auth.currentUser;
      if (user) {
        const userSnapshot = await getDoc(doc(firestore, 'users', user.uid));
        const userData = userSnapshot.data();
        const userRole = userData.role;

        console.log('Papel do usuário:', userRole);

        if (userRole === 'gerente') {
          navigate('/cotacoes');
        } else if (userRole === 'administrador') {
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

      // Armazenar a informação do papel do usuário no banco de dados
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { role });
      }

      // Redirecionar ou executar outras ações após o cadastro bem-sucedido
    } catch (error) {
      console.log('Erro ao cadastrar:', error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
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
          {showSignUp && (
            <div>
              <TextField
                id="role"
                label="Papel"
                select
                value={role}
                onChange={handleRoleChange}
                fullWidth
                margin="normal"
              >
                <option value="gerente">Gerente</option>
                <option value="administrador">Administrador</option>
              </TextField>
            </div>
          )}
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
        {!showSignUp ? (
          <Typography variant="body1" sx={{ marginTop: '16px' }}>
            Não possui uma conta?{' '}
            <Link href="#" onClick={handleToggleSignUp}>
              Cadastre-se
            </Link>
          </Typography>
        ) : (
          <Button onClick={handleSignUp} variant="contained" fullWidth>
            Cadastrar
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Login;
