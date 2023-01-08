import { Socket } from 'socket.io';
import User from '../../../models/User.model';
import { ioType } from '../wsConnection';

const InviteHandler = (io: ioType, socket: Socket) => {
  const readFriendRequest = () => {
    io.emit('friend_request');
  };
  const inviteMultipleUsers = ({ users }: any) => {
    io.emit('inviting_multiple_users', { users });
  };
  const sendFriendRequest = async ({ inviter, reciever }: { inviter: string; reciever: string }) => {
    console.log('recieved fr req in bakcend');

    const reciever_field = await User.findOne({ username: reciever });

    if (!reciever_field) return;
    if (inviter === reciever) return;
    const _id = reciever_field.username;
    console.log('I WILL EMIT THIS SHIT', _id, socket.rooms);

    io.to(_id).emit('send_friend_request');
  };

  socket.on('friend_request', readFriendRequest);
  socket.on('inviting_multiple_users', inviteMultipleUsers);
  socket.on('send_friend_request', sendFriendRequest);
};

export default InviteHandler;
