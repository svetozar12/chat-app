const invitesDumyData = [
  { reciever: "TestingUser1", inviter: "TestingUser2", status: "accepted" },
  { reciever: "TestingUser1", inviter: "TestingUser2", status: "declined" },
  { reciever: "TestingUser1", inviter: "TestingUser4", status: "recieved" },
  { reciever: "TestingUser1", inviter: "TestingUser1", status: "recieved" },
];

const dumyUser = {
  username: "TestingUser1",
  password: "TestingUser1",
  email: "TestingUser1@.com",
  gender: "Male",
};

const dumyUser2 = {
  username: "TestingUser2",
  password: "TestingUser2",
  email: "TestUser2@.com",
  gender: "Female",
};

const dumyUser3 = {
  username: "TestingUser3",
  password: "TestingUser3",
  email: "TestUser3@.com",
  gender: "Female",
};

const dumyUser4 = {
  username: "TestingUser4",
  password: "TestingUser4",
  email: "TestUser4@.com",
  gender: "Female",
};

const users = [dumyUser, dumyUser2, dumyUser3, dumyUser4];

export { invitesDumyData, dumyUser, dumyUser2, dumyUser3, dumyUser4, users };