const User = require("../models/user");
const { getPostsByIds } = require("../helpers/post");

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      posts: getPostsByIds.bind(this, user._doc.posts),
    };
	} catch (err) {
    throw err;
  }
};

exports.getUserById = getUserById;
