import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/index.js";
import { corsOptions } from "./config/index.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// app.use("/api/todos", todoRouter);

app.use(errorHandler);

export default app;
