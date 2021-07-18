const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = {
  createUser: async args => {
    const {  email, password  } = args.userInput;

    try {
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        throw new Error('This email address is already taken.');
      }

      const saltRounds = 12;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = new User({ email, password: hash });
      const result = await user.save();

      return { ...result._doc, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
};
