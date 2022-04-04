import { gql } from "@apollo/client";

export const createUser = gql`
  mutation {
    CREATE_USER($username: String!, $password: String!, $email: String!, $gender: String!) {
      createUser(username:$username,email:$email,userAvatar:$userAvatar;gender:$gender) {
        username
        email
        userAvatar
        gender
      }
    }
  }
`;
