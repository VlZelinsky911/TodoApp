import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";
import { env } from "../config/index.js";
export const authenticate = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw ApiError.unauthorized("Access token is required");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw ApiError.unauthorized("Access token is required");
    }
    try {
        const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        req.user = { userId: payload.userId, email: payload.email };
        next();
    }
    catch {
        throw ApiError.unauthorized("Invalid or expired access token");
    }
};
//# sourceMappingURL=authenticate.js.map