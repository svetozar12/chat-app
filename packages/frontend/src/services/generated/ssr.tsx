import * as Types from './gql';

import * as Operations from './gql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import type { NormalizedCacheObject } from '@apollo/client';





export async function getServerPageGetChat
    (options: Omit<Apollo.QueryOptions<Types.GetChatQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<Types.GetChatQuery>({ ...options, query: Operations.GetChatDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetChat = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetChatQuery, Types.GetChatQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetChatDocument, options);
};
export type PageGetChatComp = React.FC<{data?: Types.GetChatQuery, error?: Apollo.ApolloError}>;
export const withPageGetChat = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetChatQuery, Types.GetChatQueryVariables>) => (WrappedComponent:PageGetChatComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetChatDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetChat = {
      getServerPage: getServerPageGetChat,
      withPage: withPageGetChat,
      usePage: useGetChat,
    }
export async function getServerPageGetChatList
    (options: Omit<Apollo.QueryOptions<Types.GetChatListQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<Types.GetChatListQuery>({ ...options, query: Operations.GetChatListDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetChatList = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetChatListQuery, Types.GetChatListQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetChatListDocument, options);
};
export type PageGetChatListComp = React.FC<{data?: Types.GetChatListQuery, error?: Apollo.ApolloError}>;
export const withPageGetChatList = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetChatListQuery, Types.GetChatListQueryVariables>) => (WrappedComponent:PageGetChatListComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetChatListDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetChatList = {
      getServerPage: getServerPageGetChatList,
      withPage: withPageGetChatList,
      usePage: useGetChatList,
    }



export async function getServerPageGetInvitesByInviter
    (options: Omit<Apollo.QueryOptions<Types.GetInvitesByInviterQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<Types.GetInvitesByInviterQuery>({ ...options, query: Operations.GetInvitesByInviterDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetInvitesByInviter = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetInvitesByInviterQuery, Types.GetInvitesByInviterQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetInvitesByInviterDocument, options);
};
export type PageGetInvitesByInviterComp = React.FC<{data?: Types.GetInvitesByInviterQuery, error?: Apollo.ApolloError}>;
export const withPageGetInvitesByInviter = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetInvitesByInviterQuery, Types.GetInvitesByInviterQueryVariables>) => (WrappedComponent:PageGetInvitesByInviterComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetInvitesByInviterDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetInvitesByInviter = {
      getServerPage: getServerPageGetInvitesByInviter,
      withPage: withPageGetInvitesByInviter,
      usePage: useGetInvitesByInviter,
    }
export async function getServerPageGetInvitesByReciever
    (options: Omit<Apollo.QueryOptions<Types.GetInvitesByRecieverQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<Types.GetInvitesByRecieverQuery>({ ...options, query: Operations.GetInvitesByRecieverDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetInvitesByReciever = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetInvitesByRecieverQuery, Types.GetInvitesByRecieverQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetInvitesByRecieverDocument, options);
};
export type PageGetInvitesByRecieverComp = React.FC<{data?: Types.GetInvitesByRecieverQuery, error?: Apollo.ApolloError}>;
export const withPageGetInvitesByReciever = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetInvitesByRecieverQuery, Types.GetInvitesByRecieverQueryVariables>) => (WrappedComponent:PageGetInvitesByRecieverComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetInvitesByRecieverDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetInvitesByReciever = {
      getServerPage: getServerPageGetInvitesByReciever,
      withPage: withPageGetInvitesByReciever,
      usePage: useGetInvitesByReciever,
    }



export async function getServerPageGetMessageList
    (options: Omit<Apollo.QueryOptions<Types.GetMessageListQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<Types.GetMessageListQuery>({ ...options, query: Operations.GetMessageListDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetMessageList = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetMessageListQuery, Types.GetMessageListQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetMessageListDocument, options);
};
export type PageGetMessageListComp = React.FC<{data?: Types.GetMessageListQuery, error?: Apollo.ApolloError}>;
export const withPageGetMessageList = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetMessageListQuery, Types.GetMessageListQueryVariables>) => (WrappedComponent:PageGetMessageListComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetMessageListDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetMessageList = {
      getServerPage: getServerPageGetMessageList,
      withPage: withPageGetMessageList,
      usePage: useGetMessageList,
    }



export async function getServerPageGetUserById
    (options: Omit<Apollo.QueryOptions<Types.GetUserByIdQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<Types.GetUserByIdQuery>({ ...options, query: Operations.GetUserByIdDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetUserById = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetUserByIdDocument, options);
};
export type PageGetUserByIdComp = React.FC<{data?: Types.GetUserByIdQuery, error?: Apollo.ApolloError}>;
export const withPageGetUserById = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>) => (WrappedComponent:PageGetUserByIdComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetUserByIdDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetUserById = {
      getServerPage: getServerPageGetUserById,
      withPage: withPageGetUserById,
      usePage: useGetUserById,
    }
export async function getServerPageGetUserList
    (options: Omit<Apollo.QueryOptions<Types.GetUserListQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<Types.GetUserListQuery>({ ...options, query: Operations.GetUserListDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetUserList = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetUserListQuery, Types.GetUserListQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetUserListDocument, options);
};
export type PageGetUserListComp = React.FC<{data?: Types.GetUserListQuery, error?: Apollo.ApolloError}>;
export const withPageGetUserList = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetUserListQuery, Types.GetUserListQueryVariables>) => (WrappedComponent:PageGetUserListComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetUserListDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetUserList = {
      getServerPage: getServerPageGetUserList,
      withPage: withPageGetUserList,
      usePage: useGetUserList,
    }
