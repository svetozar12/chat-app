package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
	"sgospodinov-chat-be.com/internal/api/chat"
	"sgospodinov-chat-be.com/internal/api/user"
	"sgospodinov-chat-be.com/internal/api/ws"
)

// @title          Fiber Example API
// @version        1.0
// @description    This is a sample swagger for Fiber
// @termsOfService http://swagger.io/terms/
// @contact.name   API Support
// @contact.email  fiber@swagger.io
// @license.name   Apache 2.0
// @license.url    http://www.apache.org/licenses/LICENSE-2.0.html
// @host           localhost:3000
// @BasePath       /
func InitRoutes(app *fiber.App) {
	v1 := app.Group("/v1")
	v1.Get("/swagger/*", swagger.HandlerDefault)

	ws.RegisterWsRoute(v1)
	chat.RegisterChatRoute(v1)
	user.RegisterUserRoute(v1)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Redirect("/v1/swagger/index.html")
	})
}
