import { gql } from "@apollo/client";

export const getUser = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      username
      gender
    }
  }
`;

// if byInviter param is set to false it means that query will search byReciever
export const getInvite = gql`
  query getInvite($username: String!, $byInviter: Boolean!) {
    getInvite(username: $username, byInviter: $byInviter) {
      _id
      inviter
      reciever
      status
    }
  }
`;
