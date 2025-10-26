import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./config/connect.js";
import cookieParser from "cookie-parser";
import screenRouter from "./routes/screenRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// ❌ FIX THIS LINE - You had .MONGODB_URI which is wrong!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 8000; // ✅ Use environment PORT for Render

app.use(express.json());
app.use(cookieParser());
connectDb();

// ✅ Update CORS for production
app.use(
  cors({
    origin: "*",
  })
);

console.log("Gemini API Key loaded:", !!process.env.GEMINI_API_KEY);

app.get("/", (req, res) => res.send("Resume Builder API is running"));

app.use("/api/user", userRoutes);
app.use("/api/screen", screenRouter);
app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export genAI for use in other modules
export { genAI };
