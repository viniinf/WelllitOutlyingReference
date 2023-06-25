// src/components/Layout/Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/suppliers">Fornecedores</Link>
        </li>
        <li>
          <Link to="/contacts">Contatos</Link>
        </li>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        <li>
          <Link to="/quotes">Cotações</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
