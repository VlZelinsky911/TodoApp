import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { errorHandler } from "./middlewares/index.js";
import { corsOptions } from "./config/index.js";
import { logger } from "./utils/index.js";
import { todoRouter } from "./modules/todo/index.js";
const app = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(pinoHttp({
    logger,
    autoLogging: {
        ignore: (req) => req.url === "/favicon.ico",
    },
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
        }),
    },
}));
app.get("/", (_req, res) => {
    res.json({ message: "Server is running" });
});
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/api/todos", todoRouter);
app.use((_req, res) => {
    res.status(404).json({ message: "Not Found" });
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map