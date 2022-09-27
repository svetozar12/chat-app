const mutationsSchema = `
type Mutation {
  loginUser(username: String!, password: String!): LoginUser!
  refreshToken(user_id: String!, RefreshToken: String!): LoginUser!
  logoutUser(auth: AuthModel!): Message!
  createChat(chat: ChatModel!, auth: AuthModel!): CreateChatMessage!
  createUser(user: UserModel!): Message!
  createInvite(auth: AuthModel!, reciever: String!): Invite!
  createInviteGroupChat(usersData: [String!]): CreateChatMessage!
  createMessage(chat_id: String!, auth: AuthModel!, message: String!): Messages!
  updateUser(auth: AuthModel!, user: UpdateUserModel!): Message!
  updateMessage(message_id: String!, newMessage: String!, auth: AuthModel!): Message!
  updateInvite(auth: AuthModel!, status: Status!, invite_id: String!): Invite!
  updateChat(auth: AuthModel!, chat_id: String!, username: String, usersData: [String]): Chat!
  deleteChat(auth: AuthModel!, chat_id: String!): Message!
  deleteMessage(auth: AuthModel!, message_id: String!): Message!
  deleteUser(auth: AuthModel!): Message!
}
`;

export default mutationsSchema;
