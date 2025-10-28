import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { getGroqModel } from "./groq";

function parseJSON(text) {
  if (!text) return {};
  if (typeof text !== "string") {
    // handle cases where LLM returns { text: "..." } or nested structure
    if (typeof text.text === "string") text = text.text;
    else if (typeof text.output === "string") text = text.output;
    else return text; // already an object, return as-is
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
  const llm = getGroqModel();

  // 1️⃣ Resume Analysis Chain
  const analyzerPrompt = new PromptTemplate({
    template: `You are ResumeAnalyzerAgent. Given the resume text, extract structured info as strict JSON with keys: 
skills (array of strings), roles (array of strings), education (array of strings), achievements (array of strings). 
Only output JSON.

Resume:
{resumeText}`,
    inputVariables: ["resumeText"],
  });

  const analyzerChain = RunnableSequence.from([analyzerPrompt, llm]);
  const analyzerResp = await analyzerChain.invoke({ resumeText });
  const analysis = parseJSON(analyzerResp);

  // 2️⃣ Prediction Chain
  const predictorPrompt = new PromptTemplate({
    template: `You are CareerPredictorAgent. Use the analysis JSON to predict next roles, growth score (0-100), and skill gaps. 
Output strict JSON with keys: next_roles (array of strings), growth_score (number), skill_gaps (array of strings). 
Only output JSON.

Analysis JSON:
{analysisJson}`,
    inputVariables: ["analysisJson"],
  });

  const predictorChain = RunnableSequence.from([predictorPrompt, llm]);
  const predictorResp = await predictorChain.invoke({
    analysisJson: JSON.stringify(analysis),
  });
  const prediction = parseJSON(predictorResp);

  // 3️⃣ Horoscope Narration Chain
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

  const narratorChain = RunnableSequence.from([narratorPrompt, llm]);
  const narratorResp = await narratorChain.invoke({
    analysisJson: JSON.stringify(analysis),
    predictionJson: JSON.stringify(prediction),
  });

  const horoscope =
    typeof narratorResp === "string"
      ? narratorResp.trim()
      : narratorResp?.text?.trim?.() || narratorResp;

  return { analysis, prediction, horoscope };
}
