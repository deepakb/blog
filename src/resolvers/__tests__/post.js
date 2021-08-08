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
    const response = await createPost();
    expect(response).not.toBeNull();
    expect(response.data).not.toBeNull();
    expect(response.data.errors).not.toBeNull();
    expect(response.data.errors[0].message).toBe(errors.unauthenticated);
  });

  test('failure post create flow: invalid token set', async () => {
    const { createPost } = generateQuery(graphQlEndPoint);
    const response = await createPost('invalidtokenstring');
    expect(response).not.toBeNull();
    expect(response.data).not.toBeNull();
    expect(response.data.errors).not.toBeNull();
    expect(response.data.errors[0].message).toBe(errors.unauthenticated);
  });

  test('success post create flow: correct token is set', async () => {
    const { createUser, login, createPost } = generateQuery(graphQlEndPoint);

    const user = await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);

    expect(postResponse).not.toBeNull();
    expect(postResponse.data).not.toBeNull();
    expect(postResponse.data.data).not.toBeNull();
    expect(postResponse.data.data.createPost).not.toBeNull();
    expect(postResponse.data.data.createPost).toEqual({
      _id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      createdBy: expect.any(Object)
    });
    expect(postResponse.data.data.createPost.createdBy._id).toBe(user.data.data.createUser._id);
    expect(postResponse.data.data.createPost.title).toBe(postInput.title);
    expect(postResponse.data.data.createPost.description).toBe(postInput.description);
  });

  test('failure publish post flow: invalid token and valid post id set', async () => {
    const { createUser, publishPost, createPost, login } = generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);

    const response = await publishPost(postResponse.data.data.createPost._id, 'invalidtokenstring');
    expect(response).not.toBeNull();
    expect(response.data).not.toBeNull();
    expect(response.data.errors).not.toBeNull();
    expect(response.data.errors[0].message).toBe(errors.unauthenticated);
  });

  test('failure publish post flow: valid token and invalid post id set', async () => {
    const { createUser, publishPost, createPost, login } = generateQuery(graphQlEndPoint);

    await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    await createPost(token);

    const pubishResponse = await publishPost('610e6554963acd4356a1d0f9', token);
    expect(pubishResponse).not.toBeNull();
    expect(pubishResponse.data).not.toBeNull();
    expect(pubishResponse.data.errors).not.toBeNull();
    expect(pubishResponse.data.errors[0].message).toBe(errors.postNotFound);
  });

  test('success publish post flow: correct token and post id set', async () => {
    const { createUser, login, createPost, publishPost } = generateQuery(graphQlEndPoint);

    const user = await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const pubishResponse = await publishPost(postResponse.data.data.createPost._id, token);

    expect(pubishResponse).not.toBeNull();
    expect(pubishResponse.data).not.toBeNull();
    const response = pubishResponse.data;
    expect(response).not.toBeNull();
    expect(response.publishPost).not.toBeNull();
    expect(response.publishPost.createdBy._id).toBe(user.data.data.createUser._id);
  });
});
