import { AuthProvider } from '@chat-app/api/v1/auth';

export interface IUser {
  /** Our internal user ID – independent from the `providerId`! */
  _id: string;
  id: string;
  /** With which social login provider the user has logged in */
  provider: AuthProvider;

  /** The user ID that the user has at his/her `provider` */
  providerId: string;

  /** e.g. 'John Doe' */
  displayName: string;

  /** Profile picture URLs */
  photos: {
    value: string; // e.g. 'https://avatars.githubusercontent.com/u/28536201'
  }[];
}
