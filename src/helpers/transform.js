const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { dateToString } = require('./date');

const getUserById = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      posts: getPostsByIds.bind(this, user._doc.posts)
    };
  } catch (err) {
    throw err;
  }
};

const getPostsByIds = async postIds => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    posts.map(post => {
      return {
        ...post._doc,
        _id: post.id,
        publishedOn: post._doc.publishedOn
          ? dateToString(post._doc.publishedOn)
          : null,
        createdBy: getUserById.bind(this, post.createdBy)
      };
    });
    return posts;
  } catch (err) {
    throw err;
  }
};

const getCommentsByIds = async commentIds => {
  try {
    const comments = await Comment.find({ _id: { $in: commentIds } });
    comments.map(comment => {
      return {
        ...comment._doc,
        _id: comment.id
      };
    });
    return comments;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPostById = async postId => {
  try {
    const post = await Post.findById(postId);
    return {
      ...post._doc,
      _id: post.id,
      publishedOn: post._doc.publishedOn
        ? dateToString(post._doc.publishedOn)
        : null,
      createdBy: getUserById.bind(this, post._doc.createdBy)
    };
  } catch (err) {
    throw err;
  }
};

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
    createdBy: getUserById.bind(this, post._doc.createdBy),
    comments: getCommentsByIds.bind(this, post._doc.comments)
  };
};

exports.transformComment = transformComment;
exports.transformPost = transformPost;
