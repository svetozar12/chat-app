package ws

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"sgospodinov-chat-be.com/internal/ws"
)

// RegisterWsRoute sets up the WebSocket route and handlers
// @Summary     WebSocket Chat Endpoint
// @Description Upgrade to WebSocket protocol for real-time chat communication
// @Tags        websocket
// @Accept      json
// @Produce     json
// @Success     101 {string} string "Upgraded to WebSocket protocol"
// @Failure     400 {string} string "Bad Request"
// @Failure     426 {string} string "Upgrade Required"
// @Router      /ws [get]
func RegisterWsRoute(app fiber.Router) {
	hub := ws.NewHub()
	go hub.Run()

	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		ws.ServeWs(hub, c)
	}))

}
