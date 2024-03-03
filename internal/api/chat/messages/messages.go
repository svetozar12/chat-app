package message

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"sgospodinov-chat-be.com/internal/db/models"
	repository "sgospodinov-chat-be.com/internal/db/repository/message_repository"
)

func RegisterMessagesRoute(app fiber.Router) {
	message := app.Group("/message")

	message.Get("/", getMessageList)
	message.Post("/", createMessage)
	message.Get("/:id", getMessage)
	message.Put("/:id", updateMessage)
	message.Delete("/:id", deleteMessage)
}

// @Summary     Get all messages
// @Description Retrieves a list of all messages with pagination
// @Tags        messages
// @Accept      json
// @Produce     json
// @Param       page  query    int false "Page number for pagination"              default(1)
// @Param       limit query    int false "Number of items per page for pagination" default(10)
// @Success     200   {object} schemas.PaginationSchema[models.Message]
// @Router      /message [get]
func getMessageList(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)

	messages, total, err := repository.GetMessageList(c.Context(), page, limit)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve messages"})
	}

	return c.JSON(fiber.Map{"data": messages, "total": total})
}

// @Summary     Create message
// @Description Creates a new message room with the provided information
// @Tags        messages
// @Accept      json
// @Produce     json
// @Param       message body     models.Message true "message Room Information"
// @Success     201     {object} models.Message
// @Router      /message [post]
func createMessage(c *fiber.Ctx) error {
	var message models.Message
	if err := c.BodyParser(&message); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse message"})
	}

	if err := repository.SaveMessage(c.Context(), &message); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create message"})
	}

	return c.Status(fiber.StatusCreated).JSON(message)
}

// @Summary     Get message details
// @Description Retrieves details of a specific message by its ID
// @Tags        messages
// @Accept      json
// @Produce     json
// @Param       id  path     string true "message ID"
// @Success     200 {object} models.Message
// @Router      /message/{id} [get]
func getMessage(c *fiber.Ctx) error {
	id := c.Params("id")

	message, err := repository.GetMessageByID(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "message not found"})
	}

	return c.JSON(message)
}

// @Summary     Update message
// @Description Updates an existing message details by its ID
// @Tags        messages
// @Accept      json
// @Produce     json
// @Param       id      path     string         true "message ID"
// @Param       message body     models.Message true "Updated message Information"
// @Success     200     {object} models.Message
// @Router      /message/{id} [put]
func updateMessage(c *fiber.Ctx) error {
	// Extracting the message ID from the path parameter
	id := c.Params("id")

	// Create an empty message object to hold the request body
	var updates models.Message
	if err := c.BodyParser(&updates); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse update data"})
	}

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	updates.ID = objID.Hex() // Convert ObjectID to string if necessary
	// Now, call the repository function with the correct arguments
	if err := repository.UpdateMessage(c.Context(), &updates); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update message"})
	}

	return c.JSON(fiber.Map{"message": "message updated successfully", "messages": updates})
}

// @Summary     Delete message room
// @Description Deletes a message room by its ID
// @Tags        messages
// @Accept      json
// @Produce     json
// @Param       id path string true "message Room ID"
// @Success     204
// @Router      /message/{id} [delete]
func deleteMessage(c *fiber.Ctx) error {
	id := c.Params("id")

	if err := repository.DeleteMessage(c.Context(), id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete message"})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
