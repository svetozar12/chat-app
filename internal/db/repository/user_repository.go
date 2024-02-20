package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"sgospodinov-chat-be.com/internal/db/models"
)

type UserRepository struct {
	db *mongo.Collection
}

func NewUserRepository(db *mongo.Database) *UserRepository {
	return &UserRepository{
		db: db.Collection("users"),
	}
}

// SaveUser saves a new user to the database.
func (r *UserRepository) SaveUser(ctx context.Context, user *models.User) error {
	_, err := r.db.InsertOne(ctx, user)
	return err
}

// GetUserByID retrieves a user by their ID.
func (r *UserRepository) GetUserByID(ctx context.Context, id string) (*models.User, error) {
	var user models.User
	err := r.db.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	return &user, err
}

// Other user-related database operations...
