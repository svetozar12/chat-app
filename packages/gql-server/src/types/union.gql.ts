export const unionSchema = `
union GetUserUnion = getUser | Error
union LoginUserUnion = LoginUser | Error
union InviteUnion = Invite | Error
union ChatUnion = Chat | Error
union MessagesUnion = Messages | Error
union CreateChatMessageUnion = CreateChatMessage | Error
union MessageUnion = Message | Error`;
