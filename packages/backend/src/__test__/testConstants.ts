const constants = {
  jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NjI4MzYxNTAsImV4cCI6MzMyNTEyODA4MTcsImF1ZCI6IiIsInN1YiI6IiIsIl9pZCI6IjYzMWI5Y2Q1YWYzYTUwOTEzZjFlMDUxNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0.rSVftNj6-DlDLDDQs21SZQq97c9TiLef0Je4u5FqRNg',
  users: [
    { _id: '631b9cd5af3a50913f1e0517', username: 'admin', password: 'admin', email: 'admin@abv.bg', gender: 'Male' },
    { _id: '631b9cdf5dceea5b959ce9de', username: 'test1', password: 'test1', email: 'test1@abv.bg', gender: 'Female' },
    { _id: '631b9ce6fd213a5ec6df2949', username: 'test2', password: 'test2', email: 'test2@abv.bg', gender: 'Others' },
  ],
  chats: [{ _id: '631b9d3174dc3f55b7d4684c', members: ['admin', 'test2'] }],
  messages: [
    {
      _id: '610b3d3174dc3f55b7d4682c',
      user_id: '631b9cd5af3a50913f1e0517',
      chat_id: '631b9d3174dc3f55b7d4684c',
      message: 'hello',
      sender: 'admin',
    },
    {
      _id: '610b3d3174dc3f55b7d2682c',
      user_id: '631b9cd5af3a50913f1e0517',
      chat_id: '631b9d3174dc3f55b7d4684c',
      message: 'world',
      sender: 'test2',
    },
  ],
  invites: [
    {
      _id: '631b9d3174dc3f55b7a4384c',
      inviter: 'test2',
      reciever: 'admin',
      status: 'accepted',
    },
    {
      _id: '611b3d3174dc3f55b7d4681c',
      inviter: 'admin',
      reciever: 'test1',
      status: 'accepted',
    },
    {
      _id: '611b3d3174dc3f55b7d3081c',
      inviter: 'test1',
      reciever: 'test2',
      status: 'recieved',
    },
    {
      _id: '611b3d3174dc3f55b7d1281c',
      inviter: 'test2',
      reciever: 'test1',
      status: 'declined',
    },
  ],
};

export default constants;
