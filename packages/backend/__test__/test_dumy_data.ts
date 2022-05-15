const tests = [
  {
    describe: "Finding invites by username",
    request: "/invites/TestingUser1",
  },
  {
    describe: "Finding invites by username with status accepted",
    request: "/invites/TestingUser1?status=accepted",
  },
  {
    describe: "Finding invites by username with status declined",
    request: "/invites/TestingUser1?status=declined",
  },
];

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

const users = [dumyUser.username, dumyUser2.username, dumyUser3.username, dumyUser4.username];

export { tests, invitesDumyData, dumyUser, dumyUser2, dumyUser3, dumyUser4, users };
