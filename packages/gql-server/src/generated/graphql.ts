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

export type AuthModel = {
  AccessToken: Scalars['String'];
  userId: Scalars['String'];
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String'];
  members: Array<Scalars['String']>;
};

export type ChatModel = {
  invite_id: Scalars['String'];
  user1: Scalars['String'];
  user2: Scalars['String'];
  user_id: Scalars['String'];
};

export type CreateChatMessage = {
  __typename?: 'CreateChatMessage';
  Message: Scalars['String'];
  data: Chat;
};

export type Invite = {
  __typename?: 'Invite';
  _id: Scalars['String'];
  inviter: Scalars['String'];
  reciever: Scalars['String'];
  status: Scalars['String'];
};

export type LoginUser = {
  __typename?: 'LoginUser';
  AccessToken: Scalars['String'];
  RefreshToken: Scalars['String'];
  userId: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  Message: Scalars['String'];
};

export type Messages = {
  __typename?: 'Messages';
  _id: Scalars['String'];
  chat_id: Scalars['String'];
  message: Scalars['String'];
  seenBy: Array<Scalars['String']>;
  sender: Scalars['String'];
  user_id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: CreateChatMessage;
  createInvite: Invite;
  createInviteGroupChat: CreateChatMessage;
  createMessage: Messages;
  createUser: Message;
  deleteChat: Message;
  deleteMessage: Message;
  deleteUser: Message;
  loginUser: LoginUser;
  logoutUser: Message;
  refreshToken: LoginUser;
  updateChat: Chat;
  updateInvite: Invite;
  updateMessage: Message;
  updateUser: Message;
};


export type MutationCreateChatArgs = {
  auth: AuthModel;
  chat: ChatModel;
};


export type MutationCreateInviteArgs = {
  auth: AuthModel;
  reciever: Scalars['String'];
};


export type MutationCreateInviteGroupChatArgs = {
  usersData?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationCreateMessageArgs = {
  auth: AuthModel;
  chat_id: Scalars['String'];
  message: Scalars['String'];
};


export type MutationCreateUserArgs = {
  user: UserModel;
};


export type MutationDeleteChatArgs = {
  auth: AuthModel;
  chat_id: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  auth: AuthModel;
  message_id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  auth: AuthModel;
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLogoutUserArgs = {
  auth: AuthModel;
};


export type MutationRefreshTokenArgs = {
  RefreshToken: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationUpdateChatArgs = {
  auth: AuthModel;
  chat_id: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  usersData?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdateInviteArgs = {
  auth: AuthModel;
  invite_id: Scalars['String'];
  status: Scalars['String'];
};


export type MutationUpdateMessageArgs = {
  auth: AuthModel;
  message_id: Scalars['String'];
  newMessage: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  auth: AuthModel;
  user: UpdateUserModel;
};

export type Pagination = {
  page_number: Scalars['Int'];
  page_size: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getAllChats: Array<Chat>;
  getAllMessages: Array<Messages>;
  getChatById: Chat;
  getInvitesByInviter: Array<Invite>;
  getInvitesByReciever: Array<Invite>;
  getUser: GetUser;
};


export type QueryGetAllChatsArgs = {
  auth: AuthModel;
};


export type QueryGetAllMessagesArgs = {
  auth: AuthModel;
  chat_id: Scalars['String'];
  query?: InputMaybe<Pagination>;
};


export type QueryGetChatByIdArgs = {
  auth: AuthModel;
  chat_id: Scalars['String'];
};


export type QueryGetInvitesByInviterArgs = {
  auth: AuthModel;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryGetInvitesByRecieverArgs = {
  auth: AuthModel;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  auth: AuthModel;
};

export type UpdateUserModel = {
  email: Scalars['String'];
  gender: Scalars['String'];
  username: Scalars['String'];
};

export type UserModel = {
  email: Scalars['String'];
  gender: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GetUser = {
  __typename?: 'getUser';
  _id: Scalars['String'];
  email: Scalars['String'];
  userAvatar: Scalars['String'];
  username: Scalars['String'];
};
