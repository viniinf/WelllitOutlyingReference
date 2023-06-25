import React, { useState } from 'react';
import { auth, firestore } from '../../services/firebase';
import SignUp from './SignUp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false); // estado para mostrar ou ocultar o formulário de cadastro

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

      // Obter dados do usuário logado
      const user = auth.currentUser;
      if (user) {
        const userSnapshot = await firestore.collection('users').doc(user.uid).get();
        const userData = userSnapshot.data();
        const role = userData.role;

        console.log('Role do usuário:', role);

        // Redirecionar com base na role do usuário
        if (role === 'gerente') {
          // Redirecionar para a página de cotações
        } else if (role === 'administrador') {
          // Redirecionar para a página de administração
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
      {showSignUp ? (
        <SignUp handleToggleSignUp={handleToggleSignUp} />
      ) : (
        <button onClick={handleToggleSignUp}>Cadastrar</button>
      )}
    </div>
  );
};

export default Login;
