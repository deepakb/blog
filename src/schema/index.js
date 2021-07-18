const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type Post {
      _id: ID!
      title: String!
      description: String!
      publishedOn: String
      createdBy: User!
      createdAt: String!
      updatedAt: String!
    }

    input PostInput {
      title: String!
      description: String!
    }

    type Comment {
      _id: ID!
      description: String!
      post: Post!
      user: User!
      createdAt: String!
      updatedAt: String!
    }

    input CommentInput {
      description: String!
      postId: ID!
    }

    type User {
      _id: ID!
      email: String!,
      password: String
    }

    type UserAuth {
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type apiQuery {
      posts: [Post!]!
      login(email: String!, password: String!): UserAuth!
    }

    type apiMutation {
      createPost(postInput: PostInput): Post
      publishPost(postId: ID!): Post
      addComment(commentInput: CommentInput): Comment
      createUser(userInput: UserInput): User
    }

    schema {
      query: apiQuery,
      mutation: apiMutation
    }
  `);

module.exports = graphqlSchema;
