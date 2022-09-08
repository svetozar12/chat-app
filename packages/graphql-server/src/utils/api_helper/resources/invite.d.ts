export declare type Status = 'accepted' | 'recieved' | 'declined';
declare const invite: {
    getAllByReciever: (user_id: string, token: string, status?: Status) => Promise<any>;
    getAllByInviter: (user_id: string, token: string, status?: Status) => Promise<any>;
    create: (user_id: string, reciever: string, token: string) => Promise<any>;
    createGroupChat: (usersData: string[]) => Promise<any>;
    update: (user_id: string, invite_id: string, status: Status, token: string) => Promise<any>;
};
export default invite;
