package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	_ "sgospodinov-chat-be.com/api"
	"sgospodinov-chat-be.com/config"
	"sgospodinov-chat-be.com/internal/api"
)

func main() {
	config.LoadEnv()
	appConfig := config.GetConfig()
	config.InitializeMongoDB(appConfig.MongoUrl)

	app := fiber.New()

	// Logger middleware for Fiber
	app.Use(logger.New())
	// Initialize routes
	api.InitRoutes(app)
	// Start server
	log.Println("Server starting on port " + appConfig.Port)
	log.Println("Swagger documentation running on /v1/swagger")
	if err := app.Listen(":" + appConfig.Port); err != nil {
		log.Fatalf("Error starting server: %s\n", err)
	}
}
