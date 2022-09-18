interface Chat {
  _id: string;
  members: [string];
}

interface CreateChat {
  user_id: string;
  invite_id: string;
  user1: string;
  user2: string;
}

interface UpdateChat {
  usernames: string[];
  username: string;
}

export type { Chat, CreateChat, UpdateChat };
