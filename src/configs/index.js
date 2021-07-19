module.exports = {
  appSecret: 'P8WD$HYeq#AU9c7yxJsnmft37M9XFp?Qysnw@O4h',

  errors: {
    emailExist: 'This email address is already exist.',
    userNotExist: 'User does not exist!',
    passwordNotCorrect: 'Password is not correct!'
  },

  mongoURL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-api.o6bqb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  mongoAtlasConfig: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
};
