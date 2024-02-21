package messages

import (
	"github.com/gofiber/fiber/v2"
)

func RegisterMessagesRoute(app fiber.Router) {
	app.Get("/messages", getMessageList)
}

// @Summary Get all messages
// @Tags    messages
// @Accept  json
// @Param   page  query    int false "page"  default(1)
// @Param   limit query    int false "limit" default(10)
// @Success 200   {object} schemas.PaginationSchema[models.Message]
// @Router  /v1/messages [get]
func getMessageList(c *fiber.Ctx) error {
	return c.SendString("This is the message endpoint.")
}
