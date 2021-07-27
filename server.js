const logger = require('loglevel');
const startServer = require('./app');
const initDB = require('./src/helpers/database');

logger.setLevel('info');

initDB()
  .then(connection => startServer())
  .catch(err => console.log(err));
