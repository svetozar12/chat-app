import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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

export type Auth = {
  __typename?: 'Auth';
  AccessToken: Scalars['String'];
  userId: Scalars['String'];
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
  Access_token: Scalars['String'];
  Refresh_token: Scalars['String'];
  user_id: Scalars['String'];
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

export type CreateChatMutationVariables = Exact<{
  chat: ChatModel;
  auth: AuthModel;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'CreateChatMessage', Message: string, data: { __typename?: 'Chat', _id: string, members: Array<string> } } };

export type CreateInviteMutationVariables = Exact<{
  auth: AuthModel;
  reciever: Scalars['String'];
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string } };

export type CreateInviteGroupChatMutationVariables = Exact<{
  usersData?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateInviteGroupChatMutation = { __typename?: 'Mutation', createInviteGroupChat: { __typename?: 'CreateChatMessage', Message: string, data: { __typename?: 'Chat', _id: string, members: Array<string> } } };

export type CreateMessageMutationVariables = Exact<{
  chat_id: Scalars['String'];
  message: Scalars['String'];
  auth: AuthModel;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Messages', _id: string, user_id: string, chat_id: string, sender: string, message: string, seenBy: Array<string> } };

export type CreateUserMutationVariables = Exact<{
  user: UserModel;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Message', Message: string } };

export type DeleteChatMutationVariables = Exact<{
  chat_id: Scalars['String'];
  auth: AuthModel;
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat: { __typename?: 'Message', Message: string } };

export type DeleteMessageMutationVariables = Exact<{
  auth: AuthModel;
  message_id: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'Message', Message: string } };

export type DeleteUserMutationVariables = Exact<{
  auth: AuthModel;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'Message', Message: string } };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUser', user_id: string, Access_token: string, Refresh_token: string } };

export type LogoutUserMutationVariables = Exact<{
  auth: AuthModel;
}>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'Message', Message: string } };

export type RefreshTokenMutationVariables = Exact<{
  user_id: Scalars['String'];
  RefreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'LoginUser', user_id: string, Access_token: string, Refresh_token: string } };

export type UpdateChatMutationVariables = Exact<{
  auth: AuthModel;
  chat_id: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  usersData?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type UpdateChatMutation = { __typename?: 'Mutation', updateChat: { __typename?: 'Chat', _id: string, members: Array<string> } };

export type UpdateInviteMutationVariables = Exact<{
  auth: AuthModel;
  status: Scalars['String'];
  invite_id: Scalars['String'];
}>;


export type UpdateInviteMutation = { __typename?: 'Mutation', updateInvite: { __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string } };

export type UpdateMessageMutationVariables = Exact<{
  auth: AuthModel;
  message_id: Scalars['String'];
  newMessage: Scalars['String'];
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage: { __typename?: 'Message', Message: string } };

export type UpdateUserMutationVariables = Exact<{
  auth: AuthModel;
  user: UpdateUserModel;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'Message', Message: string } };

export type GetAllChatsQueryVariables = Exact<{
  auth: AuthModel;
}>;


export type GetAllChatsQuery = { __typename?: 'Query', getAllChats: Array<{ __typename?: 'Chat', _id: string, members: Array<string> }> };

export type GetAllMessagesQueryVariables = Exact<{
  auth: AuthModel;
  chat_id: Scalars['String'];
  query?: InputMaybe<Pagination>;
}>;


export type GetAllMessagesQuery = { __typename?: 'Query', getAllMessages: Array<{ __typename?: 'Messages', _id: string, user_id: string, chat_id: string, sender: string, message: string, seenBy: Array<string> }> };

export type GetChatByIdQueryVariables = Exact<{
  chat_id: Scalars['String'];
  auth: AuthModel;
}>;


export type GetChatByIdQuery = { __typename?: 'Query', getChatById: { __typename?: 'Chat', _id: string, members: Array<string> } };

export type GetInvitesByRecieverQueryVariables = Exact<{
  auth: AuthModel;
  status?: InputMaybe<Scalars['String']>;
}>;


export type GetInvitesByRecieverQuery = { __typename?: 'Query', getInvitesByReciever: Array<{ __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string }> };

export type GetInvitesByInviterQueryVariables = Exact<{
  auth: AuthModel;
  status?: InputMaybe<Scalars['String']>;
}>;


export type GetInvitesByInviterQuery = { __typename?: 'Query', getInvitesByInviter: Array<{ __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string }> };

export type GetUserQueryVariables = Exact<{
  auth: AuthModel;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'getUser', _id: string, username: string, email: string, userAvatar: string } };


export const CreateChatDocument = gql`
    mutation createChat($chat: ChatModel!, $auth: AuthModel!) {
  createChat(chat: $chat, auth: $auth) {
    Message
    data {
      _id
      members
    }
  }
}
    `;
export const CreateInviteDocument = gql`
    mutation createInvite($auth: AuthModel!, $reciever: String!) {
  createInvite(auth: $auth, reciever: $reciever) {
    _id
    inviter
    reciever
    status
  }
}
    `;
export const CreateInviteGroupChatDocument = gql`
    mutation createInviteGroupChat($usersData: [String!]) {
  createInviteGroupChat(usersData: $usersData) {
    Message
    data {
      _id
      members
    }
  }
}
    `;
export const CreateMessageDocument = gql`
    mutation createMessage($chat_id: String!, $message: String!, $auth: AuthModel!) {
  createMessage(chat_id: $chat_id, message: $message, auth: $auth) {
    _id
    user_id
    chat_id
    sender
    message
    seenBy
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($user: UserModel!) {
  createUser(user: $user) {
    Message
  }
}
    `;
export const DeleteChatDocument = gql`
    mutation deleteChat($chat_id: String!, $auth: AuthModel!) {
  deleteChat(chat_id: $chat_id, auth: $auth) {
    Message
  }
}
    `;
