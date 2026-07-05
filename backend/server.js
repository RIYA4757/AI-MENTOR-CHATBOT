import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import chatRouter from "./routes/chat.js";

dotenv.config();
// console.log("OPENAI:", !!process.env.OPENAI_API_KEY);
// console.log("TAVILY:", !!process.env.TAVILY_API_KEY);
// console.log("GEMINI:", !!process.env.GEMINI_API_KEY);
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Mentor Backend Running");
});

app.use("/chat", chatRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});