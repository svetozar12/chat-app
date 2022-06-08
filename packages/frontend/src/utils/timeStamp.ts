const timeStamp = (createdAt: string) => {
  if (typeof createdAt != "string") return "Bad input";
  let date = new Date(createdAt);
  let currentHours: string | number = date.getHours().toString();
  let currentMinutes: string | number = date.getMinutes().toString();
  const time_stamp = `${currentHours.padStart(2, "0")}:${currentMinutes.padStart(2, "0")}`;

  return time_stamp;
};

export default timeStamp;
