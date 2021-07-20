const Post = require('../models/post');
const User = require('../models/user');
const { transformPost } = require('../helpers/transform');
const { errors } = require('../configs');

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
      throw new Error(errors.unauthenticated);
    }

    const { title, description } = args.postInput;
    const post = new Post({
      title,
      description,
      createdBy: req.userId
    });
    let createdPost;

    try {
      const newPost = await post.save();
      createdPost = transformPost(newPost);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error(errors.userNotExist);
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
      throw new Error(errors.unauthenticated);
    }
    
    try {
      const postId = args.postId;
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error(errors.postNotFound);
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
