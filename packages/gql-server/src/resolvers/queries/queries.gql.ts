const querySchema = `
type Query {
  getUser(auth: AuthModel!): GetUserUnion!
  getChatById(chat_id: String!, auth: AuthModel!): ChatUnion!
  getAllChats(auth: AuthModel!): [ChatUnion!]!
  getAllMessages(auth: AuthModel!, chat_id: String!, query: Pagination): [MessagesUnion!]!
  getInvitesByReciever(auth: AuthModel!, status: Status): [InviteUnion!]!
  getInvitesByInviter(auth: AuthModel!, status: Status): [InviteUnion!]!
}`;

export default querySchema;
