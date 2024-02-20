package main

import (
	"fmt"
	"net/http"

	httpSwagger "github.com/swaggo/http-swagger"
	_ "sgospodinov-chat-be.com/cmd/server/docs"
	"sgospodinov-chat-be.com/config"
	"sgospodinov-chat-be.com/internal/api/chat"
)

func main() {
	config.LoadEnv()
	appConfig := config.GetConfig()
	config.ConnectMongoDB(appConfig.MongoUrl)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the Chat App Backend!")
	})
	http.Handle("/swagger/", httpSwagger.WrapHandler)

	chat.RegisterChatRoute()

	fmt.Println("Server starting on port " + appConfig.Port)
	fmt.Println("Swagger documentation running on /swagger")

	if err := http.ListenAndServe(":"+appConfig.Port, nil); err != nil {
		fmt.Printf("Error starting server: %s\n", err)
	}
}
