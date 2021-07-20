const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./src/schema');
const graphqlResolver = require('./src/resolvers');
const isAuth = require('./src/middleware/is-auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: process.env.NODE_ENV !== 'production'
  })
);

const start = () => {
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`🚀 Service API is ready to use on port ${PORT}`);
  });
};
 
module.exports = start;
