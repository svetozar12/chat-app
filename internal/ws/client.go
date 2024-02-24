package ws

import (
	"github.com/gofiber/websocket/v2"
)

// Client represents a single WebSocket connection.
type Client struct {
	Hub  *Hub
	Conn *websocket.Conn
	Send chan []byte
}

// NewClient creates and returns a new Client instance.
func NewClient(hub *Hub, conn *websocket.Conn) *Client {
	return &Client{Hub: hub, Conn: conn, Send: make(chan []byte, 256)}
}

// ReadPump listens for new messages from the WebSocket connection.
func (c *Client) ReadPump() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			break
		}
		c.Hub.Broadcast <- message
	}
}

// WritePump sends messages from the Send channel to the WebSocket connection.
func (c *Client) WritePump() {
	defer c.Conn.Close()

	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				// The hub closed the channel.
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			if err := c.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
				return
			}
		}
	}
}
