import { QueryGetAllMessagesArgs } from '../../generated/graphql';
export interface IQuery {
    page_size: number;
    page_number: number;
}
declare const message: {
    getAll: (args: QueryGetAllMessagesArgs) => Promise<any>;
    create: (chat_id: string, user_id: string, message: string, token: string) => Promise<any>;
    update: (message_id: string, user_id: string, newMessage: string, token: string) => Promise<any>;
    delete: (message_id: string, user_id: string, token: string) => Promise<any>;
};
export default message;
