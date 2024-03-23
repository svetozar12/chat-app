package auth

import (
	"net/http"
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

func verifyToken(token string) error {
	res, _ := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token)

	if res.StatusCode != http.StatusOK {
		return fiber.ErrUnauthorized
	}
	return nil
}
