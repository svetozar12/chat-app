import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@chat-app/graphql-server';
import axios from 'axios';

export const client = new GraphQLClient('http://localhost:4001/graphql', {
  fetch: axios,
});

const instance = getSdk(client);

const sdk = {
  auth: {
    login: instance.loginUser,
    refresh: instance.refreshToken,
    logout: instance.logoutUser,
  },
  user: {
    getUser: instance.getUser,
    createUser: instance.createUser,
    updateUser: instance.updateUser,
    deleteUser: instance.deleteUser,
  },
  invite: {
    getInviteByInviter: instance.getInvitesByInviter,
    getInviteByReciever: instance.getInvitesByReciever,
    createInvite: instance.createInvite,
    updateInvite: instance.updateInvite,
  },
  chat: {
    getChatById: instance.getChatById,
    getAllChats: instance.getAllChats,
    createChat: instance.createChat,
    updateChat: instance.updateChat,
    deleteChat: instance.deleteChat,
  },
  message: {
    getAllMessages: instance.getAllMessages,
    createMessage: instance.createMessage,
    updateMessage: instance.updateMessage,
    deleteMessage: instance.deleteMessage,
  },
};

export default sdk;
