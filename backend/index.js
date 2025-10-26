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



const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY.MONGODB_URI);

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
connectDb();

app.use(
  cors({
    origin: "*",
  })
);
console.log(process.env.GEMINI_API_KEY);
app.get("/", (req, res) => res.send("works"));
app.use("/api/user", userRoutes);

app.use("/api/screen", screenRouter);
app.use("/api/resume", resumeRoutes); // New route

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export genAI for use in other modules
export { genAI };
