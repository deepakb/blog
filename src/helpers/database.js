const mongoose = require('mongoose');

const { mongoAtlasConfig, mongoURL } = require('../configs');

const connect = () => {
  mongoose.connect(mongoURL, mongoAtlasConfig);
  return mongoose.connection;
};

module.exports = connect;
