import React, { useState } from 'react';

const FormularioFornecedor = ({ adicionarFornecedor }) => {
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
  const [pais, setPais] = useState('');

  const handleSubmit = (event) => {
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
      pais,
    };

    adicionarFornecedor(fornecedor);

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
    setPais('');
  };

  return (
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
      <input
        type="text"
        placeholder="País"
        value={pais}
        onChange={(event) => setPais(event.target.value)}
        required
      />
      <button type="submit">Adicionar Fornecedor</button>
    </form>
  );
};

export default FormularioFornecedor;
