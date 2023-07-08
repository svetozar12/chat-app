export const MESSAGE_EVENT = 'message';
export const CONNECT_EVENT = 'connect';
export const TYPING_EVENT = 'typing';
export const USER_STATUS_EVENT = 'userStatus';
export interface ISendMessage {
  message: string;
  userId: string;
}

export interface ISendTyping {
  userId: string;
  isTyping: boolean;
}

export interface ISendJoin {
  userId: string;
  status: string;
}
