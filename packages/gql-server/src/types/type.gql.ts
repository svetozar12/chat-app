export const typeSchema = `
  type Error {
    message:String!
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

  type MessagesList {
    res: [Messages]
  }

  type Chat {
    _id: String!
    members: [String!]!
  }

  type ChatList {
    res: [Chat]
  }

  type Invite {
    _id: String!
    inviter: String!
    reciever: String!
    status: String!
  }

  type InviteList {
    res: [Invite]
  }
`;
