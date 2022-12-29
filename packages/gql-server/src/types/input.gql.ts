export const inputSchema = `
input Pagination {
    page_size: Int!
    page_number: Int!
  }

  input UserModel {
    username: String!
    password: String!
    email: String!
    gender: Gender!
  }

  input UpdateUserModel {
    username: String!
    email: String!
    gender: Gender!
  }

  input ChatModel {
    user_id: String!
    invite_id: String!
    user1: String!
    user2: String!
  }
  
  input AuthModel {
    userId: String!
    AccessToken: String!
  }`;
