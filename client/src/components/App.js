import { ApolloProvider } from '@apollo/client';

import client from '../graphql/client';
import Posts from '../pages/Posts';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Posts />
      </div>
    </ApolloProvider>
  );
}

export default App;
