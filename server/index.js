import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🧠 Chat Endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log("🟢 Chat request received:", message);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices?.[0]?.message?.content;
    console.log("🔵 OpenAI response:", reply);

    if (!reply) throw new Error("No reply from OpenAI");

    res.json({ reply });
  } catch (error) {
    console.error("❌ Chat Error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

// 📘 Quiz Generator Endpoint
app.get("/api/generate-quiz", async (req, res) => {
  try {
    const { type = "placement" } = req.query;
    const prompt = type === "placement"
      ? `Generate a quiz of 5 multiple-choice questions for a software engineering placement interview. Each question must be related to DSA, system design basics, or core programming concepts. Format: JSON array with fields: question, options (array of 4), answer, explanation.`
      : `Generate a quiz of 5 multiple-choice questions from Computer Engineering core subjects like DBMS, OS, CN, and TOC. Format: JSON array with fields: question, options (array of 4), answer, explanation.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = completion.choices?.[0]?.message?.content?.trim();
    let questions;

    try {
      questions = JSON.parse(content);
    } catch {
      const match = content.match(/```json([\s\S]*?)```/);
      questions = match ? JSON.parse(match[1].trim()) : null;
    }

    if (!questions) throw new Error("Invalid JSON format from OpenAI");

    res.json({ questions });
  } catch (error) {
    console.error("❌ Quiz Error:", error.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

// 🚀 Serve React Frontend (from build folder)
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
