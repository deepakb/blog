const { users, createUser } = require('./user');
const { posts, createPost } = require('./post');

const graphqlResolver = { users, posts, createUser, createPost };

module.exports = graphqlResolver;
