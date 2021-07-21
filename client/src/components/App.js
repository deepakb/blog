import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from '../graphql/client';
import Layout from './Layout';
import Posts from '../pages/Posts';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/blog' component={Posts} />
          </Switch>
        </Layout>
      </Router>
    </ApolloProvider>
  );
};

export default App;
