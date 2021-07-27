const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const logger = require('loglevel');

const graphqlSchema = require('./src/schema');
const graphqlResolver = require('./src/resolvers');
const isAuth = require('./src/middleware/is-auth');

const startServer = ({ port = process.env.PORT} = {}) => {
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

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`);
      resolve(server);
    });
  });
};
 
module.exports = startServer;
