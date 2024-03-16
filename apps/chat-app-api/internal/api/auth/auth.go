package auth

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
    googleOauthConfig = &oauth2.Config{
        RedirectURL:  "http://localhost:8080/v1/auth/google/callback",
        ClientID:     "191857167843-rashq98hcv4v1rdrhfefv2jeh36rikf4.apps.googleusercontent.com",
        ClientSecret: "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",
        Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile"},
        Endpoint:     google.Endpoint,
    }
    oauthStateString = "random"
)

func login(c *fiber.Ctx) error {
    url := googleOauthConfig.AuthCodeURL(oauthStateString)
    return c.Redirect(url)
}

func callback(c *fiber.Ctx) error {
    state := c.Query("state")
    if state != oauthStateString {
        return c.SendStatus(http.StatusBadRequest)
    }

    code := c.Query("code")
    token, err := googleOauthConfig.Exchange(c.Context(), code)
    if err != nil {
        return c.SendStatus(http.StatusInternalServerError)
    }
	fmt.Println(token)
    // Use token to get user information
    // For example, you can make a request to Google API to get user info

    // Then, you can proceed with your application logic

    return c.SendString("Authenticated successfully")
}

func RegisterAuthRoute(app fiber.Router) {
    auth := app.Group("/auth")

    auth.Get("/google/login", login)
    auth.Get("/google/callback", callback)
}
