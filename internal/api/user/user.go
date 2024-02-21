package user

import (
	"github.com/gofiber/fiber/v2"
	"sgospodinov-chat-be.com/internal/api/chat/messages"
)

func RegisterUserRoute(app fiber.Router) {
	chat := app.Group("/user")

	messages.RegisterMessagesRoute(chat)

	chat.Get("/", getUserList)
}

// @Summary Get all users
// @Tags    users
// @Accept  json
// @Param   page  query    int false "page"  default(1)
// @Param   limit query    int false "limit" default(10)
// @Success 200   {object} schemas.PaginationSchema[models.User]
// @Router  /v1/user [get]
func getUserList(c *fiber.Ctx) error {
	return c.SendString("This is user endpoint")
}
