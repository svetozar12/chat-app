package messages

import (
	"fmt"
	"net/http"
)

func getMessageList(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is the message endpoint.")
}
