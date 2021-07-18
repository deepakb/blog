const mongoose = require('mongoose');

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-api.o6bqb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const mongoAtlasConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const connect = async callback => {
  try {
    mongoose.connect(mongoUrl, mongoAtlasConfig);

    mongoose.connection.on('connected', () => {
      if (typeof callback === 'function') {
        callback();
      }
    });

    mongoose.connection.on('error', err => {
      throw err;
    });
  } catch (error) {
    throw error;
  }
};

module.exports = connect;
