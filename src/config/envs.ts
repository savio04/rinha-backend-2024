import "dotenv/config";

export const envs = {
  DB_HOSTNAME: process.env.DB_HOSTNAME || "localhost",
  PORT: process.env.PORT || 8080,
};
