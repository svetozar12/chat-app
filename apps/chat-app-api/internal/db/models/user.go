package models

// User represents a chat application user.
type User struct {
	ID       string `bson:"_id"`      // Unique identifier, e.g., OAuth provider's user ID
	Username string `bson:"username"` // User's name
	Email    string `bson:"email"`    // User's email
	// Add other fields as necessary, such as AvatarURL, etc.
}
