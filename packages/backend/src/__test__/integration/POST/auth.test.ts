import request from 'supertest';
import { app } from '../../../server';
import constants from '../../testConstants';

const { users } = constants;
const baseEndpoint = '/auth';

describe(`POST ${baseEndpoint}`, () => {
  describe('/', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).post(`${baseEndpoint}/login`).send({ username: users[0].username, password: users[0].password });

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('user_id');
      expect(res.body.data).toHaveProperty('Access_token');
      expect(res.body.data).toHaveProperty('Refresh_token');

      const authRes = await request(app).get(`/users/${users[0]._id}`).set('Authorization', `Bearer ${res.body.Access_token}`);
      expect(authRes.status).toBe(200);
    });
  });
});
