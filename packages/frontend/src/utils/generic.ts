import sdk from 'services/sdk';

const timeStamp = (createdAt: string) => {
  if (typeof createdAt !== 'string') return 'Bad input';
  const date = new Date(createdAt);
  const currentHours: string | number = date.getHours().toString();
  const currentMinutes: string | number = date.getMinutes().toString();
  const TimeStamp = `${currentHours.padStart(2, '0')}:${currentMinutes.padStart(2, '0')}`;

  return TimeStamp;
};

const getFirstChat = async (userId: string, token: string): Promise<any> => {
  try {
    const res = await sdk.chatroom.getAll({ auth: { userId, AccessToken: token } });
    if (res.length <= 0) return false;

    return res[0]._id;
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
