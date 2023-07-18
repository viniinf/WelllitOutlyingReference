import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase';

import SignUp from './SignUp';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
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
  const [company, setCompany] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contact, setContact] = useState('');
  const [activity, setActivity] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleRazaoSocialChange = (e) => {
    setRazaoSocial(e.target.value);
  };

  const handleCnpjChange = (e) => {
    setCnpj(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
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

      // Armazenar informações do fornecedor no Firestore
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          company,
          razaoSocial,
          cnpj,
          contact,
          activity,
          phone,
          cep,
          city,
          state,
          country,
        });
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
                id="company"
                label="Empresa"
                type="text"
                value={company}
                onChange={handleCompanyChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="razaoSocial"
                label="Razão Social"
                type="text"
                value={razaoSocial}
                onChange={handleRazaoSocialChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="cnpj"
                label="CNPJ"
                type="text"
                value={cnpj}
                onChange={handleCnpjChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="contact"
                label="Contato"
                type="text"
                value={contact}
                onChange={handleContactChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="activity"
                label="Ramo de Atuação"
                type="text"
                value={activity}
                onChange={handleActivityChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="phone"
                label="Telefone"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="cep"
                label="CEP"
                type="text"
                value={cep}
                onChange={handleCepChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="city"
                label="Cidade"
                type="text"
                value={city}
                onChange={handleCityChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="state"
                label="Estado"
                type="text"
                value={state}
                onChange={handleStateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="country"
                label="País"
                type="text"
                value={country}
                onChange={handleCountryChange}
                fullWidth
                margin="normal"
              />
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
