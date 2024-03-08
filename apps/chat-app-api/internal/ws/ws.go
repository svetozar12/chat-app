package ws

import (
	"fmt"
	"log"

	websocket "github.com/gofiber/websocket/v2"
)



func WsHandler(c *websocket.Conn) {
    // Handle your WebSocket connection here
    for {
        messageType, message, err := c.ReadMessage()
        if err != nil {
            log.Println("Error reading message:", err)
            break
        }
        log.Printf("Received: %s", message)
        fmt.Println("Message type",messageType)
        // Echo the message back
        if err := c.WriteMessage(messageType, message); err != nil {
            log.Println("Error writing message:", err)
            break
        }
    }
}