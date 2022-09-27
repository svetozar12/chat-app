import logger from '../../logger';
import makeRequest, { Method } from '../../makeRequest';
import { Auth, Message, Response } from '../types/common';
import { ChatMessage, CreateMessage, PaginationQuery } from '../types/message';

const basePath = '/messages';

const message = {
  getMessages: async (auth: Auth, chatId: string, query?: PaginationQuery): Response<{ Message: string; data: ChatMessage[] }> => {
    const { userId, AccessToken } = auth;
    const { page_size, page_number } = query as PaginationQuery;
    return makeRequest(
      Method.GET,
      `${basePath}/${chatId}?user_id=${userId}&&page_size=${page_size}&&page_number=${page_number}`,
      undefined,
      {
        headers: { Authorization: `Bearer ${AccessToken}` },
      },
    );
  },
  createMessage: async (auth: Auth, chatId: string, body: CreateMessage): Response<{ data: ChatMessage }> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    return makeRequest(Method.POST, `${basePath}/${chatId}`, Body, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  updateMessage: async (auth: Auth, messageId: string, body: CreateMessage): Response<Message> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    return makeRequest(Method.PUT, `${basePath}/${messageId}`, Body, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  deleteMessage: async (auth: Auth, messageId: string): Response<Message> => {
    const { userId, AccessToken } = auth;
    logger('info', auth, ['gql,sdk']);

    return makeRequest(Method.DELETE, `${basePath}/${messageId}?user_id=${userId}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
};

export default message;
