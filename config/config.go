package config

func GetConfig() *AppConfig {
	LoadEnv() // Ensure .env variables are loaded

	return &AppConfig{
		MongoUrl:  getEnv("MONGO_URL", "mongodb://localhost:27017/local"),
		Port:      getEnv("PORT", "8080"),
		JWTSecret: getEnv("JWT_SECRET", "default_secret"),
	}
}
