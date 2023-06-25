import React, { useState } from 'react';
import { auth, firestore } from '../../services/firebase';

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
      // função createUserWithEmailAndPassword para criar uma nova conta
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Armazena a informação do papel do usuário no banco de dados
      await firestore.collection('users').doc(user.uid).set({
        role: role
      });

      console.log('Cadastro realizado com sucesso!');
      // Redirecione para a página desejada após o cadastro
    } catch (error) {
      console.log('Erro ao cadastrar:', error.message);
    }
  };

  return (
    <div>
      <h1>Cadastrar</h1>
      <form onSubmit={handleSignUp}>
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
        <div>
          <label htmlFor="role">Papel:</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="gerente">Gerente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignUp;