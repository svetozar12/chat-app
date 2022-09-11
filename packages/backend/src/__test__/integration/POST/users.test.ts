import request from 'supertest';
import { resMessages } from '../../../common/constants';
import User from '../../../models/User.model';

import { app } from '../../../server';

const baseEndpoint = '/users';
const tempUser = { email: 'temp@abv.bg', username: 'temp', password: 'temp', gender: 'Male' };

describe(`POST ${baseEndpoint}`, () => {
  afterAll(async () => {
    const { password, ...rest } = tempUser;
    await User.deleteOne({ ...rest });
  });
  describe('/', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).post(`${baseEndpoint}`).send(tempUser);

      expect(res.status).toBe(201);
      expect(res.body.Message).toBe(resMessages.user.CREATE(tempUser.username));
    });
  });
});
