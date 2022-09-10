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
    const reciever_field = await User.findOne({ username: reciever });
    console.log(reciever_field);

    if (!reciever_field) return;
    if (inviter === reciever) return;
    const _id = reciever_field.username;
    console.log(_id, socket.rooms);
    io.to(_id).emit('send_friend_request');
  };

  socket.on('friend_request', readFriendRequest);
  socket.on('inviting_multiple_users', inviteMultipleUsers);
  socket.on('send_friend_request', sendFriendRequest);
};

export default InviteHandler;
