import { Configuration, MessageApi, UserApi, AuthApi } from '@chat-app/api/sdk';
import { AppModule } from 'apps/api/src/app/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

export const configuration = new Configuration({
  basePath: 'http://localhost:3000',
});

export const sdk = {
  configuration,
  messageApi: new MessageApi(configuration),
  userApi: new UserApi(configuration),
  authApi: new AuthApi(configuration),
};

export let app: INestApplication;
export async function InitTest() {
  try {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    return app;
  } catch (error) {
    console.log(error, 'ERROR');
  }
}
