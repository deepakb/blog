import { useQuery } from '@apollo/client';

import graphqlQuery from '../graphql/query';

import Post from '../components/Post';

const Posts = () => {
  const { loading, error, data } = useQuery(graphqlQuery.posts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.posts.map(({ _id, title, description }) => (
    <Post key={_id} id={_id} title={title} description={description} />
  ));
};

export default Posts;
