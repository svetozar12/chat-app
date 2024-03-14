package auth

import "github.com/gofiber/fiber/v2"

func RegisterAuthRoute(app fiber.Router) {
	auth := app.Group("/auth");

	auth.Post("/login",login)
	auth.Post("/register",register)
	auth.Post("/verifyOTP",verifyOtp)
	auth.Post("/resendOTP",resendOtp)
}

func login(c *fiber.Ctx) error {
	return c.Send([]byte{})
}

func register(c *fiber.Ctx) error {
	return c.Send([]byte{})
}

func verifyOtp(c *fiber.Ctx) error {
	return c.Send([]byte{})
}
func resendOtp(c *fiber.Ctx) error {
	return c.Send([]byte{})
}
