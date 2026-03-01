import pino, {} from "pino";
const isDev = process.env.NODE_ENV !== "production";
const transport = isDev
    ? { target: "pino-pretty", options: { colorize: true } }
    : undefined;
export const logger = pino({
    level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
    timestamp: pino.stdTimeFunctions.isoTime,
    ...(transport && { transport }),
});
//# sourceMappingURL=logger.js.map