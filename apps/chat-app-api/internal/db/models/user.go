package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// User represents a chat application user.
type User struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"`
	Name    string             `bson:"name"`
	Email   string             `bson:"email"`
	Picture string             `bson:"picture"`
}
