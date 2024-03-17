package user

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"sgospodinov-chat-be.com/internal/api/auth"
	repository "sgospodinov-chat-be.com/internal/db/repository/user_repository"
)

func RegisterUserRoute(app fiber.Router) {
	user := app.Group("/user")
	// middlewares
	user.Use(auth.GoogleOAuthMiddleware)
	// routes
	user.Get("/", getUserList)
	user.Get("/:id", getUser)
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
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve users"})
	}

	return c.JSON(fiber.Map{"data": users, "total": total})
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

	user, err := repository.GetUserByID(c.Context(), bson.M{"_id": id})
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "user not found"})
	}

	return c.JSON(user)
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
