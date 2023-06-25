//ds

/*
  import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Auth/Login';
import SupplierList from './components/Suppliers/SupplierList';
import ContactList from './components/Contacts/ContactList';
import ProductList from './components/Products/ProductList';
import QuoteList from './components/Quotes/QuoteList';
import NotFound from './components/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/suppliers" component={SupplierList} />
      <Route path="/contacts" component={ContactList} />
      <Route path="/products" component={ProductList} />
      <Route path="/quotes" component={QuoteList} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
*/
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../services/auth'; // Importe o hook useAuth do seu serviço de autenticação

// ...

const Routes = () => {
  const { user } = useAuth(); // Obtenha o usuário atual do hook useAuth

  return (
    <Switch>
      {/* ... outras rotas ... */}
      <Route exact path="/cotacoes">
        {/* Verifique se o usuário é gerente e redirecione em conformidade */}
        {user.role === 'gerente' ? <QuotesPage /> : <Redirect to="/" />}
      </Route>
      {/* ... outras rotas ... */}
    </Switch>
  );
};

export default Routes;