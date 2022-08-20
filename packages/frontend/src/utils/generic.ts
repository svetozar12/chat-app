import apiHelper from '../services/graphql/apiHelper';

const timeStamp = (createdAt: string) => {
  if (typeof createdAt !== 'string') return 'Bad input';
  const date = new Date(createdAt);
  const currentHours: string | number = date.getHours().toString();
  const currentMinutes: string | number = date.getMinutes().toString();
  const TimeStamp = `${currentHours.padStart(2, '0')}:${currentMinutes.padStart(2, '0')}`;

  return TimeStamp;
};

const getFirstChat = async (userId: string, token: string) => {
  try {
    const res = await apiHelper.chatroom.getAll(userId, token);
    if (res.length <= 0) return;
    const [{ _id: getAllChats }] = res;

    return getAllChats;
  } catch (error) {
    console.error(error);

    return false;
  }
};

const handleSubmitOnEnter = (e: any, SubmitFunc: (e: any) => void) => {
  if (e.key === 'Enter') {
    SubmitFunc(e);
  }
};

const generic = { handleSubmitOnEnter, getFirstChat, timeStamp };

export default generic;
