const resMessages = {
  auth: {
    INVALID_PASSWORD: 'Password is invalid',
    NOT_FOUND_SESSION: "You don't have sessions",
  },
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
    NOT_FOUND: 'You don`t have invites',
    CONFLICT: 'Invite is already sent !',
    CANT_SEND_TO_YOURSELF: 'You can`t send invites to yourself !',
  },
  messages: {
    YOU_HAVE_MESSAGES: 'You have messages.',
    NOT_FOUND: 'You don`t have messages.',
    UPDATE: 'Message was updated',
    DELETE: 'Message was deleted',
  },
  common: {
    SUCCESFUL: 'succesful',
    NO_CHANGES: 'No changes were made',
  },
};

const consoleColours = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

export { resMessages, consoleColours };
