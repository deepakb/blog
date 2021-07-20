import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from '../graphql/client';
import Posts from '../pages/Posts';
import Login from '../pages/Login';
import Register from '../pages/Register';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/blog" component={Posts} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
