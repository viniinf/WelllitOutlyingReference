import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
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
      <Typography variant="h4" component="h2" gutterBottom>
        Fornecedores
      </Typography>
      <form onSubmit={handleCreateFornecedor}>
        <TextField
          type="text"
          placeholder="Nome do fornecedor"
          value={newFornecedor}
          onChange={(e) => setNewFornecedor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar Fornecedor
        </Button>
      </form>
      <List>
        {fornecedores.map((fornecedor) => (
          <ListItem key={fornecedor.id}>
            <ListItemText primary={fornecedor.nome} />
            <Button onClick={() => handleDeleteFornecedor(fornecedor.id)}>Excluir</Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" component="h2" gutterBottom>
        Contatos
      </Typography>
      <form onSubmit={handleCreateContato}>
        <TextField
          type="text"
          placeholder="Nome do contato"
          value={newContato}
          onChange={(e) => setNewContato(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar Contato
        </Button>
      </form>
      <List>
        {contatos.map((contato) => (
          <ListItem key={contato.id}>
            <ListItemText primary={contato.nome} />
            <Button onClick={() => handleDeleteContato(contato.id)}>Excluir</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FornecedoresEContatos;
