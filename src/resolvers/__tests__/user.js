const startServer = require('../../../app');
const initDB = require('../../helpers/database');
const { resetTestDb } = require('../../../test/helpers/database');
const { registerInput } = require('../../../test/helpers/mock');
const { mongoTestURL, errors } = require('../../configs');

const graphqlResolver = require('../index');

let server;
let connection;

const addUser = async () => {
  const userInput = registerInput();
  const user = await graphqlResolver.createUser({ userInput });
  return user;
}

beforeAll(async () => {
    server = await startServer({ port: 8000 });
    connection = await initDB(mongoTestURL);
});

afterAll(() => {
    server.close()
    connection.close();
});

beforeEach(() => resetTestDb(connection));

describe('user resolver flow', () => {
  test('success register flow', async () => {
    const user = await addUser();

    expect(user).not.toBeNull();
    expect(user._id).not.toBeNull();
  });

  test('failure register flow::email already exist', async () => {
    await addUser();

    try {
      await addUser();
    } catch (e) {
      const getError = () => {
        throw new Error(e);
      }
      expect(e).not.toBeNull();
      expect(getError).toThrow(Error);
      expect(getError).toThrow(errors.emailExist);
    }
  });

  test('success login flow', async () => {
    const user = await addUser();
    const { email, password } = registerInput();

    const loginResponse = await graphqlResolver.login({ email, password });
    expect(loginResponse).not.toBeNull();
    expect(loginResponse.userId).not.toBeNull();
    expect(loginResponse.token).not.toBeNull();
    expect(loginResponse.tokenExpiration).not.toBeNull();
    expect(loginResponse.userId).toBe(user._id);
    expect(loginResponse).toEqual({
      token: expect.any(String),
      userId: expect.any(String),
      tokenExpiration: expect.any(Number)
    });
  });
});
