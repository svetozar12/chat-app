export const MESSAGE_EVENT = 'message';
export const CONNECT_EVENT = 'connect';
export const USER_STATUS_EVENT = 'userStatus';
export interface ISendMessage {
  message: string;
  userId: string;
}

export interface ISendJoin {
  userId: string;
  status: string;
}
