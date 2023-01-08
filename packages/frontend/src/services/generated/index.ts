import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  createChat: ChatUnion;
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


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename: 'Chat', _id: string, members: Array<string> } | { __typename: 'Error', message: string } };

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
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
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
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      RefreshToken: // value for 'RefreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CreateChatDocument = gql`
    mutation CreateChat($chat: ChatModel!, $auth: AuthModel!) {
  createChat(chat: $chat, auth: $auth) {
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
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      chat: // value for 'chat'
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
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
export type DeleteChatMutationFn = Apollo.MutationFunction<DeleteChatMutation, DeleteChatMutationVariables>;

/**
 * __useDeleteChatMutation__
 *
 * To run a mutation, you first call `useDeleteChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChatMutation, { data, loading, error }] = useDeleteChatMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *      chat_id: // value for 'chat_id'
 *   },
 * });
 */
export function useDeleteChatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChatMutation, DeleteChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChatMutation, DeleteChatMutationVariables>(DeleteChatDocument, options);
      }
export type DeleteChatMutationHookResult = ReturnType<typeof useDeleteChatMutation>;
export type DeleteChatMutationResult = Apollo.MutationResult<DeleteChatMutation>;
export type DeleteChatMutationOptions = Apollo.BaseMutationOptions<DeleteChatMutation, DeleteChatMutationVariables>;
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

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *      chat_id: // value for 'chat_id'
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useGetChatQuery(baseOptions: Apollo.QueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
      }
export function useGetChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
        }
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatQueryResult = Apollo.QueryResult<GetChatQuery, GetChatQueryVariables>;
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

/**
 * __useGetChatListQuery__
 *
 * To run a query within a React component, call `useGetChatListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatListQuery({
 *   variables: {
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useGetChatListQuery(baseOptions: Apollo.QueryHookOptions<GetChatListQuery, GetChatListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatListQuery, GetChatListQueryVariables>(GetChatListDocument, options);
      }
export function useGetChatListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatListQuery, GetChatListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatListQuery, GetChatListQueryVariables>(GetChatListDocument, options);
        }
export type GetChatListQueryHookResult = ReturnType<typeof useGetChatListQuery>;
export type GetChatListLazyQueryHookResult = ReturnType<typeof useGetChatListLazyQuery>;
export type GetChatListQueryResult = Apollo.QueryResult<GetChatListQuery, GetChatListQueryVariables>;
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
export type UpdateChatMutationFn = Apollo.MutationFunction<UpdateChatMutation, UpdateChatMutationVariables>;

/**
 * __useUpdateChatMutation__
 *
 * To run a mutation, you first call `useUpdateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChatMutation, { data, loading, error }] = useUpdateChatMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *      chat_id: // value for 'chat_id'
 *      username: // value for 'username'
 *      usersData: // value for 'usersData'
 *   },
 * });
 */
export function useUpdateChatMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChatMutation, UpdateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChatMutation, UpdateChatMutationVariables>(UpdateChatDocument, options);
      }
export type UpdateChatMutationHookResult = ReturnType<typeof useUpdateChatMutation>;
export type UpdateChatMutationResult = Apollo.MutationResult<UpdateChatMutation>;
export type UpdateChatMutationOptions = Apollo.BaseMutationOptions<UpdateChatMutation, UpdateChatMutationVariables>;
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
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *      reciever: // value for 'reciever'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
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
export type CreateInviteGrupMutationFn = Apollo.MutationFunction<CreateInviteGrupMutation, CreateInviteGrupMutationVariables>;

/**
 * __useCreateInviteGrupMutation__
 *
 * To run a mutation, you first call `useCreateInviteGrupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteGrupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteGrupMutation, { data, loading, error }] = useCreateInviteGrupMutation({
 *   variables: {
 *      usersData: // value for 'usersData'
 *   },
 * });
 */
export function useCreateInviteGrupMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteGrupMutation, CreateInviteGrupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteGrupMutation, CreateInviteGrupMutationVariables>(CreateInviteGrupDocument, options);
      }
export type CreateInviteGrupMutationHookResult = ReturnType<typeof useCreateInviteGrupMutation>;
export type CreateInviteGrupMutationResult = Apollo.MutationResult<CreateInviteGrupMutation>;
export type CreateInviteGrupMutationOptions = Apollo.BaseMutationOptions<CreateInviteGrupMutation, CreateInviteGrupMutationVariables>;
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

