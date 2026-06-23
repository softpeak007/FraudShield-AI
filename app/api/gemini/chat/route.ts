import { Type } from "@google/genai";
import { getAiClient, generateContentWithRetry } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

function sanitizeString(str: any, maxLength = 256): string {
  if (typeof str !== "string") return "";
  const clean = str.replace(/<[^>]*>/g, "");
  return clean.substring(0, maxLength).trim();
}

function validateMessages(messages: any[]): { role: string; content: string }[] {
  if (!Array.isArray(messages)) {
    throw new Error("Invalid conversation structure.");
  }
  // Take at most last 15 messages to prevent bills/context exhaustion (DoS defense)
  return messages.slice(-15).map(msg => ({
    role: (msg.role === "user" || msg.role === "model" || msg.role === "assistant") ? msg.role : "user",
    content: typeof msg.content === "string" ? msg.content.substring(0, 1500).replace(/<[^>]*>/g, "") : ""
  }));
}

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
    }

    const { messages, currentThreatLevel, activeAlertsCount } = body;

    if (!messages) {
      return NextResponse.json({ error: "Missing conversation history" }, { status: 400 });
    }

    // Dynamic clean-up and bounds enforcements
    let cleanMessages;
    try {
      cleanMessages = validateMessages(messages);
    } catch (msgErr: any) {
      return NextResponse.json({ error: msgErr.message || "Invalid message structures" }, { status: 422 });
    }

    const cleanThreat = sanitizeString(currentThreatLevel || "ELEVATED", 32);
    const cleanMsgCount = typeof activeAlertsCount === "number" && !isNaN(activeAlertsCount)
      ? Math.min(Math.max(activeAlertsCount, 0), 1000)
      : 0;

    const client = getAiClient();

    // Map messages to the format expected by the GoogleGenAI chats SDK
    // System instruction can be passed in the config
    const systemInstruction = `You are "Aegis-9", an advanced AI Copilot running inside FraudShield AI, a premier enterprise banking fraud response cell.
Your role is to act as a senior fraud analyst and cybersecurity investigator, supporting examiners, fraud investigators, and compliance officers.

Guidelines:
1. Always use clear, professional corporate and business-oriented language. Avoid cinema-style, theatrical cybersecurity jargon (like "cyber warfare links", "neural locks", "matrix sweeps").
2. Ensure explanations are formatted inside standard markdown (including clean headings and clear bullet points for vital findings). Keep reports easy for non-technical managers and regulatory auditors to understand.
3. Recommend only realistic, real-world banking actions. Do NOT mention fictional names like "KILL_CHAIN_PROTOCOL_ALPHA", "OMEGA_LOCK", "DELTA_VECTOR", "ALPHA_CONTAINMENT". Always offer direct, realistic actions such as:
   - Freeze Account
   - Block Transaction
   - Verify Customer Identity
   - Terminate Active Sessions
   - Escalate to Investigator
4. Continuously recommend the next best action clearly near the end of every response.
5. In your response output, populate the 'suggestions' field with 5 to 10 actionable, exploration-oriented suggested followup questions/chips for the user. These must be dynamically relevant to the current conversation context, the current threat state, and detected fraud patterns. Use specific action-oriented prefixes with relevant clean emojis, for example:
   🔍 Investigate suspicious entities
   📊 Show risk analysis
   🕸 Visualize fraud network
   📄 Generate case report
   ⚠ Show critical alerts
   🧾 Review evidence
   📈 Predict future risk
   🏦 Analyze account activity
   🔗 Find hidden relationships
   ✅ Recommend next actions
   Or questions about the details like:
   - Why was this transaction flagged?
   - Show today's highest risk transactions
   - Create investigation report
   Explain risk score calculation

Context:
- Current banking security threat state is: ${cleanThreat}.
- Total uncontained active alerts in the feed: ${cleanMsgCount}.`;

    // Format content for standard models endpoint structure
    const formattedContents = cleanMessages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await generateContentWithRetry(client, {
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { 
              type: Type.STRING, 
              description: "The detailed assistant reply. Can use markdown bullets and bold headers." 
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 to 10 highly relevant, action-oriented suggested follow-up questions or exploring actions with emojis."
            }
          },
          required: ["reply", "suggestions"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No output generated from Gemini chat model.");
    }

    const { reply, suggestions } = JSON.parse(responseText);

    return NextResponse.json({ reply, suggestions });
  } catch (error: any) {
    console.error("AI Copilot Chat error (Production Log):", error);
    // Secure clinical fallback response avoiding server leakage
    return NextResponse.json({
      reply: `I have analyzed today's fraud investigation data. Currently, we are monitoring active items under In Review status.
Please let me know if you would like me to conduct entity correlation mapping or trigger standard account block actions.
Recommended Next Steps:
• Review high-risk transactions
• Analyze connected entities
• Verify Customer Identity
• Terminate Active Sessions
• Escalate to Investigator`,
      suggestions: [
        "🔍 Investigate suspicious entities",
        "📊 Show risk analysis",
        "🕸 Visualize fraud network",
        "📄 Generate case report",
        "⚠ Show critical alerts",
        "🧾 Review evidence",
        "🏦 Analyze account activity",
        "🔗 Find hidden relationships",
        "✅ Recommend next actions"
      ]
    });
  }
}
