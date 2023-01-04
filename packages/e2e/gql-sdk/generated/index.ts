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

export type AuthModel = {
  AccessToken: Scalars['String'];
  userId: Scalars['String'];
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String'];
  members: Array<Scalars['String']>;
};

export type ChatList = {
  __typename?: 'ChatList';
  res: Array<Chat>;
};

export type ChatListUnion = ChatList | Error;

export type ChatModel = {
  invite_id: Scalars['String'];
  user1: Scalars['String'];
  user2: Scalars['String'];
  user_id: Scalars['String'];
};

export type ChatUnion = Chat | Error;

export type CreateChatMessage = {
  __typename?: 'CreateChatMessage';
  Message: Scalars['String'];
  data: Chat;
};

export type CreateChatMessageUnion = CreateChatMessage | Error;

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type GetUserUnion = Error | GetUser;

export type Invite = {
  __typename?: 'Invite';
  _id: Scalars['String'];
  inviter: Scalars['String'];
  reciever: Scalars['String'];
  status: Scalars['String'];
};

export type InviteList = {
  __typename?: 'InviteList';
  res: Array<Invite>;
};

export type InviteListUnion = Error | InviteList;

export type InviteUnion = Error | Invite;

export type LoginUser = {
  __typename?: 'LoginUser';
  AccessToken: Scalars['String'];
  RefreshToken: Scalars['String'];
  userId: Scalars['String'];
};

export type LoginUserUnion = Error | LoginUser;

export type Message = {
  __typename?: 'Message';
  Message: Scalars['String'];
};

export type MessageUnion = Error | Message;

export type Messages = {
  __typename?: 'Messages';
  _id: Scalars['String'];
  chat_id: Scalars['String'];
  message: Scalars['String'];
  seenBy: Array<Scalars['String']>;
  sender: Scalars['String'];
  user_id: Scalars['String'];
};

export type MessagesList = {
  __typename?: 'MessagesList';
  res: Array<Messages>;
};

export type MessagesListUnion = Error | MessagesList;

export type MessagesUnion = Error | Messages;

export type Mutation = {
  __typename?: 'Mutation';
  createChat: CreateChatMessageUnion;
  createInvite: InviteUnion;
  createInviteGroupChat: CreateChatMessageUnion;
  createMessage: MessagesUnion;
  createUser: MessageUnion;
  deleteChat: MessageUnion;
  deleteMessage: MessageUnion;
  deleteUser: MessageUnion;
  loginUser: LoginUserUnion;
  logoutUser: MessageUnion;
  refreshToken: LoginUserUnion;
  updateChat: ChatUnion;
  updateInvite: InviteUnion;
  updateMessage: MessageUnion;
  updateUser: MessageUnion;
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
  status: Status;
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
  getAllChats: ChatListUnion;
  getAllMessages: MessagesListUnion;
  getChatById: ChatUnion;
  getInvitesByInviter: InviteListUnion;
  getInvitesByReciever: InviteListUnion;
  getUser: GetUserUnion;
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
  status: Status;
};


export type QueryGetInvitesByRecieverArgs = {
  auth: AuthModel;
  status: Status;
};


export type QueryGetUserArgs = {
  auth: AuthModel;
};

export enum Status {
  Accepted = 'accepted',
  Declined = 'declined',
  Recieved = 'recieved'
}

export type UpdateUserModel = {
  email: Scalars['String'];
  gender: Gender;
  username: Scalars['String'];
};

export type UserModel = {
  email: Scalars['String'];
  gender: Gender;
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

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename: 'Error', message: string } | { __typename: 'LoginUser', userId: string, AccessToken: string, RefreshToken: string } };

export type LogoutMutationVariables = Exact<{
  auth: AuthModel;
}>;


export type LogoutMutation = { __typename?: 'Mutation', logoutUser: { __typename: 'Error', message: string } | { __typename: 'Message', Message: string } };

export type RefreshTokenMutationVariables = Exact<{
  userId: Scalars['String'];
  RefreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename: 'Error', message: string } | { __typename: 'LoginUser', userId: string, AccessToken: string, RefreshToken: string } };

