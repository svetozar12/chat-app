import { Configuration, DefaultApiFp } from '@chat-app/api/sdk';

export const configuration = new Configuration({
  basePath: 'http://localhost:3000',
});

export const sdk = DefaultApiFp(configuration);
