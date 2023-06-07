export const MESSAGE_EVENT = 'message';
export const CONNECT_EVENT = 'connect';

export interface ISendMessage {
  message: string;
  userId: string;
}
