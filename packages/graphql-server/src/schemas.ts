import { buildSchema } from "graphql";

const Schema = buildSchema(`
  type Query {
    getUser(user_id: String!,token: String!): getUser
    getChatById(chat_id: String!,user_id: String!,token:String!): Chat
    getAllChats(user_id: String!,token: String!): [Chat]
    getAllMessages(user_id: String!,chat_id: String!, token: String!, query: Pagination): [Messages]
    getInvitesByReciever(user_id: String!,token: String!, status: String): [Invite]
    getInvitesByInviter(user_id: String!,token: String!, status: String): [Invite]

  }

  type Mutation {
    loginUser(username: String!,password: String!): LoginUser
    refreshToken(user_id: String!, token: String!): LoginUser
    updateUser(user_id: String!,token: String!, user:UpdateUserModel!): Message
    updateChat(user_id: String!,chat_id: String!,token: String!,username: String, usersData: [String]): Chat
    logoutUser(user_id: String!,token: String!): Message
    createChat(chat: ChatModel!): Message
    deleteChat(user_id: String!, chat_id: String!, token: String!): Message
    createUser(user: UserModel!): Message
    createMessage(chat_id: String!, user_id: String!, message: String!, token: String!): Messages
  }

  input Pagination {
    page_size: Int
    page_number: Int
  }

  input UserModel {
    username: String
    password: String
    email: String
    gender: String
  }

  input UpdateUserModel { 
    username: String
    email: String
    gender: String
  }

  input ChatModel {
    user_id: String
    invite_id: String
    user1: String
    user2: String
  }

  type LoginUser {
    user_id: String
    Access_token: String
    Refresh_token: String
  }

  type getUser {
    _id: String
    username: String
    email: String
  }

  type Message {
    Message:String
  }

  type Messages {
    user_id: String
    chat_id: String
    sender: String
    message: String
    seenBy: [String]
  }

  type Chat {
    _id: String
    members: [String]
  }

  type Invite {
    user_id: String
    inviter: String
    reciever: String
    status: String
  }
`);

export default Schema;
