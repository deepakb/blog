const axios = require('axios');
const startServer = require('../../../app');
const initDB = require('../../helpers/database');
const { resetTestDb } = require('../../../test/helpers/database');
const { registerInput } = require('../../../test/helpers/mock');
const { mongoTestURL, errors } = require('../../configs');

let server, connection, graphQlEndPoint;

beforeAll(async () => {
    server = await startServer();
    connection = await initDB(mongoTestURL);
    graphQlEndPoint = `http://localhost:${server.address().port}/graphql`;
});

afterAll(() => {
    server.close()
    connection.close();
});

beforeEach(() => resetTestDb(connection));

const createUser = async () => {
  const { email, password, firstName, lastName, displayName } = registerInput();

  return await axios({
    url: graphQlEndPoint,
    method: 'post',
    data: {
      query: `mutation {
      createUser(userInput: {
        email: \"${email}\",
        password: \"${password}\",
        firstName: \"${firstName}\",
        lastName: \"${lastName}\",
        displayName: \"${displayName}\"
      }) { 
            _id
          }
      }`
    }});
};

const login = async ({ e, p } = {}) => {
  const { email, password } = registerInput();

  return await axios({
    url: graphQlEndPoint,
    method: 'post',
    data: {
      query: `query {
      login(email: \"${e || email}\",
        password: \"${p || password}\") { 
            userId
            token
            tokenExpiration
          }
      }`
    }});
};

describe('user resolver flow', () => {
  test('success register flow', async () => {
    const response = await createUser();

    expect(response).not.toBeNull();
    expect(response.data).not.toBeNull();
    const { data } = response.data;
    expect(data).not.toBeNull();
    expect(data.createUser).not.toBeNull();
    expect(data.createUser._id).not.toBeNull();
    expect(data.createUser).toEqual({
      _id: expect.any(String)
    });
  });

  test('failure register flow::email already exist', async () => {
    await createUser();

    await createUser().catch(err => {
      expect(err).not.toBeNull();
      expect(err.response).not.toBeNull();
      expect(err.response.data).not.toBeNull();
      expect(err.response.data.errors).not.toBeNull();
      const error = err.response.data.errors;
      expect(error[0].message).toBe(errors.emailExist);
    });
  });

  test('success login flow', async () => {
    const user = await createUser();
    const response = await login();

    expect(response).not.toBeNull();
    expect(response.data).not.toBeNull();
    expect(response.data.data).not.toBeNull();
    const { data } = response.data;
    expect(data.login).not.toBeNull();
    expect(data.login.tokenExpiration).not.toBeNull();
    expect(data.login.token).not.toBeNull();
    expect(data.login.userId).toBe(user.data.data.createUser._id);
    expect(data.login).toEqual({
      token: expect.any(String),
      userId: expect.any(String),
      tokenExpiration: expect.any(Number)
    });
  });

  test('failure login flow::email not exist', async () => {
    const user = await createUser();

    await login({ e: 'invalid@notexist.com' }).catch(err => {
      expect(err).not.toBeNull();
      expect(err.response).not.toBeNull();
      expect(err.response.data).not.toBeNull();
      expect(err.response.data.errors).not.toBeNull();
      const error = err.response.data.errors;
      expect(error[0].message).toBe(errors.userNotExist);
    });
  });

  test('failure login flow::password not correct', async () => {
    const user = await createUser();

    await login({ p: 'invalidpassword' }).catch(err => {
      expect(err).not.toBeNull();
      expect(err.response).not.toBeNull();
      expect(err.response.data).not.toBeNull();
      expect(err.response.data.errors).not.toBeNull();
      const error = err.response.data.errors;
      expect(error[0].message).toBe(errors.passwordNotCorrect);
    });
  });
});
