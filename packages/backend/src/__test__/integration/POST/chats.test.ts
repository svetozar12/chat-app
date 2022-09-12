import request from 'supertest';
import { resMessages } from '../../../common/constants';
import Chats from '../../../models/chatRoom.model';
import { app } from '../../../server';
import constants from '../../testConstants';

const { users, jwt, invites } = constants;
const baseEndpoint = '/chats';

const tempChat: Record<string, any> = {
  user_id: users[0]._id,
  user1: users[0].username,
  user2: users[1].username,
  invite_id: invites[1]._id,
};

describe(`POST ${baseEndpoint}`, () => {
  afterAll(async () => {
    await Chats.deleteOne(tempChat);
  });
  describe('/', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).post(`${baseEndpoint}`).send(tempChat).set('Authorization', `Bearer ${jwt}`);
      console.log(res.body, 'body');
      expect(res.status).toBe(201);
      expect(res.body.Message).toBe(resMessages.chat.CREATE);
      expect((res.body.data.members as Array<string>).includes(users[0].username)).toBe(true);
      expect((res.body.data.members as Array<string>).includes(users[1].username)).toBe(true);
    });
  });
});
