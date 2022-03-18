export interface IAuthState {
  remember_me: boolean;
  loginPrompt: boolean;
  good?: string;
  bad?: string;
  cookie?: string;
}
