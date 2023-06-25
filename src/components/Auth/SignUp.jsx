import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('gerente'); // Define o papel padrão como gerente

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Criação do usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Armazenar a informação do papel do usuário no banco de dados
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, { role });

      console.log('Cadastro realizado com sucesso!');
      // Redirecionar para a página desejada após o cadastro
    } catch (error) {
      console.log('Erro ao cadastrar:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar
      </Typography>
      <Box component="form" onSubmit={handleSignUp}>
        <Box sx={{ marginBottom: '1rem' }}>
          <TextField
            type="email"
            id="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
        </Box>
        <Box sx={{ marginBottom: '1rem' }}>
          <TextField
            type="password"
            id="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </Box>
        <Box sx={{ marginBottom: '1rem' }}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Papel</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              onChange={handleRoleChange}
            >
              <MenuItem value="gerente">Gerente</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
