import request from 'supertest';
import Invites from '../../../models/Invites.model';
import { app } from '../../../server';
import constants from '../../testConstants';

const { users, jwt } = constants;
const baseEndpoint = '/invites';

let tempInvite: Record<string, any> = {
  reciever: 'test2',
  user_id: users[0]._id,
};

describe(`POST ${baseEndpoint}`, () => {
  afterAll(async () => {
    await Invites.deleteOne(tempInvite);
  });
  describe('/', () => {
    it('expect 200 OK', async () => {
      const res = await request(app).post(`${baseEndpoint}`).send(tempInvite).set('Authorization', `Bearer ${jwt}`);

      expect(res.status).toBe(201);

      tempInvite = { ...tempInvite, inviter: users[0].username, status: 'recieved', user_id: [users[0]._id, users[2]._id] };
      Object.keys(tempInvite).forEach((key) => {
        expect(JSON.stringify(res.body.data[key])).toBe(JSON.stringify(tempInvite[key as keyof typeof tempInvite]));
      });
    });
  });
});
