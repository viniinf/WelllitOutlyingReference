import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../services/firebase';
import SignUp from './SignUp';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

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