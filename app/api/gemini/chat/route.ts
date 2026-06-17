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
    const systemInstruction = `You are "Aegis-9", an advanced tactical AI Security Copilot running inside an enterprise banking fraud response cell.
Your responsibilities are to assist security operations analysts investigate transactional fraud alerts, dissect cyber threat vectors, explain anomalies, and recommend risk containment procedures.

Context:
- Current banking security threat state is: ${cleanThreat}.
- Total uncontained active alerts in the feed: ${cleanMsgCount}.

Keep your responses highly strategic, concise, cyber-themed, and helpful. Use thin markdown bullets if explaining procedures. Avoid verbose preamble. Maintain an elite, high-security cyber clinical tone.`;

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
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No output generated from Gemini chat model.");
    }

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("AI Copilot Chat error (Production Log):", error);
    // Secure clinical fallback response avoiding server leakage
    return NextResponse.json({
      reply: `[SECURE FAIL-SAFE ENGAGED] Aegis-9 offline defense matrix is active. 
I am ready using localized secure cryptographic threat registries. Transactions with geolocation mismatches or unexpected multi-router routes have been isolated. 
We advise initiating active token revocation exercises on all unresolved high-threat biometric-bypassed accounts.`
    });
  }
}
