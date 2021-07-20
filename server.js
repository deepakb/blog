const start = require('./app');
const connect = require('./src/helpers/database');

const connection = connect();

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', start);
