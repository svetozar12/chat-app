interface LoginPost {
  type: "LOGIN_POST" | "REGISTER_POST";
  payload?: string;
  good?: string;
}

interface errLoginPost {
  type: "LOGIN_POST_ERROR" | "REGISTER_POST_ERROR";
  payload?: string;
  bad?: string;
}

interface inputs {
  type: "SAVE_INPUT" | "REMEMBER_ME_CHECK";
  payload: string;
}

export type Action = LoginPost | errLoginPost | inputs;

export enum ActionType {
  LOGIN_POST = "LOGIN_POST",
  LOGIN_POST_ERROR = "LOGIN_POST_ERROR",
  REGISTER_POST = "REGISTER_POST",
  REGISTER_POST_ERROR = "REGISTER_POST_ERROR",
  SAVE_INPUT = "SAVE_INPUT",
  REMEMBER_ME_CHECK = "REMEMBER_ME_CHECK",
}
