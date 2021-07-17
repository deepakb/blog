const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type Post {
      _id: ID!
      title: String!
      description: String!
      publishedOn: String!
      createdBy: User!
    }

    input PostInput {
      title: String!
      description: String!
      publishedOn: String!
      createdBy: String
    }

    type User {
      _id: ID!
      email: String!,
      password: String
    }

    input UserInput {
      email: String!
      password: String!
    }

    type apiQuery {
      posts: [Post!]!
      users: [User!]!
    }

    type apiMutation {
      createPost(postInput: PostInput): Post
      createUser(userInput: UserInput): User
    }

    schema {
      query: apiQuery,
      mutation: apiMutation
    }
  `);

module.exports = graphqlSchema;
