const Comment = require('../models/comment');
const { transformComment } = require('../helpers/transform');

module.exports = {
  addComment: async args => {
    const { description, postId } = args.commentInput;
    const comment = new Comment({
      description,
      post: postId,
      user: '60f291007bc6f20a3c90a0d9'
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
