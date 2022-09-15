import axios from 'axios';

import auth from './resources/auth';
import user from './resources/user';
import chat from './resources/chat';
import message from './resources/message';
import invite from './resources/invite';

const sdk = {
  auth,
  user,
  chat,
  message,
  invite,
};

const apiHost = 'http://localhost:3001';

export const instance = axios.create({
  baseURL: apiHost,
  timeout: 1000,
});

export default sdk;