export type CreateChatMutationVariables = Exact<{
  chat: ChatModel;
  auth: AuthModel;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename: 'CreateChatMessage', Message: string, data: { __typename?: 'Chat', _id: string, members: Array<string> } } | { __typename: 'Error', message: string } };

export type DeleteChatMutationVariables = Exact<{
  auth: AuthModel;
  chat_id: Scalars['String'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat: { __typename: 'Error', message: string } | { __typename: 'Message', Message: string } };

export type GetChatQueryVariables = Exact<{
  chat_id: Scalars['String'];
  auth: AuthModel;
}>;


export type GetChatQuery = { __typename?: 'Query', getChatById: { __typename: 'Chat', _id: string, members: Array<string> } | { __typename: 'Error', message: string } };

export type GetChatListQueryVariables = Exact<{
  auth: AuthModel;
}>;


export type GetChatListQuery = { __typename?: 'Query', getAllChats: { __typename: 'ChatList', res: Array<{ __typename?: 'Chat', _id: string, members: Array<string> }> } | { __typename: 'Error', message: string } };

export type UpdateChatMutationVariables = Exact<{
  auth: AuthModel;
  chat_id: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  usersData?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type UpdateChatMutation = { __typename?: 'Mutation', updateChat: { __typename: 'Chat', _id: string, members: Array<string> } | { __typename: 'Error', message: string } };

export type CreateInviteMutationVariables = Exact<{
  auth: AuthModel;
  reciever: Scalars['String'];
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename: 'Error', message: string } | { __typename: 'Invite', _id: string, inviter: string, reciever: string, status: string } };

export type CreateInviteGrupMutationVariables = Exact<{
  usersData?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateInviteGrupMutation = { __typename?: 'Mutation', createInviteGroupChat: { __typename: 'CreateChatMessage', Message: string, data: { __typename?: 'Chat', _id: string, members: Array<string> } } | { __typename: 'Error', message: string } };

export type GetInvitesByInviterQueryVariables = Exact<{
  auth: AuthModel;
  status: Status;
}>;


export type GetInvitesByInviterQuery = { __typename?: 'Query', getInvitesByInviter: { __typename: 'Error', message: string } | { __typename: 'InviteList', res: Array<{ __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string }> } };

export type GetInvitesByRecieverQueryVariables = Exact<{
  auth: AuthModel;
  status: Status;
}>;


export type GetInvitesByRecieverQuery = { __typename?: 'Query', getInvitesByReciever: { __typename: 'Error', message: string } | { __typename: 'InviteList', res: Array<{ __typename?: 'Invite', _id: string, inviter: string, reciever: string, status: string }> } };

export type UpdateInviteMutationVariables = Exact<{
  auth: AuthModel;
  status: Status;
  invite_id: Scalars['String'];
}>;


export type UpdateInviteMutation = { __typename?: 'Mutation', updateInvite: { __typename: 'Error', message: string } | { __typename: 'Invite', _id: string, inviter: string, reciever: string, status: string } };

export type CreateMessageMutationVariables = Exact<{
  chat_id: Scalars['String'];
  auth: AuthModel;
  message: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename: 'Error', message: string } | { __typename: 'Messages', user_id: string, chat_id: string, sender: string, message: string, seenBy: Array<string> } };

export type DeleteMessageMutationVariables = Exact<{
  message_id: Scalars['String'];
  auth: AuthModel;
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename: 'Error', message: string } | { __typename: 'Message', Message: string } };

export type GetMessageListQueryVariables = Exact<{
  auth: AuthModel;
  chat_id: Scalars['String'];
  query?: InputMaybe<Pagination>;
}>;


export type GetMessageListQuery = { __typename?: 'Query', getAllMessages: { __typename: 'Error', message: string } | { __typename: 'MessagesList', res: Array<{ __typename?: 'Messages', _id: string, user_id: string, chat_id: string, sender: string, message: string }> } };

export type UpdateMessageMutationVariables = Exact<{
  message_id: Scalars['String'];
  newMessage: Scalars['String'];
  auth: AuthModel;
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage: { __typename: 'Error', message: string } | { __typename: 'Message', Message: string } };

export type CreateUserMutationVariables = Exact<{
  user: UserModel;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename: 'Error', message: string } | { __typename: 'Message', Message: string } };

