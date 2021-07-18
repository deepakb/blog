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
  createPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const { title, description } = args.postInput;
    const post = new Post({
      title,
      description,
      createdBy: req.userId
    });
    let createdPost;

    try {
      const result = await post.save();
      createdPost = transformPost(result);
      const creator = await User.findById(req.userId);

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
  publishPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    
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
