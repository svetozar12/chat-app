export interface IUser {
    username: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
}
declare const user: {
    getById: (id: string, token: string) => Promise<any>;
    create: (user: IUser) => Promise<any>;
    update: (user: IUser, id: string, token: string) => Promise<any>;
    delete: (id: string, token: string) => Promise<any>;
};
export default user;
