export interface IChat {
    user_id: string;
    invite_id: string;
    user1: string;
    user2: string;
}
declare const chats: {
    getAll: (user_id: string, token: string) => Promise<any>;
    getById: (chat_id: string, user_id: string, token: string) => Promise<any>;
    create: (user: IChat, token: string) => Promise<any>;
    update: (message_id: string, user_id: string, token: string, username?: string, usersData?: string[]) => Promise<any>;
    delete: (message_id: string, user_id: string, token: string) => Promise<any>;
};
export default chats;
