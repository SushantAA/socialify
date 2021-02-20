const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
    getPost(postId : ID!): Post
    # sayHi:String!
  }

  type Mutation {
    # (input ) : return type
    register(registerInput: RegisterInput): User! 
    login(username: String!, password: String!): User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
  }
`;
