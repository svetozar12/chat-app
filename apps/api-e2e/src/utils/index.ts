import { Configuration, MessageApi, Sdk } from '@chat-app/api/sdk';

export const configuration = new Configuration({
  basePath: 'http://localhost:3000',
});

export let sdk: Sdk;

export async function Init() {
  sdk = {
    configuration,
    messageApi: new MessageApi(configuration),
  };
}
