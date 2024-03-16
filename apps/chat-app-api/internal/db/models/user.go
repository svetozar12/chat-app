package models

// User represents a chat application user.
type User struct {
	ID       string `bson:"_id"`
	Name string `bson:"name"` 
	Phone    string `bson:"phone"`
	// Add other fields as necessary, such as AvatarURL, etc.
}
