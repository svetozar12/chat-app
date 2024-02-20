package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoDBClient holds the MongoDB client
var MongoDBClient *mongo.Client

// ConnectMongoDB initializes the MongoDB client
func ConnectMongoDB(mongoURI string) {
	clientOptions := options.Client().ApplyURI(mongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Ping the primary
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	log.Println("Connected to MongoDB")
	MongoDBClient = client
}

// GetMongoDB returns a reference to the specified database
func GetMongoDB(dbName string) *mongo.Database {
	return MongoDBClient.Database(dbName)
}
