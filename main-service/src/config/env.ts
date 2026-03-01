import dotenv from "dotenv";
dotenv.config();

interface Env {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  ACCESS_TOKEN_SECRET: string;
}

export const env: Env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5001"),
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27018/main-service",
  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET || "access-secret-key-change-in-production",
};
