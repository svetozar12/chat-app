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
  token: Scalars['String'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'CreateChatMessage', Message: string, data: { __typename?: 'Chat', _id: string, members: Array<string> } } };

export type CreateInviteMutationVariables = Exact<{
  user_id: Scalars['String'];
  reciever: Scalars['String'];
  token: Scalars['String'];
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string } };

export type CreateInviteGroupChatMutationVariables = Exact<{
  usersData?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateInviteGroupChatMutation = { __typename?: 'Mutation', createInviteGroupChat: { __typename?: 'CreateChatMessage', Message: string, data: { __typename?: 'Chat', _id: string, members: Array<string> } } };

export type CreateMessageMutationVariables = Exact<{
  chat_id: Scalars['String'];
  user_id: Scalars['String'];
  message: Scalars['String'];
  token: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Messages', _id: string, user_id: string, chat_id: string, sender: string, message: string, seenBy: Array<string> } };

export type CreateUserMutationVariables = Exact<{
  user: UserModel;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Message', Message: string } };

export type DeleteChatMutationVariables = Exact<{
  user_id: Scalars['String'];
  chat_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat: { __typename?: 'Message', Message: string } };

export type DeleteMessageMutationVariables = Exact<{
  user_id: Scalars['String'];
  message_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'Message', Message: string } };

export type DeleteUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'Message', Message: string } };

export type LogoutUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'Message', Message: string } };

export type RefreshTokenMutationVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'LoginUser', user_id: string, Access_token: string, Refresh_token: string } };

export type UpdateChatMutationVariables = Exact<{
  user_id: Scalars['String'];
  chat_id: Scalars['String'];
  token: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  usersData?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type UpdateChatMutation = { __typename?: 'Mutation', updateChat: { __typename?: 'Chat', _id: string, members: Array<string> } };

export type UpdateInviteMutationVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
  status: Scalars['String'];
  invite_id: Scalars['String'];
}>;


export type UpdateInviteMutation = { __typename?: 'Mutation', updateInvite: { __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string } };

export type UpdateMessageMutationVariables = Exact<{
  user_id: Scalars['String'];
  message_id: Scalars['String'];
  newMessage: Scalars['String'];
  token: Scalars['String'];
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage: { __typename?: 'Message', Message: string } };

export type UpdateUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
  user: UpdateUserModel;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'Message', Message: string } };

export type GetAllChatsQueryVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type GetAllChatsQuery = { __typename?: 'Query', getAllChats: Array<{ __typename?: 'Chat', _id: string, members: Array<string> }> };

export type GetAllMessagesQueryVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
  chat_id: Scalars['String'];
  query?: InputMaybe<Pagination>;
}>;


export type GetAllMessagesQuery = { __typename?: 'Query', getAllMessages: Array<{ __typename?: 'Messages', _id: string, user_id: string, chat_id: string, sender: string, message: string, seenBy: Array<string> }> };

export type GetChatByIdQueryVariables = Exact<{
  chat_id: Scalars['String'];
  user_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type GetChatByIdQuery = { __typename?: 'Query', getChatById: { __typename?: 'Chat', _id: string, members: Array<string> } };

export type GetInvitesByRecieverQueryVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
}>;


export type GetInvitesByRecieverQuery = { __typename?: 'Query', getInvitesByReciever: Array<{ __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string }> };

export type GetInvitesByInviterQueryVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
}>;


export type GetInvitesByInviterQuery = { __typename?: 'Query', getInvitesByInviter: Array<{ __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string }> };

export type GetUserQueryVariables = Exact<{
  user_id: Scalars['String'];
  token: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'getUser', _id: string, username: string, email: string, userAvatar: string } };


export const CreateChatDocument = gql`
    mutation createChat($chat: ChatModel!, $token: String!) {
  createChat(chat: $chat, token: $token) {
    Message
    data {
      _id
      members
    }
  }
}
    `;
