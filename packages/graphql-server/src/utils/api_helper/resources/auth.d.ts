export interface IAuthLogin {
    username: string;
    password: string;
}
declare const auth: {
    login: (userCredentials: IAuthLogin) => Promise<any>;
    refresh: (id: string, refresh_token: string) => Promise<any>;
    logout: (id: string, token: string) => Promise<any>;
};
export default auth;
