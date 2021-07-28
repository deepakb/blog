require('dotenv').config();
const logger = require('loglevel');
const startServer = require('./app');
const initDB = require('./src/helpers/database');

const isProduction = process.env.NODE_ENV === 'production';
const logLevel = process.env.LOG_LEVEL || (isProduction ? 'warn' : 'info');
logger.setLevel(logLevel);

initDB()
  .then(connection => startServer())
  .catch(err => console.log(err));
