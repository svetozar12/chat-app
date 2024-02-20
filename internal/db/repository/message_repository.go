package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"sgospodinov-chat-be.com/internal/db/models"
)

type MessageRepository struct {
	db *mongo.Collection
}

func NewMessageRepository(db *mongo.Database) *MessageRepository {
	return &MessageRepository{
		db: db.Collection("messages"),
	}
}

// SaveMessage saves a new message to the database.
func (r *MessageRepository) SaveMessage(ctx context.Context, message *models.Message) error {
	_, err := r.db.InsertOne(ctx, message)
	return err
}

// GetMessagesByChatID retrieves all messages for a given chat.
func (r *MessageRepository) GetMessagesByChatID(ctx context.Context, chatID string) ([]*models.Message, error) {
	var messages []*models.Message
	cursor, err := r.db.Find(ctx, bson.M{"chat_id": chatID})
	if err != nil {
		return nil, err
	}
	err = cursor.All(ctx, &messages)
	return messages, err
}
