interface JWT {
  user_id: string;
  Acess_token: string;
  Refresh_token: string;
}

interface Login {
  username: string;
  password: string;
}

export type { JWT, Login };
