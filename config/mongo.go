package config

import (
	"context"
	"log"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	mongoClient *mongo.Client
	initOnce    sync.Once
	readyCh     = make(chan struct{})
)

func InitializeMongoDB(uri string) {
	initOnce.Do(func() {
		log.Println("Initializing MongoDB connection...")

		clientOptions := options.Client().ApplyURI(uri)
		var err error
		mongoClient, err = mongo.Connect(context.Background(), clientOptions)
		if err != nil {
			log.Fatalf("Failed to create MongoDB client: %v", err)
		}

		log.Println("MongoDB client created, pinging MongoDB...")

		err = mongoClient.Ping(context.Background(), nil)
		if err != nil {
			log.Fatalf("Failed to ping MongoDB: %v", err)
		}

		log.Println("Connected to MongoDB successfully.")
		close(readyCh) // Signal that MongoDB is ready
	})
}

func GetMongoDB() *mongo.Client {
	<-readyCh // Wait for MongoDB to be initialized
	return mongoClient
}
