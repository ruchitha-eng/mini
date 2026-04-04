import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.ts";
import learningRoutes from "./routes/learning.routes.ts";
import errorHandler from "./middleware/error-handler.middleware.ts";

const app: Application = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:8080",
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:8080",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/learning", learningRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

export default app;