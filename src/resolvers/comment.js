const Comment = require('../models/comment');
const { transformComment } = require('../helpers/transform');
const { errors } = require('../configs');

module.exports = {
  addComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errors.unauthenticated);
    }

    const { description, postId } = args.commentInput;
    const comment = new Comment({
      description,
      post: postId,
      user: req.userId
    });

    try {
      const newComment = await comment.save();
      return transformComment(newComment);
    } catch (error) {
      throw error;
    }
  }
};
