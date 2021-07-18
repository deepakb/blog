const userResolver = require("./user");
const postResolver = require("./post");
const commentResolver = require("./comment");

const graphqlResolver = {
  ...userResolver,
  ...postResolver,
  ...commentResolver,
};

module.exports = graphqlResolver;
