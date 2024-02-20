package chat

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"sgospodinov-chat-be.com/internal/api/chat/messages"
)

func RegisterChatRoute(app *fiber.App) {
	messages.RegisterMessagesRoute()

	http.HandleFunc("/chat", getChatList)
}
