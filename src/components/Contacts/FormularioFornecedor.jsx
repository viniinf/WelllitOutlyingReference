import React, { useState } from 'react';

const FormularioFornecedor = ({ adicionarFornecedor }) => {
  const [nome, setNome] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nome.trim() !== '') {
      adicionarFornecedor({ nome });
      setNome('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do fornecedor"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />
      <button type="submit">Adicionar Fornecedor</button>
    </form>
  );
};

export default FormularioFornecedor;
