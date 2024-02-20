package messages

import (
	"net/http"
)

func RegisterMessagesRoute() {
	http.HandleFunc("/chat/messages", getMessageList)
}
