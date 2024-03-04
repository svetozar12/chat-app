package chat

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	message "sgospodinov-chat-be.com/internal/api/chat/messages"
	"sgospodinov-chat-be.com/internal/db/models"
	repository "sgospodinov-chat-be.com/internal/db/repository/chat_repositroy"
)

func RegisterChatRoute(app fiber.Router) {
	chat := app.Group("/chat")
	message.RegisterMessagesRoute(chat)
	chat.Get("/", getChatList)
	chat.Post("/", createChat)
	chat.Get("/:id", getChat)
	chat.Put("/:id", updateChat)
	chat.Delete("/:id", deleteChat)
}

// @Summary     Get all chats
// @Description Retrieves a list of all chat rooms with pagination
// @Tags        chats
// @Accept      json
// @Produce     json
// @Param       page  query    int false "Page number for pagination"              default(1)
// @Param       limit query    int false "Number of items per page for pagination" default(10)
// @Success     200   {object} schemas.PaginationSchema[models.Chat]
// @Router      /chat [get]
func getChatList(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)

	chats, total, err := repository.GetChatList(c.Context(), page, limit)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve chats"})
	}

	return c.JSON(fiber.Map{"data": chats, "total": total})
}

// @Summary     Create chat room
// @Description Creates a new chat room with the provided information
// @Tags        chats
// @Accept      json
// @Produce     json
// @Param       chat body     models.Chat true "Chat Room Information"
// @Success     201  {object} models.Chat
// @Router      /chat [post]
func createChat(c *fiber.Ctx) error {
	var chat models.Chat
	if err := c.BodyParser(&chat); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse chat"})
	}

	if err := repository.SaveChat(c.Context(), &chat); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create chat"})
	}

	return c.Status(fiber.StatusCreated).JSON(chat)
}

// @Summary     Get chat room details
// @Description Retrieves details of a specific chat room by its ID
// @Tags        chats
// @Accept      json
// @Produce     json
// @Param       id  path     string true "Chat Room ID"
// @Success     200 {object} models.Chat
// @Router      /chat/{id} [get]
func getChat(c *fiber.Ctx) error {
	id := c.Params("id")

	chat, err := repository.GetChatByID(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Chat not found"})
	}

	return c.JSON(chat)
}

// @Summary     Update chat room
// @Description Updates an existing chat room's details by its ID
// @Tags        chats
// @Accept      json
// @Produce     json
// @Param       id   path     string      true "Chat Room ID"
// @Param       chat body     models.Chat true "Updated Chat Room Information"
// @Success     200  {object} models.Chat
// @Router      /chat/{id} [put]
func updateChat(c *fiber.Ctx) error {
	// Extracting the chat ID from the path parameter
	id := c.Params("id")

	// Create an empty Chat object to hold the request body
	var updates models.Chat
	if err := c.BodyParser(&updates); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse update data"})
	}

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	updates.ID = objID.Hex() // Convert ObjectID to string if necessary
	// Now, call the repository function with the correct arguments
	if err := repository.UpdateChat(c.Context(), &updates); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update chat"})
	}

	return c.JSON(fiber.Map{"message": "Chat updated successfully", "chat": updates})
}

// @Summary     Delete chat room
// @Description Deletes a chat room by its ID
// @Tags        chats
// @Accept      json
// @Produce     json
// @Param       id path string true "Chat Room ID"
// @Success     204
// @Router      /chat/{id} [delete]
func deleteChat(c *fiber.Ctx) error {
	id := c.Params("id")

	if err := repository.DeleteChat(c.Context(), id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete chat"})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
