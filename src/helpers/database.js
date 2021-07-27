const mongoose = require('mongoose');
const logger = require('loglevel');

const { mongoAtlasConfig, mongoURL } = require('../configs');

const initDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(mongoURL, mongoAtlasConfig);
      logger.info(`Connected to the MongoDB instance`);
      resolve(mongoose.connection); 
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = initDB;
