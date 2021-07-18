const { getUserById } = require('../helpers/user');
const { getPostById } = require('../helpers/post');
const { dateToString } = require('../helpers/date');

const transformComment = comment => {
  return {
    ...comment._doc,
    _id: comment.id,
    createdAt: dateToString(comment._doc.createdAt),
    updatedAt: dateToString(comment._doc.updatedAt),
    user: getUserById.bind(this, comment._doc.user),
    post: getPostById.bind(this, comment._doc.post)
  };
};

const transformPost = post => {
  return {
    ...post._doc,
    _id: post.id,
    publishedOn: post._doc.publishedOn
      ? dateToString(post._doc.publishedOn)
      : null,
    createdAt: dateToString(post._doc.createdAt),
    updatedAt: dateToString(post._doc.updatedAt),
    createdBy: getUserById.bind(this, post._doc.createdBy)
  };
};

exports.transformComment = transformComment;
exports.transformPost = transformPost;
