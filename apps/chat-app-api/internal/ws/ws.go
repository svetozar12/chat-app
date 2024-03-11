package ws

import (
	"fmt"
	"log"

	websocket "github.com/gofiber/websocket/v2"
)

var conns []*websocket.Conn

func WsHandler(c *websocket.Conn) {
	conns = append(conns, c)
	fmt.Println(c)
	defer removeConn(c)
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

func removeConn(c *websocket.Conn) {
	for i, conn := range conns {
		if conn == c {
			conns = append(conns[:i], conns[i+1:]...) // Remove the connection
			break
		}
	}
}
