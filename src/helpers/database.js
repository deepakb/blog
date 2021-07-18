const mongoose = require('mongoose');

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-api.o6bqb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connect = async callback => {
  try {
    await mongoose.connect(mongoUrl);

    if (typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = connect;
