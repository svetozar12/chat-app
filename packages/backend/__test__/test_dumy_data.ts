const tests = [
  {
    describe: "Finding invites by username",
    request: "/invites/testingUser1",
  },
  {
    describe: "Finding invites by username with status accepted",
    request: "/invites/testingUser1?status=accepted",
  },
  {
    describe: "Finding invites by username with status declined",
    request: "/invites/testingUser1?status=declined",
  },
];

const invitesDumyData = [
  { reciever: "testingUser1", inviter: "testingUser2", status: "accepted" },
  { reciever: "testingUser1", inviter: "testingUser2", status: "declined" },
  { reciever: "testingUser1", inviter: "testingUser2", status: "recieved" },
];

export { tests, invitesDumyData };
