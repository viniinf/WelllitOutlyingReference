import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Delete, Add, ListAlt, Build } from '@mui/icons-material';

// Dados Fake aleatórios
const generateFakeData = () => {
  const empresas = ['Universidade de São Paulo', 'Universidade Federal do Rio de Janeiro', 'Universidade Federal de Minas Gerais', 'Universidade Federal do Rio Grande do Sul', 'Universidade Estadual de Campinas', 'Universidade Federal de Pernambuco', 'Universidade Federal do Paraná', 'Universidade Federal do Ceará', 'Universidade Federal do Amazonas', 'INFNET Rio de Janeiro'];
  const razoesSociais = ['USP', 'UFRJ', 'UFMG', 'UFRGS', 'UNICAMP', 'UFPE', 'UFPR', 'UFC', 'UFAM', 'INFNET'];
  const cnpjs = ['00.000.000/0001-01', '00.000.000/0001-02', '00.000.000/0001-03', '00.000.000/0001-04', '00.000.000/0001-05', '00.000.000/0001-06', '00.000.000/0001-07', '00.000.000/0001-08', '00.000.000/0001-09', '00.000.000/0001-10'];
  const contatos = ['João da Silva', 'Maria Santos', 'José Oliveira', 'Ana Pereira', 'Pedro Souza', 'Mariana Costa', 'Lucas Oliveira', 'Camila Almeida', 'Gustavo Silva', 'Carla Rodrigues'];
  const ramosAtuacao = ['Educação', 'Educação', 'Educação', 'Educação', 'Educação', 'Educação', 'Educação', 'Educação', 'Educação', 'Educação'];
  const telefones = ['(11) 1111-1111', '(21) 2222-2222', '(31) 3333-3333', '(51) 4444-4444', '(19) 5555-5555', '(81) 6666-6666', '(41) 7777-7777', '(85) 8888-8888', '(92) 9999-9999', '(21) 1234-5678'];
  const emails = ['joao.silva@usp.br', 'maria.santos@ufrj.br', 'jose.oliveira@ufmg.br', 'ana.pereira@ufrgs.br', 'pedro.souza@unicamp.br', 'mariana.costa@ufpe.br', 'lucas.oliveira@ufpr.br', 'camila.almeida@ufc.br', 'gustavo.silva@ufam.br', 'carla.rodrigues@infnet.edu.br'];
  const ceps = ['01234-567', '12345-678', '23456-789', '34567-890', '45678-901', '56789-012', '67890-123', '78901-234', '89012-345', '90123-456'];
  const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Campinas', 'Recife', 'Curitiba', 'Fortaleza', 'Manaus', 'Rio de Janeiro'];
  const estados = ['SP', 'RJ', 'MG', 'RS', 'SP', 'PE', 'PR', 'CE', 'AM', 'RJ'];





  const randomIndex = Math.floor(Math.random() * 10);

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
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormularioFornecedor;