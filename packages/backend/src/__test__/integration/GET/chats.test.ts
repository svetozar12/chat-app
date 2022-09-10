import request from 'supertest';
import { resMessages } from '../../../common/constants';

import { app } from '../../../server';
import constants from '../../testConstants';
const { userIds, chatIds, jwt } = constants;

const baseEndpoint = '/chats';

describe(`GET ${baseEndpoint}`, () => {
  describe('/', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).get(`${baseEndpoint}?user_id=${userIds[0]}`).set('Authorization', `Bearer ${jwt}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBe(resMessages.chat.YOU_HAVE_CHATS);
      expect(res.body.contacts[0]._id).toBe('631b9d3174dc3f55b7d4684c');
      expect(res.body.contacts[1]._id).toBe('631b3d3174dc3f55b7d4684c');
    });
  });
  describe('/:chat_id', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).get(`${baseEndpoint}/${chatIds[0]}?user_id=${userIds[0]}`).set('Authorization', `Bearer ${jwt}`);

      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(chatIds[0]);
      expect(res.body.data.members[0]).toBe('admin');
      expect(res.body.data.members[1]).toBe('test2');
    });
  });
});
