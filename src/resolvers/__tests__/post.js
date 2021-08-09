const startServer = require('../../../app');
const initDB = require('../../helpers/database');
const resetTestDb = require('../../../test/helpers/database');
const generateQuery = require('../../../test/helpers/query');
const { postInput } = require('../../../test/helpers/mock');
const { mongoTestURL, errors } = require('../../configs');

let server, connection, graphQlEndPoint;

beforeAll(async () => {
  server = await startServer({port: 8888});
  connection = await initDB(mongoTestURL);
  graphQlEndPoint = `http://localhost:${server.address().port}/graphql`;
});

afterAll(async () => {
    await resetTestDb(connection);
    server.close();
    connection.close();
});

beforeEach(() => resetTestDb(connection));

describe('post resolver flow', () => {
  test('failure post create flow: token not set', async () => {
    const { createPost } = generateQuery(graphQlEndPoint);
    const createPostResponse = await createPost();
    const response = createPostResponse.data.errors;
    expect(response).not.toBeNull();
    expect(response[0].message).toBe(errors.unauthenticated);
  });

  test('failure post create flow: invalid token set', async () => {
    const { createPost } = generateQuery(graphQlEndPoint);
    const createPostResponse = await createPost('invalidtokenstring');
    const response = createPostResponse.data.errors;
    expect(response).not.toBeNull();
    expect(response[0].message).toBe(errors.unauthenticated);
  });

  test('success post create flow: correct token is set', async () => {
    const { createUser, login, createPost } = generateQuery(graphQlEndPoint);

    const user = await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const response = postResponse.data.data.createPost;

    expect(response).not.toBeNull();
    expect(response).toEqual({
      _id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      createdBy: expect.any(Object)
    });
    expect(response.createdBy._id).toBe(user.data.data.createUser._id);
    expect(response.title).toBe(postInput.title);
    expect(response.description).toBe(postInput.description);
  });

  test('failure publish post flow: invalid token and valid post id set', async () => {
    const { createUser, publishPost, createPost, login } = generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const publishPostResponse = await publishPost(postResponse.data.data.createPost._id, 'invalidtokenstring');
    const response = publishPostResponse.data.errors;
    expect(response).not.toBeNull();
    expect(response[0].message).toBe(errors.unauthenticated);
  });

  test('failure publish post flow: valid token and invalid post id set', async () => {
    const { createUser, publishPost, createPost, login } = generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    await createPost(token);
    const publishPostResponse = await publishPost('610e6554963acd4356a1d0f9', token);
    const response = publishPostResponse.data.errors;
    expect(response).not.toBeNull();
    expect(response[0].message).toBe(errors.postNotFound);
  });

  test('success publish post flow: correct token and post id set', async () => {
    const { createUser, login, createPost, publishPost } = generateQuery(graphQlEndPoint);

    const user = await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const publishPostResponse = await publishPost(postResponse.data.data.createPost._id, token);
    const response = publishPostResponse.data.data.publishPost;

    expect(response).not.toBeNull();
    expect(response.createdBy._id).toBe(user.data.data.createUser._id);
  });

  test('success publish post flow and verify by posts flow', async () => {
    const { createUser, login, createPost, publishPost, posts } = generateQuery(graphQlEndPoint);

    const user = await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    await publishPost(postResponse.data.data.createPost._id, token);
    const postsResponse = await posts();
    const [ createdPost ] = postsResponse.data.data.posts;

    expect(createdPost).not.toBeNull();
    expect(createdPost._id).not.toBeNull();
    expect(createdPost.title).not.toBeNull();
    expect(createdPost.description).not.toBeNull();
    expect(createdPost.publishedOn).not.toBeNull();
    expect(createdPost.title).toBe(postInput.title);
    expect(createdPost.description).toBe(postInput.description);
    expect(createdPost.createdBy._id).toBe(user.data.data.createUser._id);
  });
});