export const CreateInviteDocument = gql`
    mutation createInvite($user_id: String!, $reciever: String!, $token: String!) {
  createInvite(user_id: $user_id, reciever: $reciever, token: $token) {
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
    mutation createMessage($chat_id: String!, $user_id: String!, $message: String!, $token: String!) {
  createMessage(
    chat_id: $chat_id
    user_id: $user_id
    message: $message
    token: $token
  ) {
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
    mutation deleteChat($user_id: String!, $chat_id: String!, $token: String!) {
  deleteChat(user_id: $user_id, chat_id: $chat_id, token: $token) {
    Message
  }
}
    `;
export const DeleteMessageDocument = gql`
    mutation deleteMessage($user_id: String!, $message_id: String!, $token: String!) {
  deleteMessage(user_id: $user_id, message_id: $message_id, token: $token) {
    Message
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation deleteUser($user_id: String!, $token: String!) {
  deleteUser(user_id: $user_id, token: $token) {
    Message
  }
}
    `;
export const LogoutUserDocument = gql`
    mutation logoutUser($user_id: String!, $token: String!) {
  logoutUser(user_id: $user_id, token: $token) {
    Message
  }
}
    `;
export const RefreshTokenDocument = gql`
    mutation refreshToken($user_id: String!, $token: String!) {
  refreshToken(user_id: $user_id, token: $token) {
    user_id
    Access_token
    Refresh_token
  }
}
    `;
export const UpdateChatDocument = gql`
    mutation updateChat($user_id: String!, $chat_id: String!, $token: String!, $username: String, $usersData: [String]) {
  updateChat(
    user_id: $user_id
    chat_id: $chat_id
    token: $token
    username: $username
    usersData: $usersData
  ) {
    _id
    members
  }
}
    `;
export const UpdateInviteDocument = gql`
    mutation updateInvite($user_id: String!, $token: String!, $status: String!, $invite_id: String!) {
  updateInvite(
    user_id: $user_id
    token: $token
    status: $status
    invite_id: $invite_id
  ) {
    _id
    inviter
    reciever
    status
  }
}
    `;
export const UpdateMessageDocument = gql`
    mutation updateMessage($user_id: String!, $message_id: String!, $newMessage: String!, $token: String!) {
  updateMessage(
    user_id: $user_id
    message_id: $message_id
    newMessage: $newMessage
    token: $token
  ) {
    Message
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($user_id: String!, $token: String!, $user: UpdateUserModel!) {
  updateUser(user_id: $user_id, token: $token, user: $user) {
    Message
  }
}
    `;
export const GetAllChatsDocument = gql`
    query getAllChats($user_id: String!, $token: String!) {
  getAllChats(user_id: $user_id, token: $token) {
    _id
    members
  }
}
    `;
export const GetAllMessagesDocument = gql`
    query getAllMessages($user_id: String!, $token: String!, $chat_id: String!, $query: Pagination) {
  getAllMessages(
    user_id: $user_id
    token: $token
    chat_id: $chat_id
    query: $query
  ) {
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
    query getChatById($chat_id: String!, $user_id: String!, $token: String!) {
  getChatById(chat_id: $chat_id, user_id: $user_id, token: $token) {
    _id
    members
  }
}
    `;
export const GetInvitesByRecieverDocument = gql`
    query getInvitesByReciever($user_id: String!, $token: String!, $status: String) {
  getInvitesByReciever(user_id: $user_id, token: $token, status: $status) {
    _id
    inviter
    reciever
    status
  }
}
    `;
export const GetInvitesByInviterDocument = gql`
    query getInvitesByInviter($user_id: String!, $token: String!, $status: String) {
  getInvitesByInviter(user_id: $user_id, token: $token, status: $status) {
    _id
    inviter
    reciever
    status
  }
}
    `;
export const GetUserDocument = gql`
    query getUser($user_id: String!, $token: String!) {
  getUser(user_id: $user_id, token: $token) {
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