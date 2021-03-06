const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { errors } = require('../configs');
const User = require('../models/user');

module.exports = {
  createUser: async args => {
    const { email, password, firstName, lastName, displayName } = args.userInput;

    try {
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        throw new Error(errors.emailExist);
      }

      const saltRounds = 12;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = new User({ email, password: hash, firstName, lastName, displayName });
      const newUser = await user.save();

      return { _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(errors.userNotExist);
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error(errors.passwordNotCorrect);
      }

      const token = await jwt.sign(
        { userId: user.id, email: user.email },
        process.env.APP_SECRET,
        {
          expiresIn: '1h'
        }
      );

      return { userId: user.id, token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  }
};
