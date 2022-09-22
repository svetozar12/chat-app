import getAllChats from './getAllChats';
import getUser from './getUser';
import getAllMessages from './getAllMessages';
import getInvites from './getInvites';
import getChatById from './getChatById';

const { getInvitesByReciever, getInvitesByInviter } = getInvites;

export { getAllChats, getChatById, getUser, getAllMessages, getInvitesByInviter, getInvitesByReciever };