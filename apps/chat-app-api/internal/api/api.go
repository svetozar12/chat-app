package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
	"github.com/gofiber/websocket/v2"
	"sgospodinov-chat-be.com/internal/api/auth"
	"sgospodinov-chat-be.com/internal/api/chat"
	"sgospodinov-chat-be.com/internal/api/user"
	"sgospodinov-chat-be.com/internal/ws"
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
	v1.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) { // Returns true if the client requested a WebSocket handshake
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})
	go ws.HandleMessages()
	v1.Get("/ws", websocket.New(ws.WsHandler))
	v1.Get("/swagger/*", swagger.HandlerDefault)

	chat.RegisterChatRoute(v1)
	user.RegisterUserRoute(v1)
	auth.RegisterAuthRoute(v1)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Redirect("/v1/swagger/index.html")
	})
}
