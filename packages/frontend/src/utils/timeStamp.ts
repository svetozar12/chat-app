const timeStamp = (createdAt: string) => {
  if (typeof createdAt !== 'string') return 'Bad input';
  const date = new Date(createdAt);
  const currentHours: string | number = date.getHours().toString();
  const currentMinutes: string | number = date.getMinutes().toString();
  const TimeStamp = `${currentHours.padStart(2, '0')}:${currentMinutes.padStart(2, '0')}`;

  return TimeStamp;
};

export default timeStamp;
