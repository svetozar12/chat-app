import Messages from '../models/Message.model';
import User from '../models/User.model';
import Chats from '../models/chatRoom.model';
import Invites from '../models/Invites.model';
import mongo_connection from './nosql/mongo_config';
import constants from '../__test__/testConstants';

const { chatIds, inviteIds, userIds, messageIds } = constants;

mongo_connection();

const genUsers = async () => {
  await Promise.all([
    User.createCollection(),
    User.create({ _id: userIds[0], username: 'admin', password: 'admin', email: 'admin@abv.bg', gender: 'Male' }),
    User.create({ _id: userIds[1], username: 'test1', password: 'test1', email: 'test1@abv.bg', gender: 'Female' }),
    User.create({ _id: userIds[2], username: 'test2', password: 'test2', email: 'test2@abv.bg', gender: 'Others' }),
  ]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

const genChatRooms = async () => {
  await Promise.all([
    Chats.createCollection(),
    Chats.create({ _id: chatIds[0], members: ['admin', 'test2'] }, { _id: chatIds[1], members: ['admin', 'test1'] }),
  ]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

const genMessages = async () => {
  await Promise.all([
    Messages.createCollection(),
    Messages.create({ _id: messageIds[0], chat_id: chatIds[0], user_id: userIds[0], message: 'hello', sender: 'test2' }),
  ]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

const genInvites = async () => {
  await Promise.all([
    Invites.createCollection(),
    Invites.create({ _id: inviteIds[0], inviter: 'test2', reciever: 'admin', status: 'accepted', user_id: [userIds[0], userIds[2]] }),
    Invites.create({ _id: inviteIds[1], inviter: 'test1', reciever: 'admin', status: 'accepted', user_id: [userIds[0], userIds[1]] }),
  ]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

const initData = async () => {
  Promise.all([genMessages(), genInvites(), genUsers(), genChatRooms()])
    .then(() => {
      console.log('data was initialized');
      process.exit(0);
    })
    .catch((err) => console.error(err));
};

initData();
