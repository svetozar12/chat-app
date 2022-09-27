import Messages from '../models/Message.model';
import User from '../models/User.model';
import Chats from '../models/chatRoom.model';
import Invites from '../models/Invites.model';
import mongo_connection from './nosql/mongo_config';
import constants from '../__test__/testConstants';

const { chats, invites, users, messages } = constants;

mongo_connection();

const genUsers = async () => {
  await Promise.all([User.createCollection(), User.create(users[0]), User.create(users[1]), User.create(users[2])]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

const genChatRooms = async () => {
  await Promise.all([Chats.createCollection(), Chats.create(chats[0], chats[1])]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

const genMessages = async () => {
  await Promise.all([Messages.createCollection(), Messages.create(messages[0]), Messages.create(messages[1])]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

const genInvites = async () => {
  await Promise.all([
    Invites.createCollection(),
    Invites.create(invites[0]),
    Invites.create(invites[1]),
    Invites.create(invites[2]),
    Invites.create(invites[3]),
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
