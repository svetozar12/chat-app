import request from 'supertest';

import { app } from '../../../server';
import constants from '../../testConstants';
const { users, jwt } = constants;

const baseEndpoint = '/users';

describe(`GET ${baseEndpoint}`, () => {
  describe('/:user_id', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).get(`${baseEndpoint}/${users[0]._id}`).set('Authorization', `Bearer ${jwt}`);

      expect(res.status).toBe(200);
      Object.keys(users[0]).forEach((key) => {
        if (key === 'password') return;
        expect(users[0][key as keyof typeof users[0]]).toBe(res.body.user[key]);
      });
      expect(res.body.user).toBe;
    });
  });
});
