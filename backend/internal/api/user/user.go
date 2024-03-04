package user

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"sgospodinov-chat-be.com/internal/db/models"
	repository "sgospodinov-chat-be.com/internal/db/repository/user_repository"
)

func RegisterUserRoute(app fiber.Router) {
	user := app.Group("/user")


	user.Get("/", getUserList)
	user.Post("/", createUser)
	user.Get("/:id", getUser)
	user.Put("/:id", updateChat)
	user.Delete("/:id", deleteUser)
}

// @Summary     Get all users
// @Description Retrieves a list of all users with pagination
// @Tags        users
// @Accept      json
// @Produce     json
// @Param       page  query    int false "Page number for pagination"              default(1)
// @Param       limit query    int false "Number of items per page for pagination" default(10)
// @Success     200   {object} schemas.PaginationSchema[models.User]
// @Router      /user [get]
func getUserList(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)

	users, total, err := repository.GetUserList(c.Context(), page, limit)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve chats"})
	}

	return c.JSON(fiber.Map{"data": users, "total": total})
}

// @Summary     Create a user
// @Description Creates a new user
// @Tags        users
// @Accept      json
// @Produce     json
// @Param       user body     models.User true "User Information"
// @Success     201  {object} models.User
// @Router      /user [post]
func createUser(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse chat"})
	}

	if err := repository.SaveUser(c.Context(), &user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create chat"})
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}

// @Summary     Get users details
// @Description Retrieves details of a specific user by its ID
// @Tags        users
// @Accept      json
// @Produce     json
// @Param       id  path     string true "user ID"
// @Success     200 {object} models.User
// @Router      /user/{id} [get]
func getUser(c *fiber.Ctx) error {
	id := c.Params("id")

	user, err := repository.GetUserByID(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Chat not found"})
	}

	return c.JSON(user)
}

// @Summary     Update user
// @Description Updates an existing user details by its ID
// @Tags        users
// @Accept      json
// @Produce     json
// @Param       id   path     string      true "User ID"
// @Param       user body     models.User true "Updated User Information"
// @Success     200  {object} models.User
// @Router      /user/{id} [put]
func updateChat(c *fiber.Ctx) error {
	// Extracting the user ID from the path parameter
	id := c.Params("id")

	// Create an empty User object to hold the request body
	var updates models.User
	if err := c.BodyParser(&updates); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse update data"})
	}

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	updates.ID = objID.Hex() // Convert ObjectID to string if necessary
	// Now, call the repository function with the correct arguments
	if err := repository.UpdateUser(c.Context(), &updates); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update chat"})
	}

	return c.JSON(fiber.Map{"message": "Chat updated successfully", "chat": updates})
}

// @Summary     Delete user
// @Description Deletes a user by its ID
// @Tags        users
// @Accept      json
// @Produce     json
// @Param       id path string true "User ID"
// @Success     204
// @Router      /user/{id} [delete]
func deleteUser(c *fiber.Ctx) error {
	id := c.Params("id")

	if err := repository.DeleteUser(c.Context(), id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete user"})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
