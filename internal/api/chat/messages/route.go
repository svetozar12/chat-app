package messages

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func RegisterMessagesRoute(app fiber.Router) {
	http.HandleFunc("/chat/messages", getMessageList)
}
