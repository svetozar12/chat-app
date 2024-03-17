package ws

import (
	"log"

	websocket "github.com/gofiber/websocket/v2"
)

var (
	// Stores all active connections
	clients = make(map[*websocket.Conn]bool)
	// Broadcast channel to which all messages will be sent
	broadcast = make(chan []byte)
)

func WsHandler(c *websocket.Conn) {
	// Register new client
	clients[c] = true

	for {
		_, msg, err := c.ReadMessage()
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, c)
			break
		}
		// Send the received message to the broadcast channel
		broadcast <- msg
	}
}

func HandleMessages() {
	for {
		// Grab the next message from the broadcast channel
		msg := <-broadcast
		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
