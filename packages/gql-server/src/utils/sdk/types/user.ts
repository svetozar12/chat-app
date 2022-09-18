import { Gender } from './common';

interface CreateUser {
  username: string;
  password: string;
  email: string;
  gender: Gender;
  userAvatar?: string;
}

interface UpdateUser {
  username?: string;
  password?: string;
  email?: string;
  gender?: Gender;
  userAvatar?: string;
}

interface User {
  user: { username: string; password: string; email: string; gender: Gender; userAvatar?: string };
}

export type { User, CreateUser, UpdateUser };
