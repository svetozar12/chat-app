const querySchema = `
type Query {
  getUser(auth: AuthModel!): getUser!
  getChatById(chat_id: String!, auth: AuthModel!): Chat!
  getAllChats(auth: AuthModel!): [Chat!]!
  getAllMessages(auth: AuthModel!, chat_id: String!, query: Pagination): [Messages!]!
  getInvitesByReciever(auth: AuthModel!, status: Status): [Invite!]!
  getInvitesByInviter(auth: AuthModel!, status: Status): [Invite!]!
}`;

export default querySchema;
