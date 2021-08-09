const startServer = require('../../../app');
const initDB = require('../../helpers/database');
const resetTestDb = require('../../../test/helpers/database');
const generateQuery = require('../../../test/helpers/query');
const { commentInput } = require('../../../test/helpers/mock');
const { mongoTestURL, errors } = require('../../configs');

let server, connection, graphQlEndPoint;

beforeAll(async () => {
  server = await startServer({ port: 8888 });
  connection = await initDB(mongoTestURL);
  graphQlEndPoint = `http://localhost:${server.address().port}/graphql`;
});

afterAll(async () => {
  await resetTestDb(connection);
  server.close();
  connection.close();
});

beforeEach(() => resetTestDb(connection));

describe('comment resolver flow', () => {
  test('success add comment flow: verify addComment response', async () => {
    const { createUser, login, createPost, addComment } =
      generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const commentResponse = await addComment(
        postResponse.data.data.createPost._id,
        commentInput.description,
        token
      );

    const reponse = commentResponse.data.data.addComment;
    expect(reponse).not.toBeNull();
    expect(reponse._id).not.toBeNull();
  });

  test('failure add comment flow: invalid token set', async () => {
    const { createUser, login, createPost, addComment } =
      generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const commentResponse = await addComment(
        postResponse.data.data.createPost._id,
        commentInput.description,
        'invalidusertoken'
      );

    expect(commentResponse.data.errors[0].message).toBe(errors.unauthenticated);
  });

  test('failure add comment flow: valid token set but passed invalid post id', async () => {
    const { createUser, login, addComment } = generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const commentResponse = await addComment(
        '6110fdb9a9140d8547042c35',
        commentInput.description,
        token
      );

    expect(commentResponse.data.errors[0].message).toBe(errors.postNotFound);
  });

  test('success add comment flow: verify post response with comment data', async () => {
    const { createUser, login, createPost, posts, addComment } =
      generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const commentResponse = await addComment(
      postResponse.data.data.createPost._id,
      commentInput.description,
      token
    );

    const commentId = commentResponse.data.data.addComment._id;
    const commentDescription = commentInput.description;
    const postsResponse = await posts();
    const response = postsResponse.data.data.posts;
    expect(response[0].comments[0]._id).toBe(commentId);
    expect(response[0].comments[0].description).toBe(commentDescription);
  });
});
