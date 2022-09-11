import request from 'supertest';
import { resMessages } from '../../../common/constants';

import { app } from '../../../server';
import constants from '../../testConstants';
const { users, chats, jwt, messages } = constants;

const baseEndpoint = '/messages';

describe(`GET ${baseEndpoint}`, () => {
  describe('/:chat_id', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).get(`${baseEndpoint}/${chats[0]._id}?user_id=${users[0]._id}`).set('Authorization', `Bearer ${jwt}`);

      expect(res.body.Message).toBe(resMessages.messages.YOU_HAVE_MESSAGES);
      Object.keys(messages).forEach((key) => {
        Object.keys(key).forEach((item, index) => {
          expect(JSON.stringify(res.body.data[index][item])).toBe(JSON.stringify(messages[index][item as keyof typeof messages[0]]));
        });
      });
      expect(res.status).toBe(200);
    });
  });
});
