import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { getGroqModel } from "./groq";

function parseJSON(text) {
  if (!text) return {};
  if (typeof text !== "string") {
    if (typeof text.text === "string") text = text.text;
    else if (typeof text.output === "string") text = text.output;
    else return text;
  }

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/{[\s\S]*}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
    return {};
  }
}

export async function analyzeResumeText(resumeText) {
  // ✅ Use different models for each step
  const fastModel = getGroqModel("fast");       // Llama 3.1 8B Instant
  const creativeModel = getGroqModel("creative"); // Llama 3.3 70B Versatile

  // 1️⃣ Resume Analysis Chain (FAST)
  const analyzerPrompt = new PromptTemplate({
    template: `You are ResumeAnalyzerAgent. Given the resume text, extract structured info as strict JSON with keys: 
skills (array of strings), roles (array of strings), education (array of strings), achievements (array of strings). 
Only output JSON.

Resume:
{resumeText}`,
    inputVariables: ["resumeText"],
  });

  const analyzerChain = RunnableSequence.from([analyzerPrompt, fastModel]);
  const analyzerResp = await analyzerChain.invoke({ resumeText });
  const analysis = parseJSON(analyzerResp);

  // 2️⃣ Career Prediction Chain (FAST)
  const predictorPrompt = new PromptTemplate({
    template: `You are CareerPredictorAgent. Use the analysis JSON to predict next roles, growth score (0-100), and skill gaps. 
Also, consider real-world tech & job market trends (2025 context). 
Output strict JSON with keys: next_roles (array of strings), growth_score (number), skill_gaps (array of strings). 
Only output JSON.

Analysis JSON:
{analysisJson}`,
    inputVariables: ["analysisJson"],
  });

  const predictorChain = RunnableSequence.from([predictorPrompt, fastModel]);
  const predictorResp = await predictorChain.invoke({
    analysisJson: JSON.stringify(analysis),
  });
  const prediction = parseJSON(predictorResp);

  // 3️⃣ Horoscope Narration Chain (CREATIVE)
  const narratorPrompt = new PromptTemplate({
    template: `You are AstroNarratorAgent. Craft a short, uplifting "career horoscope" styled message (120–200 words)
based on the analysis and prediction JSON. Address the user as "You".

Analysis JSON:
{analysisJson}

Prediction JSON:
{predictionJson}

Only output the narrative, no JSON.`,
    inputVariables: ["analysisJson", "predictionJson"],
  });

  const narratorChain = RunnableSequence.from([narratorPrompt, creativeModel]);
  const narratorResp = await narratorChain.invoke({
    analysisJson: JSON.stringify(analysis),
    predictionJson: JSON.stringify(prediction),
  });

  const horoscope =
    typeof narratorResp === "string"
      ? narratorResp.trim()
      : narratorResp?.text?.trim?.() || narratorResp;

  // 4️⃣ Career Roadmap Generator (CREATIVE)
  const roadmapPrompt = new PromptTemplate({
    template: `
You are **CareerRoadmapPlannerAgent**. Based on the provided user's skills, skill gaps, and next roles,
generate a **personalized career roadmap** for professional growth.

You MUST follow this exact structure and variable names in your JSON output.

**Output Format (strictly this structure):**
{{
  "short_term": [
    {{
      "title": "string — concise title of the action step",
      "description": "string — what to do and why it matters",
      "duration": "string — expected time (e.g., 2 weeks)",
      "outcome": "string — measurable result or benefit"
    }}
  ],
  "mid_term": [
    {{
      "title": "string",
      "description": "string",
      "duration": "string",
      "outcome": "string"
    }}
  ],
  "long_term": [
    {{
      "title": "string",
      "description": "string",
      "duration": "string",
      "outcome": "string"
    }}
  ]
}}

🧠 **Guidelines:**
- Do **not** include explanations, markdown, or extra text — return **only the valid JSON**.
- Each array must contain 3–5 action steps.
- Use 2025 job market and emerging tech trends as context.
- Ensure actions are **achievable**, **specific**, and **skill-growth-oriented**.

**Analysis JSON:**
{analysisJson}

**Prediction JSON:**
{predictionJson}
`,
    inputVariables: ["analysisJson", "predictionJson"],
  });

  const roadmapChain = RunnableSequence.from([roadmapPrompt, creativeModel]);
  const roadmapResp = await roadmapChain.invoke({
    analysisJson: JSON.stringify(analysis),
    predictionJson: JSON.stringify(prediction),
  });

  const roadmap = parseJSON(roadmapResp);

  // ✅ Return final structured result
  return { analysis, prediction, horoscope, roadmap };
}
