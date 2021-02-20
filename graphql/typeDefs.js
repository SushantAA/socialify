const { gql } = require("apollo-server");

module.exports = gql`

  type Comments{
    id:ID!
    createdAt:String!
    username:String!
    body:String!
  }

  type Likes{
    id:ID!
    createdAt:String!
    username:String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comments]
    likes: [Likes]
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
    createComment(postId:String!,body:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID!):Post!
  }
`;
