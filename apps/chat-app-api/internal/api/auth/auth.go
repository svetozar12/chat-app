package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"sgospodinov-chat-be.com/internal/db/models"
	repository "sgospodinov-chat-be.com/internal/db/repository/user_repository"
	"sgospodinov-chat-be.com/internal/schemas"
)

type GoogleUser struct {
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
	Locale        string `json:"locale"`
}

var (
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/v1/auth/google/callback",
		ClientID:     "191857167843-rashq98hcv4v1rdrhfefv2jeh36rikf4.apps.googleusercontent.com",
		ClientSecret: "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",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	oauthStateString = "random"
)

func RegisterAuthRoute(app fiber.Router) {
	auth := app.Group("/auth")

	auth.Get("/google/login", login)
	auth.Get("/google/callback", callback)
	auth.Get("/google/verify", GoogleOAuthMiddleware, verifyGoogleToken)
}

func login(c *fiber.Ctx) error {
	url := googleOauthConfig.AuthCodeURL(oauthStateString)
	return c.Redirect(url)
}

func callback(c *fiber.Ctx) error {
	code := c.Query("code")
	token, err := googleOauthConfig.Exchange(c.Context(), code)
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}
	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return c.SendString("User Data Fetch Failed")
	}

	var userData GoogleUser
	if err := json.NewDecoder(resp.Body).Decode(&userData); err != nil {
		return c.SendString("Error decoding user data")
	}

	user, _ := repository.GetUserByID(c.Context(), bson.M{"email": userData.Email})
	fmt.Println(user)

	if user.Email == "" {
		repository.SaveUser(c.Context(), &models.User{Name: userData.Name, Email: userData.Email, Picture: userData.Picture})
	}

	c.Cookie(&fiber.Cookie{
		Name:  "token",
		Value: token.AccessToken, Expires: <-time.After(36000),
	})

	return c.Redirect("http://localhost:4200")
}

// @Summary     Verify if token is valid
// @Description check with the 3rd party provider if your token is valid
// @Tags        auth
// @Accept      json
// @Produce     json
// @Success     200   {object} schemas.VerifyTokenSchema
// @Security    bearerAuth
// @Router      /auth/google/verify [get]
// @Security    bearerAuth
// @Param       Authorization header string true "Bearer token"
func verifyGoogleToken(c *fiber.Ctx) error {
	return c.JSON(schemas.VerifyTokenSchema{IsAuth: true})
}

func GoogleOAuthMiddleware(c *fiber.Ctx) error {
	token := GetBearerToken(c)
	err := verifyToken(token)
	if err != nil {
		c.Status(http.StatusUnauthorized)
		return c.JSON(schemas.VerifyTokenSchema{IsAuth: false})
	}

	return c.Next()
}
