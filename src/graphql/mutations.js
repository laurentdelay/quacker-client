import { gql } from "@apollo/client";

const REGISTER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const ADD_QUACK = gql`
  mutation createQuack($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      commentsCount
      likesCount
    }
  }
`;

const LIKE_QUACK = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
      likesCount
    }
  }
`;

const DELETE_QUACK = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const COMMENT_QUACK = gql`
  mutation addComment($postId: ID!, $body: String!) {
    addComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentsCount
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
      }
      commentsCount
    }
  }
`;

export {
  REGISTER,
  LOGIN,
  ADD_QUACK,
  LIKE_QUACK,
  DELETE_QUACK,
  COMMENT_QUACK,
  DELETE_COMMENT,
};