export const DeleteMessageDocument = gql`
    mutation deleteMessage($auth: AuthModel!, $message_id: String!) {
  deleteMessage(auth: $auth, message_id: $message_id) {
    Message
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation deleteUser($auth: AuthModel!) {
  deleteUser(auth: $auth) {
    Message
  }
}
    `;
export const LoginUserDocument = gql`
    mutation loginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    user_id
    Access_token
    Refresh_token
  }
}
    `;
export const LogoutUserDocument = gql`
    mutation logoutUser($auth: AuthModel!) {
  logoutUser(auth: $auth) {
    Message
  }
}
    `;
export const RefreshTokenDocument = gql`
    mutation refreshToken($user_id: String!, $RefreshToken: String!) {
  refreshToken(user_id: $user_id, RefreshToken: $RefreshToken) {
    user_id
    Access_token
    Refresh_token
  }
}
    `;
export const UpdateChatDocument = gql`
    mutation updateChat($auth: AuthModel!, $chat_id: String!, $username: String, $usersData: [String]) {
  updateChat(
    auth: $auth
    chat_id: $chat_id
    username: $username
    usersData: $usersData
  ) {
    _id
    members
  }
}
    `;
export const UpdateInviteDocument = gql`
    mutation updateInvite($auth: AuthModel!, $status: String!, $invite_id: String!) {
  updateInvite(auth: $auth, status: $status, invite_id: $invite_id) {
    _id
    inviter
    reciever
    status
  }
}
    `;
export const UpdateMessageDocument = gql`
    mutation updateMessage($auth: AuthModel!, $message_id: String!, $newMessage: String!) {
  updateMessage(auth: $auth, message_id: $message_id, newMessage: $newMessage) {
    Message
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($auth: AuthModel!, $user: UpdateUserModel!) {
  updateUser(auth: $auth, user: $user) {
    Message
  }
}
    `;
export const GetAllChatsDocument = gql`
    query getAllChats($auth: AuthModel!) {
  getAllChats(auth: $auth) {
    _id
    members
  }
}
    `;
export const GetAllMessagesDocument = gql`
    query getAllMessages($auth: AuthModel!, $chat_id: String!, $query: Pagination) {
  getAllMessages(auth: $auth, chat_id: $chat_id, query: $query) {
    _id
    user_id
    chat_id
    sender
    message
    seenBy
  }
}
    `;
export const GetChatByIdDocument = gql`
    query getChatById($chat_id: String!, $auth: AuthModel!) {
  getChatById(chat_id: $chat_id, auth: $auth) {
    _id
    members
  }
}
    `;
export const GetInvitesByRecieverDocument = gql`
    query getInvitesByReciever($auth: AuthModel!, $status: String) {
  getInvitesByReciever(auth: $auth, status: $status) {
    _id
    inviter
    reciever
    status
  }
}
    `;
export const GetInvitesByInviterDocument = gql`
    query getInvitesByInviter($auth: AuthModel!, $status: String) {
  getInvitesByInviter(auth: $auth, status: $status) {
    _id
    inviter
    reciever
    status
  }
}
    `;
export const GetUserDocument = gql`
    query getUser($auth: AuthModel!) {
  getUser(auth: $auth) {
    _id
    username
    email
    userAvatar
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createChat(variables: CreateChatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateChatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateChatMutation>(CreateChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createChat', 'mutation');
    },
    createInvite(variables: CreateInviteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateInviteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateInviteMutation>(CreateInviteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createInvite', 'mutation');
    },
    createInviteGroupChat(variables?: CreateInviteGroupChatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateInviteGroupChatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateInviteGroupChatMutation>(CreateInviteGroupChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createInviteGroupChat', 'mutation');
    },
    createMessage(variables: CreateMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMessageMutation>(CreateMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createMessage', 'mutation');
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    deleteChat(variables: DeleteChatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteChatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteChatMutation>(DeleteChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteChat', 'mutation');
    },
    deleteMessage(variables: DeleteMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMessageMutation>(DeleteMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteMessage', 'mutation');
    },
    deleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteUser', 'mutation');
    },
    loginUser(variables: LoginUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginUserMutation>(LoginUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'loginUser', 'mutation');
    },
    logoutUser(variables: LogoutUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogoutUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutUserMutation>(LogoutUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logoutUser', 'mutation');
    },
    refreshToken(variables: RefreshTokenMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RefreshTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RefreshTokenMutation>(RefreshTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'refreshToken', 'mutation');
    },
    updateChat(variables: UpdateChatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateChatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateChatMutation>(UpdateChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateChat', 'mutation');
    },
    updateInvite(variables: UpdateInviteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateInviteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateInviteMutation>(UpdateInviteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateInvite', 'mutation');
    },
    updateMessage(variables: UpdateMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMessageMutation>(UpdateMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateMessage', 'mutation');
    },
    updateUser(variables: UpdateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUser', 'mutation');
    },
    getAllChats(variables: GetAllChatsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllChatsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllChatsQuery>(GetAllChatsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllChats', 'query');
    },
    getAllMessages(variables: GetAllMessagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllMessagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllMessagesQuery>(GetAllMessagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllMessages', 'query');
    },
    getChatById(variables: GetChatByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetChatByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChatByIdQuery>(GetChatByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChatById', 'query');
    },
    getInvitesByReciever(variables: GetInvitesByRecieverQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInvitesByRecieverQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInvitesByRecieverQuery>(GetInvitesByRecieverDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInvitesByReciever', 'query');
    },
    getInvitesByInviter(variables: GetInvitesByInviterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInvitesByInviterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInvitesByInviterQuery>(GetInvitesByInviterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInvitesByInviter', 'query');
    },
    getUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;