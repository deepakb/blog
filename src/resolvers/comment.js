const Comment = require('../models/comment');
const { transformComment } = require('../helpers/transform');

module.exports = {
  addComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const { description, postId } = args.commentInput;
    const comment = new Comment({
      description,
      post: postId,
      user: req.userId
    });

    try {
      const result = await comment.save();
      const createdComment = transformComment(result);
      return createdComment;
    } catch (error) {
      throw error;
    }
  }
};
