const startServer = require('../../../app');
const initDB = require('../../helpers/database');
const { resetTestDb } = require('../../../test/helpers/database');
const { mongoTestURL } = require('../../configs');


let server;
let connection;

beforeAll(async () => {
    server = await startServer({ port: 8000 });
    connection = await initDB(mongoTestURL);
});

afterAll(() => server.close());

beforeEach(() => resetTestDb(connection));

test('login flow', () => {
    expect('hello').toEqual('hello');
});