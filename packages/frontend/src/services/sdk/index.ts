// resources
import user from './resources/users';
import auth from './resources/auth';
import message from './resources/message';
import invite from './resources/invite';
import chatroom from './resources/chatroom';
// types
import axios from 'axios';
import { constants } from '../../constants';
const client = axios.create({ baseURL: constants.GRAPHQL_URL, method: 'POST', headers: { 'Content-Type': 'application/json' } });

const sdk = {
  user,
  auth,
  message,
  invite,
  chatroom,
};

export { client };
export default sdk;
