const indexSchema = `
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

  type LoginUser {
    userId: String!
    AccessToken: String!
    RefreshToken: String!
  }

  type getUser {
    _id: String!
    username: String!
    email: String!
    userAvatar: String!
  }

  type Message {
    Message: String!
  }

  type CreateChatMessage {
    Message: String!
    data: Chat!
  }

  type Messages {
    _id: String!
    user_id: String!
    chat_id: String!
    sender: String!
    message: String!
    seenBy: [String!]!
  }

  type Chat {
    _id: String!
    members: [String!]!
  }

  type Invite {
    _id: String!
    inviter: String!
    reciever: String!
    status: String!
  }

  input AuthModel {
    userId: String!
    AccessToken: String!
  }

  enum Status {
    accepted
    recieved
    declined
  }

  enum Gender {
    Male
    Female
  }
`;

export default indexSchema;
