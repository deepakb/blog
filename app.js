const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const initDB = require('./src/helpers/database');

const graphqlSchema = require('./src/schema');
const graphqlResolver = require('./src/resolvers');
const isAuth = require('./src/middleware/is-auth');

const PORT = process.env.PORT || 3000;

const app = express();

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

initDB(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Service API ready at port ${PORT}`);
  });
});
