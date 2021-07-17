const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const connect = require('./src/helpers/database');

const graphqlSchema = require('./src/schema');
const graphqlResolver = require('./src/resolvers');

const app = express();

app.use(express.json());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: graphqlResolver,
		graphiql: true,
	})
);

connect(() => {
	app.listen(3000, () => {
		console.log('app started on port 3000!');
	});
});
