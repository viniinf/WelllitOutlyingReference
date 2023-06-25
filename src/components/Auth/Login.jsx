import React, { useState } from 'react';
import { auth } from '../../services/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
                 
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Login bem-sucedido!');
      // Redirecione para a página desejada após o login
    } catch (error) {
      console.log('Erro ao fazer login:', error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      
      await auth.createUserWithEmailAndPassword(email, password);
      console.log('Cadastro realizado com sucesso!');
      // Redirecione para a página desejada após o cadastro
    } catch (error) {
      console.log('Erro ao cadastrar:', error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUp}>Cadastrar</button>
    </div>
  );
};

export default Login;
