package models

import "time"

// Message represents a message in a chat.
type Message struct {
	ID      string    `bson:"_id"`     // Unique identifier for the message
	ChatID  string    `bson:"chat_id"` // ID of the chat this message belongs to
	UserID  string    `bson:"user_id"` // ID of the user who sent the message
	Content string    `bson:"content"` // Message content
	Time    time.Time `bson:"time"`    // Timestamp of when the message was sent
}
