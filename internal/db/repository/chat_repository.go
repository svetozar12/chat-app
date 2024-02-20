package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"sgospodinov-chat-be.com/internal/db/models"
)

type ChatRepository struct {
	db *mongo.Collection
}

func NewChatRepository(db *mongo.Database) *ChatRepository {
	return &ChatRepository{
		db: db.Collection("chats"),
	}
}

// SaveChat saves a new chat to the database.
func (r *ChatRepository) SaveChat(ctx context.Context, chat *models.Chat) error {
	_, err := r.db.InsertOne(ctx, chat)
	return err
}

// GetChatByID retrieves a chat by its ID.
func (r *ChatRepository) GetChatByID(ctx context.Context, id string) (*models.Chat, error) {
	var chat models.Chat
	err := r.db.FindOne(ctx, bson.M{"_id": id}).Decode(&chat)
	return &chat, err
}

// Other chat-related database operations...
