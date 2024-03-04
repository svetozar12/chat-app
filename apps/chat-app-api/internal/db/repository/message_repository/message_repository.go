package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"sgospodinov-chat-be.com/config"
	"sgospodinov-chat-be.com/internal/db/models"
)

func getMessagesCollection() *mongo.Collection {
	envs := config.GetConfig()
	return config.GetMongoDB().Database(envs.MongoDBName).Collection("messages")
}

// SaveMessage saves a new message to the database.
func SaveMessage(ctx context.Context, message *models.Message) error {
	_, err := getMessagesCollection().InsertOne(ctx, message)
	return err
}

// GetMessageByID retrieves a message by its ID.
func GetMessageByID(ctx context.Context, id string) (*models.Message, error) {
	var message models.Message
	err := getMessagesCollection().FindOne(ctx, bson.M{"_id": id}).Decode(&message)
	return &message, err
}

// GetMessageList retrieves a list of messages with pagination.
func GetMessageList(ctx context.Context, page int, pageSize int) ([]*models.Message, int64, error) {
	var messages []*models.Message
	var total int64
	options := options.Find().SetSkip(int64((page - 1) * pageSize)).SetLimit(int64(pageSize))

	cursor, err := getMessagesCollection().Find(ctx, bson.D{{}}, options)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var message models.Message
		if err := cursor.Decode(&message); err != nil {
			return nil, 0, err
		}
		messages = append(messages, &message)
	}

	total, err = getMessagesCollection().CountDocuments(ctx, bson.D{{}})
	if err != nil {
		return nil, 0, err
	}

	return messages, total, nil
}

// UpdateMessage updates a message by its ID.
func UpdateMessage(ctx context.Context, message *models.Message) error {
	_, err := getMessagesCollection().UpdateOne(ctx, bson.M{"_id": message.ID}, bson.M{"$set": message})
	return err
}

// DeleteMessage deletes a message by its ID.
func DeleteMessage(ctx context.Context, id string) error {
	_, err := getMessagesCollection().DeleteOne(ctx, bson.M{"_id": id})
	return err
}
