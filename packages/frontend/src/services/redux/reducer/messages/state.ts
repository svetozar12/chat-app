import { IchatInstance } from 'components/MessagesSection/ChatRoom/ChatRoom';

export interface IMessage {
  messages: IchatInstance[];
  show: boolean;
  messagePageNumber: number;
}
