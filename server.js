const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { app, listen } = require('./app');

const connect = require('./src/helpers/database');
const graphqlSchema = require('./src/schema');
const graphqlResolver = require('./src/resolvers');
const isAuth = require('./src/middleware/is-auth');

const connection = connect();

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

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);
