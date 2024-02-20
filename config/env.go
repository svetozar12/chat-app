package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	MongoUrl  string
	Port      string
	JWTSecret string
}

// LoadEnv loads environment variables from the .env file
func LoadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Print("Warning: No .env file found, using system environment variables")
	}
}

// getEnv retrieves the value of the environment variable named by the key
// It returns the value, which will be either the value found or the provided fallback value
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
