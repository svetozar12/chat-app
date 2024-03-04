package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"sgospodinov-chat-be.com/config"
	"sgospodinov-chat-be.com/internal/db/models"
)

func getUsersCollection() *mongo.Collection {
	envs := config.GetConfig()
	return config.GetMongoDB().Database(envs.MongoDBName).Collection("users")
}

// SaveUser saves a new user to the database.
func SaveUser(ctx context.Context, user *models.User) error {
	_, err := getUsersCollection().InsertOne(ctx, user)
	return err
}

// GetUserByID retrieves a user by its ID.
func GetUserByID(ctx context.Context, id string) (*models.User, error) {
	var user models.User
	err := getUsersCollection().FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	return &user, err
}

// GetUserList retrieves a list of users with pagination.
func GetUserList(ctx context.Context, page int, pageSize int) ([]*models.User, int64, error) {
	var users []*models.User
	var total int64
	options := options.Find().SetSkip(int64((page - 1) * pageSize)).SetLimit(int64(pageSize))

	cursor, err := getUsersCollection().Find(ctx, bson.D{{}}, options)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var user models.User
		if err := cursor.Decode(&user); err != nil {
			return nil, 0, err
		}
		users = append(users, &user)
	}

	total, err = getUsersCollection().CountDocuments(ctx, bson.D{{}})
	if err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

// UpdateUser updates a user by its ID.
func UpdateUser(ctx context.Context, user *models.User) error {
	_, err := getUsersCollection().UpdateOne(ctx, bson.M{"_id": user.ID}, bson.M{"$set": user})
	return err
}

// DeleteUser deletes a user by its ID.
func DeleteUser(ctx context.Context, id string) error {
	_, err := getUsersCollection().DeleteOne(ctx, bson.M{"_id": id})
	return err
}
