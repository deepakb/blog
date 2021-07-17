const { users, createUser } = require('./user');
const { posts, createPost, publishPost } = require("./post");

const graphqlResolver = { users, posts, createUser, createPost, publishPost };

module.exports = graphqlResolver;
