export interface IAuthState {
  remember_me: boolean;
  loginPrompt: boolean;
  good?: string;
  bad?: string;
  cookie?: {
    username: string;
    id: string;
    token: string;
    refresh_token: string;
  };
}
