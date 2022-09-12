import request from 'supertest';
import Messages from '../../../models/Message.model';
import { app } from '../../../server';
import constants from '../../testConstants';

const { users, jwt, chats } = constants;
const baseEndpoint = '/messages';

const tempMessage = {
  user_id: users[0]._id,
  message: 'temp',
};

describe(`POST ${baseEndpoint}`, () => {
  afterAll(async () => {
    await Messages.deleteOne({ ...tempMessage, chat_id: chats[0]._id });
  });
  describe('/', () => {
    it('expect 200 OK', async () => {
      const res = await request(app)
        .post(`${baseEndpoint}/${chats[0]._id}?user_id=${users[0]._id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(tempMessage);

      expect(res.status).toBe(201);

      Object.keys(tempMessage).forEach((key) => {
        expect(JSON.stringify(res.body.data[key])).toBe(JSON.stringify(tempMessage[key as keyof typeof tempMessage]));
      });
    });
  });
});
