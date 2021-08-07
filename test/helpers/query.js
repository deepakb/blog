const axios = require('axios');
const { registerInput, postInput } = require('./mock');

const generateQuery = (graphQlEndPoint) => {

  return {
    createUser: async () => {
      const { email, password, firstName, lastName, displayName } = registerInput;

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
    },
    login: async ({ e, p } = {}) => {
      const { email, password } = registerInput;

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
    },
    createPost: async (token) => {
      const { title, description } = postInput;
      const postConfig = {
        url: graphQlEndPoint,
        method: 'post',
        data: {
          query: `mutation {
          createPost(postInput: {
            title: \"${title}\",
            description: \"${description}\"
          }) { 
                _id
                title
                description
                createdBy {
                  _id
                }
              }
          }`
        }};
      
      if (token) {
        postConfig.headers = { 'Authorization': `Bearer ${token}` };
      }
      return await axios(postConfig);
    },
    publishPost: async (postId, token) => {
      const postConfig = {
        url: graphQlEndPoint,
        method: 'post',
        data: {
          query: `mutation {
          publishPost(postId: \"${postId}\") { 
            _id
            publishedOn
            createdBy {
              _id
            }
          }}`
        }};
      
      if (token) {
        postConfig.headers = { 'Authorization': `Bearer ${token}` };
      }
      return await axios(postConfig);
    }
  }
};

module.exports = generateQuery;