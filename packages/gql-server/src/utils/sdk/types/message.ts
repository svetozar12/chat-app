interface PaginationQuery {
  page_size: number;
  page_number: number;
}

interface ChatMessage {
  _id: string;
  user_id: string;
  chat_id: string;
  sender: string;
  message: string;
  seenBy: string[];
}

interface CreateMessage {
  message: string;
}

export type { ChatMessage, PaginationQuery, CreateMessage };
