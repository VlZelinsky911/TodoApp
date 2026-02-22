import cors from "cors";

export const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:3001", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
