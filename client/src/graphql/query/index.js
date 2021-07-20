import userQuery from './user';
import postQuery from './post';
import commentQuery from './comment';

const graphqlQuery = {
  ...userQuery,
  ...postQuery,
  ...commentQuery
};

export default graphqlQuery;
