import "dotenv/config";
import express from "express";
// import OpenAI from "openai";
// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { hiteshPersona } from "../personas/hitesh.js";
import { piyushPersona } from "../personas/piyush.js";
import { searchTopic } from "../services/tavily.js";

const router = express.Router();
// console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);
// const client = new OpenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });
// const client = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

let hiteshMessages = [
  {
    role: "system",
    content: hiteshPersona,
  },
];

let piyushMessages = [
  {
    role: "system",
    content: piyushPersona,
  },
];

const searchKeywords = [
  "course",
  "courses",
  "tutorial",
  "video",
  "videos",
  "youtube",
  "playlist",
  "resource",
  "resources",
  "learn",
  "learning",
  "roadmap",
  "docs",
  "documentation",
  "guide",
  "github",
  "repo",
  "reference",
];

router.post("/", async (req, res) => {
  try {
    const { message, mentor } = req.body;
    // const test = await searchTopic(message);
    // console.log(test);

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Please enter a message.",
      });
    }

    console.log("\n==============================");
    console.log("Mentor :", mentor);
    console.log("User   :", message);

    let messages =
      mentor === "piyush"
        ? piyushMessages
        : hiteshMessages;

    messages.push({
      role: "user",
      content: message,
    });
    

    if (messages.length > 15) {
      messages.splice(1, 2);
    }

    let resource = null;

const shouldSearch = searchKeywords.some(keyword =>
  message.toLowerCase().includes(keyword)
);

if (shouldSearch) {
  console.log("Searching Tavily...");

  resource = await searchTopic(message);

  if (resource) {
    console.log("Resource Found:", resource.title);
    
    messages.push({
      role: "system",
      content: `
The user wants learning resources.

Recommend this only if it genuinely helps.

Title:
${resource.title}

URL:
${resource.url}

Summary:
${resource.content}

Rules:
- Stay in character.
- Don't paste raw URLs.
- Mention the resource naturally.
- Keep it brief.
`
    });
  }
}

    console.log("Calling OpenAI...");

    const start = Date.now();
    const prompt = messages
  .map(msg => `${msg.role.toUpperCase()}:\n${msg.content}`)
  .join("\n\n");

const result = await model.generateContent(prompt);

console.log(
  `Gemini responded in ${(
    (Date.now() - start) /
    1000
  ).toFixed(2)} sec`
);

const reply =
  result.response.text() ??
  "Sorry, I couldn't generate a response.";

    // const completion = await client.chat.completions.create({
    //   model: "gpt-5-mini",
    //   messages,
    //   max_completion_tokens: 3500,
    // });

    // console.log(
    //   `OpenAI responded in ${(
    //     (Date.now() - start) /
    //     1000
    //   ).toFixed(2)} sec`
    // );

    // const assistantMessage = completion.choices?.[0]?.message;

    // const reply =
    //   assistantMessage?.content ??
    //   "Sorry, I couldn't generate a response.";

    messages.push({
      role: "assistant",
      content: reply,
    });

    if (resource) {
      messages.splice(messages.length - 2, 1);
    }

    if (mentor === "piyush") {
      piyushMessages = messages;
    } else {
      hiteshMessages = messages;
    }

    console.log("Sending response...");
    console.log("==============================\n");

    res.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
});

export default router;