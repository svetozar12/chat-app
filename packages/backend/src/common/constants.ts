const resMessages = {
  user: {
    CREATE: (user: string) => `User ${user} was created !`,
    NOT_FOUND: `User not found !`,
    ALREADY_EXIST: 'User already exists !',
    UPDATE: 'User info was updated !',
    DELETE: 'User was deleted !',
  },
  chat: {
    YOU_HAVE_CHATS: 'You have active chat-rooms',
    YOU_DONT_HAVE_CHATS: "You don't have chat rooms",
    CREATE: 'chat-room was created',
    UPDATE: 'Chat room was updated',
    NOT_FOUND: 'Chat room not found',
    ALREADY_EXIST: 'Chat room already exists !',
    DELETE: 'Chat room was deleted',
  },
  invite: {
    NOT_FOUND: 'Invite not found',
  },
  messages: {
    YOU_HAVE_MESSAGES: 'You have messages.',
  },
};

export { resMessages };
