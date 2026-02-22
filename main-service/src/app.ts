import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { errorHandler } from "./middlewares/index.js";
import { corsOptions } from "./config/index.js";
import { logger } from "./utils/index.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// app.use("/api/todos", todoRouter);

app.use(errorHandler);

export default app;
