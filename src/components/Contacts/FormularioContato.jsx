import React, { useState } from 'react';

const FormularioContato = ({ adicionarContato }) => {
  const [nome, setNome] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nome.trim() !== '') {
      adicionarContato({ nome });
      setNome('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do contato"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />
      <button type="submit">Adicionar Contato</button>
    </form>
  );
};

export default FormularioContato;