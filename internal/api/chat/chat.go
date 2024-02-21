package chat

import (
	"github.com/gofiber/fiber/v2"
	"sgospodinov-chat-be.com/internal/api/chat/messages"
)

func RegisterChatRoute(app fiber.Router) {
	chat := app.Group("/chat")

	messages.RegisterMessagesRoute(chat)

	chat.Get("/", getChatList)
}

// Content godoc
//
// @Summary Get all chats
// @Tags    field
// @Accept  json
// @Param   page  query    int false "page"  default(1)
// @Param   limit query    int false "limit" default(10)
// @Success 200   {object} schemas.PaginationSchema[models.Chat]
// @Router  /v1/chat [get]
func getChatList(c *fiber.Ctx) error {

	return c.SendString("This is chat endpoint")
}
