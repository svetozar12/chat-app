const mutationsSchema = `
type Mutation {
  loginUser(username: String!, password: String!): LoginUserUnion!
  refreshToken(user_id: String!, RefreshToken: String!): LoginUserUnion!
  logoutUser(auth: AuthModel!): MessageUnion!
  createChat(chat: ChatModel!, auth: AuthModel!): ChatUnion!
  createUser(user: UserModel!): MessageUnion!
  createInvite(auth: AuthModel!, reciever: String!): InviteUnion!
  createInviteGroupChat(usersData: [String!]): CreateChatMessageUnion!
  createMessage(chat_id: String!, auth: AuthModel!, message: String!): MessagesUnion!
  updateUser(auth: AuthModel!, user: UpdateUserModel!): MessageUnion!
  updateMessage(message_id: String!, newMessage: String!, auth: AuthModel!): MessageUnion!
  updateInvite(auth: AuthModel!, status: Status!, invite_id: String!): InviteUnion!
  updateChat(auth: AuthModel!, chat_id: String!, username: String, usersData: [String]): ChatUnion!
  deleteChat(auth: AuthModel!, chat_id: String!): MessageUnion!
  deleteMessage(auth: AuthModel!, message_id: String!): MessageUnion!
  deleteUser(auth: AuthModel!): MessageUnion!
}
`;

export default mutationsSchema;
