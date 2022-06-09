import getAllChats from "./getAllChats";
import getUser from "./getUser";
import getMessages from "./getAllMessages";
import getInvites from "./getInvites";
import getChatById from "./getChat";

const { getInvitesByReciever, getInvitesByInviter } = getInvites;

export { getAllChats, getChatById, getUser, getMessages, getInvitesByInviter, getInvitesByReciever };
