const Post = require("../models/post");
const { getUserById } = require("../helpers/user");
const { dateToString } = require("../helpers/date");

const getPostsByIds = async (postIds) => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    posts.map((post) => {
      return {
        ...post._doc,
        _id: post.id,
        publishedOn: post._doc.publishedOn
          ? dateToString(post._doc.publishedOn)
          : null,
        createdBy: getUserById.bind(this, post.createdBy),
      };
    });
    return posts;
  } catch (err) {
    throw err;
  }
};

const getPostById = async (postId) => {
	try {
    const post = await Post.findById(postId);
    console.log(getUserById);
    return {
      ...post._doc,
      _id: post.id,
      publishedOn: post._doc.publishedOn
        ? dateToString(post._doc.publishedOn)
        : null,
      createdBy: getUserById.bind(this, post._doc.createdBy),
    };
	} catch (err) {
    throw err;
  }
};

exports.getPostsByIds = getPostsByIds;
exports.getPostById = getPostById;
