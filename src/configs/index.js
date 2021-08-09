module.exports = {
  errors: {
    emailExist: 'This email address is already exist.',
    userNotExist: 'User does not exist!',
    passwordNotCorrect: 'Password is not correct!',
    unauthenticated: 'Unauthenticated',
    postNotFound: 'Post does not exist!'
  },

  mongoURL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-api.o6bqb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  mongoTestURL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-api.o6bqb.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority`,
  mongoAtlasConfig: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
};
