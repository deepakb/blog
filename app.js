const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const connect = require('./src/helpers/database');

const graphqlSchema = require('./src/schema');
const graphqlResolver = require('./src/resolvers');

const app = express();

app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

const PORT = process.env.PORT || 3000;
connect(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Service API ready at port ${PORT}`);
  });
});
