export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = {
  __typename?: 'Chat';
  _id: Maybe<Scalars['String']>;
  members: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ChatModel = {
  invite_id?: InputMaybe<Scalars['String']>;
  user1?: InputMaybe<Scalars['String']>;
  user2?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type CreateChatMessage = {
  __typename?: 'CreateChatMessage';
  Message: Maybe<Scalars['String']>;
  data: Maybe<Chat>;
};

export type Invite = {
  __typename?: 'Invite';
  _id: Maybe<Scalars['String']>;
  inviter: Maybe<Scalars['String']>;
  reciever: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
};

export type LoginUser = {
  __typename?: 'LoginUser';
  Access_token: Maybe<Scalars['String']>;
  Refresh_token: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  Message: Maybe<Scalars['String']>;
};

export type Messages = {
  __typename?: 'Messages';
  _id: Maybe<Scalars['String']>;
  chat_id: Maybe<Scalars['String']>;
  message: Maybe<Scalars['String']>;
  seenBy: Maybe<Array<Maybe<Scalars['String']>>>;
  sender: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Maybe<CreateChatMessage>;
  createInvite: Maybe<Invite>;
  createInviteGroupChat: Maybe<CreateChatMessage>;
  createMessage: Maybe<Messages>;
  createUser: Maybe<Message>;
  deleteChat: Maybe<Message>;
  deleteMessage: Maybe<Message>;
  deleteUser: Maybe<Message>;
  loginUser: Maybe<LoginUser>;
  logoutUser: Maybe<Message>;
  refreshToken: Maybe<LoginUser>;
  updateChat: Maybe<Chat>;
  updateInvite: Maybe<Invite>;
  updateMessage: Maybe<Message>;
  updateUser: Maybe<Message>;
};


export type MutationCreateChatArgs = {
  chat: ChatModel;
  token: Scalars['String'];
};


export type MutationCreateInviteArgs = {
  reciever: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationCreateInviteGroupChatArgs = {
  usersData?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationCreateMessageArgs = {
  chat_id: Scalars['String'];
  message: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  user: UserModel;
};


export type MutationDeleteChatArgs = {
  chat_id: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  message_id: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLogoutUserArgs = {
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationUpdateChatArgs = {
  chat_id: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  usersData?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdateInviteArgs = {
  invite_id: Scalars['String'];
  status: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationUpdateMessageArgs = {
  message_id: Scalars['String'];
  newMessage: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  token: Scalars['String'];
  user: UpdateUserModel;
  user_id: Scalars['String'];
};

export type Pagination = {
  page_number?: InputMaybe<Scalars['Int']>;
  page_size?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getAllChats: Maybe<Array<Maybe<Chat>>>;
  getAllMessages: Maybe<Array<Maybe<Messages>>>;
  getChatById: Maybe<Chat>;
  getInvitesByInviter: Maybe<Array<Maybe<Invite>>>;
  getInvitesByReciever: Maybe<Array<Maybe<Invite>>>;
  getUser: Maybe<GetUser>;
};


export type QueryGetAllChatsArgs = {
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type QueryGetAllMessagesArgs = {
  chat_id: Scalars['String'];
  query?: InputMaybe<Pagination>;
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type QueryGetChatByIdArgs = {
  chat_id: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type QueryGetInvitesByInviterArgs = {
  status?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type QueryGetInvitesByRecieverArgs = {
  status?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  user_id: Scalars['String'];
};


export type QueryGetUserArgs = {
  token: Scalars['String'];
  user_id: Scalars['String'];
};

export type UpdateUserModel = {
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserModel = {
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type GetUser = {
  __typename?: 'getUser';
  _id: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  userAvatar: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
};
