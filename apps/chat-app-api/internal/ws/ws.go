package ws

import (
	"log"

	websocket "github.com/gofiber/websocket/v2"
)

var conns []*websocket.Conn

func WsHandler(c *websocket.Conn) {
	conns = append(conns, c)
	// Handle your WebSocket connection here
	for {
		messageType, message, err := c.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}
		log.Printf("Received: %s", message)
		// Echo the message back
		for _, v := range conns {
			if err := v.WriteMessage(messageType, message); err != nil {
				log.Println("Error writing message:", err)
				break

			}

		}
	}
}
