const querySchema = `
type Query {
  getUser(auth: AuthModel!): GetUserUnion!
  getUserList(auth: AuthModel!, userIds: [String]!): GetUserListUnion!
  getChatById(chat_id: String!, auth: AuthModel!): ChatUnion!
  getAllChats(auth: AuthModel!): ChatListUnion!
  getAllMessages(auth: AuthModel!, chat_id: String!, query: Pagination): MessagesListUnion!
  getInvitesByReciever(auth: AuthModel!, status: Status!): InviteListUnion!
  getInvitesByInviter(auth: AuthModel!, status: Status!): InviteListUnion!
}`;

export default querySchema;
