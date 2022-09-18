import { Auth } from '../utils/sdk/types/common';

const constants = {
  api_url: 'http://localhost:4002',
  graphql_server_url: 'http://localhost:4001/graphql',
};

export interface AuthBase {
  auth: Auth;
}

export default constants;
