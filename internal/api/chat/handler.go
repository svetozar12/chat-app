package chat

import (
	"fmt"
	"net/http"
)

func getChatList(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is the chat endpoint.")
}
