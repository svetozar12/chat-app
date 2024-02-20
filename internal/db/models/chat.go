package models

// Chat represents a chat room or conversation.
type Chat struct {
	ID      string   `bson:"_id"`     // Unique identifier for the chat
	Members []string `bson:"members"` // User IDs of chat members
	// Add other metadata as necessary, such as chat name, creation date, etc.
}
