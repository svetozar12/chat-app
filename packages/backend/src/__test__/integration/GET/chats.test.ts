import request from 'supertest';
import { resMessages } from '../../../common/constants';

import { app } from '../../../server';
import constants from '../../testConstants';
const { users, chats, jwt } = constants;

const baseEndpoint = '/chats';

describe(`GET ${baseEndpoint}`, () => {
  describe('/', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).get(`${baseEndpoint}?user_id=${users[0]._id}`).set('Authorization', `Bearer ${jwt}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBe(resMessages.chat.YOU_HAVE_CHATS);
      expect(JSON.stringify(res.body.contacts[0])).toBe(JSON.stringify({ ...chats[0], __v: 0 }));
      expect(JSON.stringify(res.body.contacts[1])).toBe(JSON.stringify({ ...chats[1], __v: 0 }));
    });
  });
  describe('/:chat_id', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).get(`${baseEndpoint}/${chats[0]._id}?user_id=${users[0]._id}`).set('Authorization', `Bearer ${jwt}`);

      expect(res.status).toBe(200);
      expect(JSON.stringify(res.body.data)).toBe(JSON.stringify({ ...chats[0], __v: 0 }));
    });
  });
});
