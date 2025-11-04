import { ChatGroq } from "@langchain/groq";

export function getGroqModel() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY");
  }
  const modelMap = {
    fast: "llama-3.1-8b-instant", // quick tasks
    creative: "llama-3.3-70b-versatile", // long, creative outputs
  };
  return new ChatGroq({
    model: modelMap[type],
    temperature: type === "creative" ? 0.9 : 0.2,
    apiKey: process.env.GROQ_API_KEY,
  });
}
