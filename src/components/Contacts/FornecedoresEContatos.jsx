import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';

const FornecedoresEContatos = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [newFornecedor, setNewFornecedor] = useState('');
  const [newContato, setNewContato] = useState('');

  useEffect(() => {
    fetchFornecedores();
    fetchContatos();
  }, []);

  const fetchFornecedores = async () => {
    try {
      const snapshot = await firestore.collection('fornecedores').get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFornecedores(data);
    } catch (error) {
      console.log('Erro ao obter fornecedores:', error);
    }
  };

  const fetchContatos = async () => {
    try {
      const snapshot = await firestore.collection('contatos').get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContatos(data);
    } catch (error) {
      console.log('Erro ao obter contatos:', error);
    }
  };

  const handleCreateFornecedor = async (e) => {
    e.preventDefault();

    if (newFornecedor.trim() === '') {
      return;
    }

    try {
      await firestore.collection('fornecedores').add({ nome: newFornecedor });
      setNewFornecedor('');
      fetchFornecedores();
    } catch (error) {
      console.log('Erro ao criar fornecedor:', error);
    }
  };

  const handleCreateContato = async (e) => {
    e.preventDefault();

    if (newContato.trim() === '') {
      return;
    }

    try {
      await firestore.collection('contatos').add({ nome: newContato });
      setNewContato('');
      fetchContatos();
    } catch (error) {
      console.log('Erro ao criar contato:', error);
    }
  };

  const handleDeleteFornecedor = async (id) => {
    try {
      await firestore.collection('fornecedores').doc(id).delete();
      fetchFornecedores();
    } catch (error) {
      console.log('Erro ao deletar fornecedor:', error);
    }
  };

  const handleDeleteContato = async (id) => {
    try {
      await firestore.collection('contatos').doc(id).delete();
      fetchContatos();
    } catch (error) {
      console.log('Erro ao deletar contato:', error);
    }
  };

  return (
    <div>
      <h2>Fornecedores</h2>
      <form onSubmit={handleCreateFornecedor}>
        <input
          type="text"
          placeholder="Nome do fornecedor"
          value={newFornecedor}
          onChange={(e) => setNewFornecedor(e.target.value)}
        />
        <button type="submit">Adicionar Fornecedor</button>
      </form>
      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>
            {fornecedor.nome}
            <button onClick={() => handleDeleteFornecedor(fornecedor.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <h2>Contatos</h2>
      <form onSubmit={handleCreateContato}>
        <input
          type="text"
          placeholder="Nome do contato"
          value={newContato}
          onChange={(e) => setNewContato(e.target.value)}
        />
        <button type="submit">Adicionar Contato</button>
      </form>
      <ul>
        {contatos.map((contato) => (
          <li key={contato.id}>
            {contato.nome}
            <button onClick={() => handleDeleteContato(contato.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FornecedoresEContatos;