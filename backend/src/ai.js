import OpenAI from "openai";
import { config } from "./config.js";

let client = null;

function getClient() {
  if (!config.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (!client) {
    client = new OpenAI({ apiKey: config.openaiApiKey });
  }

  return client;
}

function promptForTask(payload) {
  const { task, question, intake, style, draftText, currentScore, rubric, alignmentContext } = payload;

  if (task === "generate") {
    return [
      "Write a Tennessee charter application response that is aligned to the rubric.",
      "Return plain text only (no markdown headings, no bullet list of rubric criteria).",
      "Write 2-4 coherent paragraphs that can be pasted directly into the application answer field.",
      `Question section: ${question?.section || ""}`,
      `Question title: ${question?.title || ""}`,
      `Question prompt: ${question?.prompt || ""}`,
      `Rubric criteria: ${(question?.rubric || []).join(" | ")}`,
      `User intake: ${(intake || []).filter(Boolean).join(" | ")}`,
      `Style profile: tone=${style?.tone || "formal"}, length=${style?.length || "mixed"}, pov=${style?.pov || "first-person plural"}, phrases=${style?.phrases || "none"}`,
      `Cross-question context: ${JSON.stringify(alignmentContext || {})}`,
      "Use concrete actions, ownership, measurable indicators, and timeline references.",
      "Directly incorporate style profile and preferred phrases where natural."
    ].join("\n");
  }

  if (task === "score") {
    return [
      "You are scoring a Tennessee charter application response.",
      "Return JSON only.",
      "Allowed level values: meet, partial, no.",
      "JSON format: {\"level\":\"meet|partial|no\",\"reason\":\"...\",\"feedback\":\"...\"}",
      `Question prompt: ${question?.prompt || ""}`,
      `Rubric criteria: ${(rubric || question?.rubric || []).join(" | ")}`,
      `Draft text:\n${draftText || ""}`
    ].join("\n");
  }

  if (task === "improve") {
    return [
      "Revise the application response so it meets Tennessee rubric expectations.",
      "Return plain text only (no markdown headings, no rubric list).",
      `Question prompt: ${question?.prompt || ""}`,
      `Rubric criteria: ${(question?.rubric || []).join(" | ")}`,
      `Current score: ${JSON.stringify(currentScore || {})}`,
      `Current draft:\n${draftText || ""}`,
      `Keep style: tone=${style?.tone || "formal"}, length=${style?.length || "mixed"}, pov=${style?.pov || "first-person plural"}, phrases=${style?.phrases || "none"}`,
      `Cross-question context: ${JSON.stringify(alignmentContext || {})}`,
      "Add specificity for implementation, evidence, and accountability."
    ].join("\n");
  }

  if (task === "alignment_check") {
    return [
      "Evaluate alignment between the current answer and prior charter application responses.",
      "Return JSON only.",
      "JSON format:",
      "{\"overall\":\"aligned|partial|misaligned\",\"summary\":\"...\",\"findings\":[{\"severity\":\"high|medium|low\",\"issue\":\"...\",\"suggestion\":\"...\",\"referenceQuestionId\":\"q##\",\"referenceTitle\":\"...\"}]}",
      `Current question: ${question?.title || ""}`,
      `Current prompt: ${question?.prompt || ""}`,
      `Current draft:\n${draftText || ""}`,
      `Cross-question context: ${JSON.stringify(alignmentContext || {})}`,
      "Flag contradictions or drift in mission, target population, goals, model design, or implementation commitments."
    ].join("\n");
  }

  throw new Error("Unsupported task");
}

export async function runAiTask(payload) {
  const client = getClient();
  const prompt = promptForTask(payload);

  const response = await client.chat.completions.create({
    model: config.openaiModel,
    temperature: payload.task === "score" || payload.task === "alignment_check" ? 0.1 : 0.35,
    messages: [
      {
        role: "system",
        content: "You are an expert Tennessee charter school application coach."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return (response.choices?.[0]?.message?.content || "").trim();
}
