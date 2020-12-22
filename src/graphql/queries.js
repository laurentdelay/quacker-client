import { gql } from "@apollo/client";

const FETCH_QUACKS = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      likes {
        username
      }
      commentsCount
      likesCount
    }
  }
`;

const FETCH_SINGLE_QUACK = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likes {
        id
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
      commentsCount
      likesCount
    }
  }
`;

export { FETCH_QUACKS, FETCH_SINGLE_QUACK };
