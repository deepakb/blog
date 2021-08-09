const startServer = require('../../../app');
const initDB = require('../../helpers/database');
const resetTestDb = require('../../../test/helpers/database');
const generateQuery = require('../../../test/helpers/query');
const { mongoTestURL, errors } = require('../../configs');

let server, connection, graphQlEndPoint;

beforeAll(async () => {
  server = await startServer();
  connection = await initDB(mongoTestURL);
  graphQlEndPoint = `http://localhost:${server.address().port}/graphql`;
});

afterAll(async () => {
    await resetTestDb(connection);
    server.close();
    connection.close();
});

beforeEach(() => resetTestDb(connection));

describe('user resolver flow', () => {
  test('success register flow', async () => {
    const { createUser } = generateQuery(graphQlEndPoint);
    const createUserResponse = await createUser();

    const response = createUserResponse.data.data.createUser;
    expect(response).not.toBeNull();
    expect(response._id).not.toBeNull();
    expect(response).toEqual({
      _id: expect.any(String)
    });
  });

  test('failure register flow::email already exist', async () => {
    const { createUser } = generateQuery(graphQlEndPoint);
    await createUser();

    await createUser().catch(errCreateUserResponse => {
      const response = errCreateUserResponse.response.data.errors;
      expect(response).not.toBeNull();
      expect(response[0].message).toBe(errors.emailExist);
    });
  });

  test('success login flow', async () => {
    const { createUser, login } = generateQuery(graphQlEndPoint);
    const user = await createUser();
    const loginResponse = await login();

    const response = loginResponse.data.data.login;
    expect(response).not.toBeNull();
    expect(response.tokenExpiration).not.toBeNull();
    expect(response.token).not.toBeNull();
    expect(response.userId).toBe(user.data.data.createUser._id);
    expect(response).toEqual({
      token: expect.any(String),
      userId: expect.any(String),
      tokenExpiration: expect.any(Number)
    });
  });

  test('failure login flow::email not exist', async () => {
    const { createUser, login } = generateQuery(graphQlEndPoint);
    await createUser();

    await login({ e: 'invalid@notexist.com' }).catch(errLoginResponse => {
      const response = errLoginResponse.response.data.errors;
      expect(response).not.toBeNull();
      expect(response[0].message).toBe(errors.userNotExist);
    });
  });

  test('failure login flow::password not correct', async () => {
    const { createUser, login } = generateQuery(graphQlEndPoint);
    await createUser();

    await login({ p: 'invalidpassword' }).catch(errLoginResponse => {
      const response = errLoginResponse.response.data.errors;
      expect(response).not.toBeNull();
      expect(response[0].message).toBe(errors.passwordNotCorrect);
    });
  });
});
