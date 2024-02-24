package ws

import (
	"github.com/gofiber/websocket/v2"
)

// ServeWs handles WebSocket requests from clients.
func ServeWs(hub *Hub, c *websocket.Conn) {
	client := NewClient(hub, c)
	hub.Register <- client

	// Run reading and writing in parallel.
	go client.WritePump()
	client.ReadPump()
}
