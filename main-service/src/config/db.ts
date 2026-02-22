import mongoose from "mongoose";
import { env } from "./index.js";
import { logger } from "../utils/index.js";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.fatal({ err: error }, "MongoDB connection error");
    process.exit(1);
  }
};
