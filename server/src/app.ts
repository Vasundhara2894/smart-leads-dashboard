import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import leadRoutes from "./routes/leadRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get("/", (_req, res) => {
  res.send("Smart Leads API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use(errorHandler);

export default app;