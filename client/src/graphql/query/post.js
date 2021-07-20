import { gql } from '@apollo/client';

const postQuery = {
  posts: gql`
    query {
      posts {
        _id
        title
        description
      }
    }
  `
};

export default postQuery;
