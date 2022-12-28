// resources
import auth from './resources/auth';
import message from './resources/message';
import invite from './resources/invite';
import chatroom from './resources/chatroom';
// types
import axios from 'axios';

const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://${process.env.NEXT_PUBLIC_GQL_HOST}:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;
const client = axios.create({ baseURL: gqlUrl, method: 'POST', headers: { 'Content-Type': 'application/json' } });

const sdk = {
  message,
  invite,
  chatroom,
};

export { client };
export default sdk;