/**
 * __useGetInvitesByInviterQuery__
 *
 * To run a query within a React component, call `useGetInvitesByInviterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitesByInviterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitesByInviterQuery({
 *   variables: {
 *      auth: // value for 'auth'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetInvitesByInviterQuery(baseOptions: Apollo.QueryHookOptions<GetInvitesByInviterQuery, GetInvitesByInviterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvitesByInviterQuery, GetInvitesByInviterQueryVariables>(GetInvitesByInviterDocument, options);
      }
export function useGetInvitesByInviterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvitesByInviterQuery, GetInvitesByInviterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvitesByInviterQuery, GetInvitesByInviterQueryVariables>(GetInvitesByInviterDocument, options);
        }
export type GetInvitesByInviterQueryHookResult = ReturnType<typeof useGetInvitesByInviterQuery>;
export type GetInvitesByInviterLazyQueryHookResult = ReturnType<typeof useGetInvitesByInviterLazyQuery>;
export type GetInvitesByInviterQueryResult = Apollo.QueryResult<GetInvitesByInviterQuery, GetInvitesByInviterQueryVariables>;
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

/**
 * __useGetInvitesByRecieverQuery__
 *
 * To run a query within a React component, call `useGetInvitesByRecieverQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitesByRecieverQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitesByRecieverQuery({
 *   variables: {
 *      auth: // value for 'auth'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetInvitesByRecieverQuery(baseOptions: Apollo.QueryHookOptions<GetInvitesByRecieverQuery, GetInvitesByRecieverQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvitesByRecieverQuery, GetInvitesByRecieverQueryVariables>(GetInvitesByRecieverDocument, options);
      }
export function useGetInvitesByRecieverLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvitesByRecieverQuery, GetInvitesByRecieverQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvitesByRecieverQuery, GetInvitesByRecieverQueryVariables>(GetInvitesByRecieverDocument, options);
        }
export type GetInvitesByRecieverQueryHookResult = ReturnType<typeof useGetInvitesByRecieverQuery>;
export type GetInvitesByRecieverLazyQueryHookResult = ReturnType<typeof useGetInvitesByRecieverLazyQuery>;
export type GetInvitesByRecieverQueryResult = Apollo.QueryResult<GetInvitesByRecieverQuery, GetInvitesByRecieverQueryVariables>;
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
export type UpdateInviteMutationFn = Apollo.MutationFunction<UpdateInviteMutation, UpdateInviteMutationVariables>;

/**
 * __useUpdateInviteMutation__
 *
 * To run a mutation, you first call `useUpdateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInviteMutation, { data, loading, error }] = useUpdateInviteMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *      status: // value for 'status'
 *      invite_id: // value for 'invite_id'
 *   },
 * });
 */
export function useUpdateInviteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInviteMutation, UpdateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInviteMutation, UpdateInviteMutationVariables>(UpdateInviteDocument, options);
      }
export type UpdateInviteMutationHookResult = ReturnType<typeof useUpdateInviteMutation>;
export type UpdateInviteMutationResult = Apollo.MutationResult<UpdateInviteMutation>;
export type UpdateInviteMutationOptions = Apollo.BaseMutationOptions<UpdateInviteMutation, UpdateInviteMutationVariables>;
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
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      chat_id: // value for 'chat_id'
 *      auth: // value for 'auth'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
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
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      message_id: // value for 'message_id'
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
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

/**
 * __useGetMessageListQuery__
 *
 * To run a query within a React component, call `useGetMessageListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessageListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessageListQuery({
 *   variables: {
 *      auth: // value for 'auth'
 *      chat_id: // value for 'chat_id'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetMessageListQuery(baseOptions: Apollo.QueryHookOptions<GetMessageListQuery, GetMessageListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessageListQuery, GetMessageListQueryVariables>(GetMessageListDocument, options);
      }
export function useGetMessageListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessageListQuery, GetMessageListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessageListQuery, GetMessageListQueryVariables>(GetMessageListDocument, options);
        }
export type GetMessageListQueryHookResult = ReturnType<typeof useGetMessageListQuery>;
export type GetMessageListLazyQueryHookResult = ReturnType<typeof useGetMessageListLazyQuery>;
export type GetMessageListQueryResult = Apollo.QueryResult<GetMessageListQuery, GetMessageListQueryVariables>;
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
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      message_id: // value for 'message_id'
 *      newMessage: // value for 'newMessage'
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, options);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;