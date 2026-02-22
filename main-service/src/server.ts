import app from "./app.js";
import { connectDB, env } from "./config/index.js";
import { logger } from "./utils/index.js";

const start = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
  });
};

start();
