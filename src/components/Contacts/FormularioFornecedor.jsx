import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Delete, Edit, Add, ListAlt, Build } from '@mui/icons-material';

// Função para gerar dados fake aleatórios
const generateFakeData = () => {
  const empresas = ['Empresa A', 'Empresa B', 'Empresa C', 'Empresa D'];
  const razoesSociais = ['Razão Social A', 'Razão Social B', 'Razão Social C', 'Razão Social D'];
  const cnpjs = ['123456789', '987654321', '456789123', '321987654'];
  const contatos = ['Contato A', 'Contato B', 'Contato C', 'Contato D'];
  const ramosAtuacao = ['Ramo A', 'Ramo B', 'Ramo C', 'Ramo D'];
  const telefones = ['111111111', '222222222', '333333333', '444444444'];
  const emails = ['emaila@example.com', 'emailb@example.com', 'emailc@example.com', 'emaild@example.com'];
  const ceps = ['12345-678', '67890-123', '45678-901', '90123-456'];
  const cidades = ['Cidade A', 'Cidade B', 'Cidade C', 'Cidade D'];
  const estados = ['Estado A', 'Estado B', 'Estado C', 'Estado D'];

  const randomIndex = Math.floor(Math.random() * 4);

  return {
    empresa: empresas[randomIndex],
    razaoSocial: razoesSociais[randomIndex],
    cnpj: cnpjs[randomIndex],
    contato: contatos[randomIndex],
    ramoAtuacao: ramosAtuacao[randomIndex],
    telefone: telefones[randomIndex],
    email: emails[randomIndex],
    cep: ceps[randomIndex],
    cidade: cidades[randomIndex],
    estado: estados[randomIndex],
  };
};

const FormularioFornecedor = ({ adicionarFornecedor }) => {
  const [fornecedores, setFornecedores] = useState([]);
  const [empresa, setEmpresa] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [ramoAtuacao, setRamoAtuacao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fornecedor = {
      empresa,
      razaoSocial,
      cnpj,
      contato,
      ramoAtuacao,
      telefone,
      email,
      cep,
      cidade,
      estado,
    };

    try {
      const docRef = await addDoc(collection(db, 'fornecedores'), fornecedor);
      adicionarFornecedor({ id: docRef.id, ...fornecedor });

      setEmpresa('');
      setRazaoSocial('');
      setCnpj('');
      setContato('');
      setRamoAtuacao('');
      setTelefone('');
      setEmail('');
      setCep('');
      setCidade('');
      setEstado('');
    } catch (error) {
      console.log('Erro ao adicionar fornecedor:', error);
    }
  };

  const handleListarFornecedores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'fornecedores'));
      const listaFornecedores = [];
      querySnapshot.forEach((doc) => {
        listaFornecedores.push({ id: doc.id, ...doc.data() });
      });
      setFornecedores(listaFornecedores);
    } catch (error) {
      console.log('Erro ao listar fornecedores:', error);
    }
  };

  const handleExcluirFornecedor = async (id) => {
    try {
      await deleteDoc(doc(db, 'fornecedores', id));
      const novaListaFornecedores = fornecedores.filter((fornecedor) => fornecedor.id !== id);
      setFornecedores(novaListaFornecedores);
    } catch (error) {
      console.log('Erro ao excluir fornecedor:', error);
    }
  };

  const handleEditarFornecedor = async (id) => {
    try {
      const fornecedorRef = doc(db, 'fornecedores', id);
      const snapshot = await getDocs(fornecedorRef);
      snapshot.forEach((doc) => {
        const data = doc.data();
        setEmpresa(data.empresa);
        setRazaoSocial(data.razaoSocial);
        setCnpj(data.cnpj);
        setContato(data.contato);
        setRamoAtuacao(data.ramoAtuacao);
        setTelefone(data.telefone);
        setEmail(data.email);
        setCep(data.cep);
        setCidade(data.cidade);
        setEstado(data.estado);
      });
    } catch (error) {
      console.log('Erro ao obter dados do fornecedor:', error);
    }
  };

  const handleAtualizarFornecedor = async (event) => {
    event.preventDefault();

    const fornecedorAtualizado = {
      id: fornecedor.id,
      empresa,
      razaoSocial,
      cnpj,
      contato,
      ramoAtuacao,
      telefone,
      email,
      cep,
      cidade,
      estado,
    };

    try {
      await updateDoc(doc(db, 'fornecedores', fornecedorAtualizado.id), fornecedorAtualizado);
      const novaListaFornecedores = fornecedores.map((fornecedor) => {
        if (fornecedor.id === fornecedorAtualizado.id) {
          return fornecedorAtualizado;
        }
        return fornecedor;
      });
      setFornecedores(novaListaFornecedores);
      setEmpresa('');
      setRazaoSocial('');
      setCnpj('');
      setContato('');
      setRamoAtuacao('');
      setTelefone('');
      setEmail('');
      setCep('');
      setCidade('');
      setEstado('');
    } catch (error) {
      console.log('Erro ao atualizar fornecedor:', error);
    }
  };

  const handleGerarDadosFake = () => {
    const fakeData = generateFakeData();
    setEmpresa(fakeData.empresa);
    setRazaoSocial(fakeData.razaoSocial);
    setCnpj(fakeData.cnpj);
    setContato(fakeData.contato);
    setRamoAtuacao(fakeData.ramoAtuacao);
    setTelefone(fakeData.telefone);
    setEmail(fakeData.email);
    setCep(fakeData.cep);
    setCidade(fakeData.cidade);
    setEstado(fakeData.estado);
  };

  useEffect(() => {
    handleListarFornecedores();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Empresa"
            value={empresa}
            onChange={(event) => setEmpresa(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Razão Social"
            value={razaoSocial}
            onChange={(event) => setRazaoSocial(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contato"
            value={contato}
            onChange={(event) => setContato(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Ramo de Atuação"
            value={ramoAtuacao}
            onChange={(event) => setRamoAtuacao(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(event) => setCep(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
            required
          />
          <button type="submit">
            <Add />
            Adicionar Fornecedor
          </button>
        </form>
        <div style={{ marginLeft: '10px' }}>
          <button type="button" onClick={handleListarFornecedores}>
            <ListAlt />
            Listar Fornecedores
          </button>
          <button type="button" onClick={handleGerarDadosFake}>
            <Build />
            Gerar Dados Fake
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {fornecedores.map((fornecedor) => (
          <div
            key={fornecedor.id}
            style={{
              border: '1px solid gray',
              padding: '10px',
              borderRadius: '5px',
              width: '300px',
            }}
          >
            <strong>Empresa:</strong> {fornecedor.empresa}<br/>
            <strong>Razão Social:</strong> {fornecedor.razaoSocial}<br/>
            <strong>CNPJ:</strong> {fornecedor.cnpj}<br/>
            <strong>Contato:</strong> {fornecedor.contato}<br/>
            <strong>Ramo de Atuação:</strong> {fornecedor.ramoAtuacao}<br/>
            <strong>Telefone:</strong> {fornecedor.telefone}<br/>
            <strong>E-mail:</strong> {fornecedor.email}<br/>
            <strong>CEP:</strong> {fornecedor.cep}<br/>
            <strong>Cidade:</strong> {fornecedor.cidade}<br/>
            <strong>Estado:</strong> {fornecedor.estado}<br/>
            <button type="button" onClick={() => handleExcluirFornecedor(fornecedor.id)}>
              <Delete />
              Excluir
            </button>
            <button type="button" onClick={() => handleEditarFornecedor(fornecedor.id)}>
              <Edit />
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormularioFornecedor;
