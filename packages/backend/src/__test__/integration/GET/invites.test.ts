import request from 'supertest';

import { app } from '../../../server';
import constants from '../../testConstants';
const { users, invites, jwt } = constants;

const baseEndpoint = '/invites';

describe(`GET ${baseEndpoint}`, () => {
  describe('/:user_id', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).get(`${baseEndpoint}/${users[0]._id}`).set('Authorization', `Bearer ${jwt}`);

      expect(res.status).toBe(200);
      expect(JSON.stringify(res.body.data[0])).toBe(JSON.stringify(invites[0]));
      expect(JSON.stringify(res.body.data[1])).toBe(JSON.stringify(invites[1]));
    });
  });
});
