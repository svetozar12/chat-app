package chat

import (
	"net/http"

	"sgospodinov-chat-be.com/internal/api/chat/messages"
)

func RegisterChatRoute() {
	messages.RegisterMessagesRoute()

	http.HandleFunc("/chat", getChatList)
}
