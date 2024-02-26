package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"sgospodinov-chat-be.com/config"
	"sgospodinov-chat-be.com/internal/db/models"
)

func getChatCollection() *mongo.Collection {
	envs := config.GetConfig()
	return config.GetMongoDB().Database(envs.MongoDBName).Collection("chats")
}

// SaveChat saves a new chat to the database.
func SaveChat(ctx context.Context, chat *models.Chat) error {
	_, err := getChatCollection().InsertOne(ctx, chat)
	return err
}

// GetChatByID retrieves a chat by its ID.
func GetChatByID(ctx context.Context, id string) (*models.Chat, error) {
	var chat models.Chat
	err := getChatCollection().FindOne(ctx, bson.M{"_id": id}).Decode(&chat)
	return &chat, err
}

// GetChatList retrieves a list of chats with pagination.
func GetChatList(ctx context.Context, page int, pageSize int) ([]*models.Chat, int64, error) {
	var chats []*models.Chat
	var total int64
	options := options.Find().SetSkip(int64((page - 1) * pageSize)).SetLimit(int64(pageSize))

	cursor, err := getChatCollection().Find(ctx, bson.D{{}}, options)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var chat models.Chat
		if err := cursor.Decode(&chat); err != nil {
			return nil, 0, err
		}
		chats = append(chats, &chat)
	}

	total, err = getChatCollection().CountDocuments(ctx, bson.D{{}})
	if err != nil {
		return nil, 0, err
	}

	return chats, total, nil
}

// UpdateChat updates a chat by its ID.
func UpdateChat(ctx context.Context, chat *models.Chat) error {
	_, err := getChatCollection().UpdateOne(ctx, bson.M{"_id": chat.ID}, bson.M{"$set": chat})
	return err
}

// DeleteChat deletes a chat by its ID.
func DeleteChat(ctx context.Context, id string) error {
	_, err := getChatCollection().DeleteOne(ctx, bson.M{"_id": id})
	return err
}
