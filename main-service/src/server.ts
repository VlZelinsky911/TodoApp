import app from "./app.js";
import { connectDB, env } from "./config/index.js";
import { logger } from "./utils/index.js";
import mongoose from "mongoose";

const start = async () => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received, shutting down gracefully`);

    server.close(async () => {
      logger.info("HTTP server closed");

      await mongoose.connection.close();
      logger.info("MongoDB connection closed");

      process.exit(0);
    });

    setTimeout(() => {
      logger.error("Forced shutdown due to timeout");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

start();
