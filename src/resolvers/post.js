const Post = require('../models/post');
const User = require('../models/user');
const { transformPost } = require('../helpers/transform');

module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find();
      return posts.map(post => transformPost(post));
    } catch (error) {
      throw error;
    }
  },
  createPost: async args => {
    const { title, description } = args.postInput;
    const post = new Post({
      title,
      description,
      createdBy: '60f291007bc6f20a3c90a0d9'
    });
    let createdPost;

    try {
      const result = await post.save();
      createdPost = transformPost(result);
      const creator = await User.findById('60f291007bc6f20a3c90a0d9');

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.posts.push(post);
      await creator.save();

      return createdPost;
    } catch (error) {
      throw error;
    }
  },
  publishPost: async args => {
    try {
      const postId = args.postId;
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error('Post you are trying to publish not found!');
      }

      await Post.updateOne(
        { _id: postId },
        { $currentDate: { publishedOn: true } }
      );

      return transformPost(post);
    } catch (error) {
      throw error;
    }
  }
};
