const startServer = require('../../../app');
const initDB = require('../../helpers/database');
const resetTestDb = require('../../../test/helpers/database');
const generateQuery = require('../../../test/helpers/query');
const { commentInput } = require('../../../test/helpers/mock');
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

describe('comment resolver flow', () => {
  test('success add comment flow', async () => {
    const { createUser, login, createPost, posts, addComment } = generateQuery(graphQlEndPoint);

    const user = await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const commentResponse = await addComment(postResponse.data.data.createPost._id, commentInput.description, token);

    expect(commentResponse).not.toBeNull();
    expect(commentResponse.data).not.toBeNull();
    expect(commentResponse.data.data).not.toBeNull();
    expect(commentResponse.data.data.addComment).not.toBeNull();
    expect(commentResponse.data.data.addComment._id).not.toBeNull();
  });

  test('success add comment flow: verify comment data', async () => {
    const { createUser, login, createPost, posts, addComment } = generateQuery(graphQlEndPoint);

    const user = await createUser();
    const loginResponse = await login();
    const token = loginResponse.data.data.login.token;
    const postResponse = await createPost(token);
    const commentResponse = await addComment(postResponse.data.data.createPost._id, commentInput.description, token);

    expect(commentResponse).not.toBeNull();
    expect(commentResponse.data).not.toBeNull();
    expect(commentResponse.data.data).not.toBeNull();
    expect(commentResponse.data.data.addComment).not.toBeNull();
    expect(commentResponse.data.data.addComment._id).not.toBeNull();

    //TODO: Verify actuall comment with data
  });
});
