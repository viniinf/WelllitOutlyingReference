import React from 'react';

const Lista = ({ itens, removerItem }) => {
  return (
    <ul>
      {itens.map((item) => (
        <li key={item.id}>
          {item.nome}
          <button onClick={() => removerItem(item.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default Lista;
