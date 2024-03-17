package auth

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetBearerToken(c *fiber.Ctx) string {
	authHeader := c.Get("Authorization")
	if authHeader != "" && strings.HasPrefix(authHeader, "Bearer ") {
		token := strings.TrimPrefix(authHeader, "Bearer ")

		return token
	}
	return authHeader
}
