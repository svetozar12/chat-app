import { getEnv } from "./envUtils";

const env = {
  DEBUG: getEnv("DEBUG"),
  API_URL: getEnv("API_URL"),
};

export { env };
