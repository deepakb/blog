const mongoose = require('mongoose');

const { mongoAtlasConfig, mongoURL } = require('../configs');

const connect = () => {
  try {
    mongoose.connect(mongoURL, mongoAtlasConfig);
    return mongoose.connection;
  } catch (error) {
    throw new Error(error);
  }
  
};

module.exports = connect;