export type DeleteUserMutationVariables = Exact<{
  auth: AuthModel;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename: 'Error', message: string } | { __typename: 'Message', Message: string } };

export type GetUserByIdQueryVariables = Exact<{
  auth: AuthModel;
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUser: { __typename: 'Error', message: string } | { __typename: 'getUser', _id: string, email: string, userAvatar: string, username: string } };

export type UpdateUserMutationVariables = Exact<{
  auth: AuthModel;
  user: UpdateUserModel;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename: 'Error', message: string } | { __typename: 'Message', Message: string } };


export const LoginUserDocument = gql`
    mutation LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    __typename
    ... on LoginUser {
      userId
      AccessToken
      RefreshToken
    }
    ... on Error {
      message
    }
  }
}
    `;
export const LogoutDocument = gql`
    mutation Logout($auth: AuthModel!) {
  logoutUser(auth: $auth) {
    __typename
    ... on Message {
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($userId: String!, $RefreshToken: String!) {
  refreshToken(user_id: $userId, RefreshToken: $RefreshToken) {
    __typename
    ... on LoginUser {
      userId
      AccessToken
      RefreshToken
    }
    ... on Error {
      message
    }
  }
}
    `;
export const CreateChatDocument = gql`
    mutation CreateChat($chat: ChatModel!, $auth: AuthModel!) {
  createChat(chat: $chat, auth: $auth) {
    __typename
    ... on CreateChatMessage {
      data {
        _id
        members
      }
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const DeleteChatDocument = gql`
    mutation DeleteChat($auth: AuthModel!, $chat_id: String!) {
  deleteChat(chat_id: $chat_id, auth: $auth) {
    __typename
    ... on Message {
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const GetChatDocument = gql`
    query GetChat($chat_id: String!, $auth: AuthModel!) {
  getChatById(chat_id: $chat_id, auth: $auth) {
    __typename
    ... on Chat {
      _id
      members
    }
    ... on Error {
      message
    }
  }
}
    `;
export const GetChatListDocument = gql`
    query GetChatList($auth: AuthModel!) {
  getAllChats(auth: $auth) {
    __typename
    ... on ChatList {
      res {
        _id
        members
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export const UpdateChatDocument = gql`
    mutation UpdateChat($auth: AuthModel!, $chat_id: String!, $username: String, $usersData: [String]) {
  updateChat(
    chat_id: $chat_id
    auth: $auth
    username: $username
    usersData: $usersData
  ) {
    __typename
    ... on Chat {
      _id
      members
    }
    ... on Error {
      message
    }
  }
}
    `;
export const CreateInviteDocument = gql`
    mutation CreateInvite($auth: AuthModel!, $reciever: String!) {
  createInvite(auth: $auth, reciever: $reciever) {
    __typename
    ... on Invite {
      _id
      inviter
      reciever
      status
    }
    ... on Error {
      message
    }
  }
}
    `;
export const CreateInviteGrupDocument = gql`
    mutation CreateInviteGrup($usersData: [String!]) {
  createInviteGroupChat(usersData: $usersData) {
    __typename
    ... on CreateChatMessage {
      data {
        _id
        members
      }
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const GetInvitesByInviterDocument = gql`
    query GetInvitesByInviter($auth: AuthModel!, $status: Status!) {
  getInvitesByInviter(auth: $auth, status: $status) {
    __typename
    ... on InviteList {
      res {
        _id
        inviter
        reciever
        status
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export const GetInvitesByRecieverDocument = gql`
    query GetInvitesByReciever($auth: AuthModel!, $status: Status!) {
  getInvitesByReciever(auth: $auth, status: $status) {
    __typename
    ... on InviteList {
      res {
        _id
        inviter
        reciever
        status
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export const UpdateInviteDocument = gql`
    mutation UpdateInvite($auth: AuthModel!, $status: Status!, $invite_id: String!) {
  updateInvite(auth: $auth, status: $status, invite_id: $invite_id) {
    __typename
    ... on Invite {
      _id
      inviter
      reciever
      status
    }
    ... on Error {
      message
    }
  }
}
    `;
export const CreateMessageDocument = gql`
    mutation CreateMessage($chat_id: String!, $auth: AuthModel!, $message: String!) {
  createMessage(chat_id: $chat_id, auth: $auth, message: $message) {
    __typename
    ... on Messages {
      user_id
      chat_id
      sender
      message
      seenBy
    }
    ... on Error {
      message
    }
  }
}
    `;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($message_id: String!, $auth: AuthModel!) {
  deleteMessage(message_id: $message_id, auth: $auth) {
    __typename
    ... on Message {
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const GetMessageListDocument = gql`
    query GetMessageList($auth: AuthModel!, $chat_id: String!, $query: Pagination) {
  getAllMessages(auth: $auth, chat_id: $chat_id, query: $query) {
    __typename
    ... on MessagesList {
      res {
        _id
        user_id
        chat_id
        sender
        message
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($message_id: String!, $newMessage: String!, $auth: AuthModel!) {
  updateMessage(message_id: $message_id, auth: $auth, newMessage: $newMessage) {
    __typename
    ... on Message {
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($user: UserModel!) {
  createUser(user: $user) {
    __typename
    ... on Message {
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation DeleteUser($auth: AuthModel!) {
  deleteUser(auth: $auth) {
    __typename
    ... on Message {
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;
export const GetUserByIdDocument = gql`
    query GetUserById($auth: AuthModel!) {
  getUser(auth: $auth) {
    __typename
    ... on getUser {
      _id
      email
      userAvatar
      username
    }
    ... on Error {
      message
    }
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($auth: AuthModel!, $user: UpdateUserModel!) {
  updateUser(auth: $auth, user: $user) {
    __typename
    ... on Message {
      Message
    }
    ... on Error {
      message
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    LoginUser(variables: LoginUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginUserMutation>(LoginUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LoginUser', 'mutation');
    },
    Logout(variables: LogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutMutation>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Logout', 'mutation');
    },
    RefreshToken(variables: RefreshTokenMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RefreshTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RefreshTokenMutation>(RefreshTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RefreshToken', 'mutation');
    },
    CreateChat(variables: CreateChatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateChatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateChatMutation>(CreateChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateChat', 'mutation');
    },
    DeleteChat(variables: DeleteChatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteChatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteChatMutation>(DeleteChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteChat', 'mutation');
    },
    GetChat(variables: GetChatQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetChatQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChatQuery>(GetChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetChat', 'query');
    },
    GetChatList(variables: GetChatListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetChatListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChatListQuery>(GetChatListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetChatList', 'query');
    },
    UpdateChat(variables: UpdateChatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateChatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateChatMutation>(UpdateChatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateChat', 'mutation');
    },
    CreateInvite(variables: CreateInviteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateInviteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateInviteMutation>(CreateInviteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateInvite', 'mutation');
    },
    CreateInviteGrup(variables?: CreateInviteGrupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateInviteGrupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateInviteGrupMutation>(CreateInviteGrupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateInviteGrup', 'mutation');
    },
    GetInvitesByInviter(variables: GetInvitesByInviterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInvitesByInviterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInvitesByInviterQuery>(GetInvitesByInviterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetInvitesByInviter', 'query');
    },
    GetInvitesByReciever(variables: GetInvitesByRecieverQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInvitesByRecieverQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInvitesByRecieverQuery>(GetInvitesByRecieverDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetInvitesByReciever', 'query');
    },
    UpdateInvite(variables: UpdateInviteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateInviteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateInviteMutation>(UpdateInviteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateInvite', 'mutation');
    },
    CreateMessage(variables: CreateMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMessageMutation>(CreateMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateMessage', 'mutation');
    },
    DeleteMessage(variables: DeleteMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMessageMutation>(DeleteMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteMessage', 'mutation');
    },
    GetMessageList(variables: GetMessageListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMessageListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMessageListQuery>(GetMessageListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMessageList', 'query');
    },
    UpdateMessage(variables: UpdateMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMessageMutation>(UpdateMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateMessage', 'mutation');
    },
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    DeleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUser', 'mutation');
    },
    GetUserById(variables: GetUserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByIdQuery>(GetUserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserById', 'query');
    },
    UpdateUser(variables: UpdateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateUser', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;