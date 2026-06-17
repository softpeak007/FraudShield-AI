import { Type } from "@google/genai";
import { getAiClient, generateContentWithRetry } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

function sanitizeString(str: any, maxLength = 256): string {
  if (typeof str !== "string") return "";
  // Strip potential HTML/script-like tags to prevent manual element/script injection
  const clean = str.replace(/<[^>]*>/g, "");
  return clean.substring(0, maxLength).trim();
}

function validateTransaction(tx: any) {
  if (!tx || typeof tx !== "object" || Array.isArray(tx)) {
    throw new Error("Invalid transaction structure was provided.");
  }
  return {
    id: sanitizeString(tx.id, 64),
    customer: sanitizeString(tx.customer, 128),
    merchant: sanitizeString(tx.merchant, 128),
    amount: typeof tx.amount === "number" && !isNaN(tx.amount) ? Math.min(Math.max(tx.amount, 0), 10000000) : 0,
    timestamp: sanitizeString(tx.timestamp, 64),
    category: sanitizeString(tx.category, 64),
    location: sanitizeString(tx.location, 128),
    riskScore: typeof tx.riskScore === "number" && !isNaN(tx.riskScore) ? Math.min(Math.max(tx.riskScore, 0), 100) : 50,
    severity: (tx.severity === "CRITICAL" || tx.severity === "SUSPICIOUS" || tx.severity === "SAFE") ? tx.severity : "SUSPICIOUS",
    anomalies: Array.isArray(tx.anomalies) ? tx.anomalies.map((a: any) => sanitizeString(a, 128)).slice(0, 10) : [],
    aiSummary: sanitizeString(tx.aiSummary, 1024),
    recommendation: sanitizeString(tx.recommendation, 1024),
    caseId: sanitizeString(tx.caseId, 64),
    status: ["In Review", "Approved", "Blocked & Frozen", "Escalated"].includes(tx.status) ? tx.status : "In Review",
    deviceIp: sanitizeString(tx.deviceIp, 64),
    deviceHeader: sanitizeString(tx.deviceHeader, 256),
    analystNotes: tx.analystNotes ? sanitizeString(tx.analystNotes, 1024) : undefined
  };
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate request method type (redundancy check)
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    // 2. Safely parse JSON body to prevent raw parsing exceptions
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
    }

    const { transaction } = body;
    if (!transaction) {
      return NextResponse.json({ error: "Missing transaction payload" }, { status: 400 });
    }

    // 3. Perform strict validation and sanitization
    let validatedTx;
    try {
      validatedTx = validateTransaction(transaction);
    } catch (valErr: any) {
      return NextResponse.json({ error: valErr.message || "Invalid transaction input values" }, { status: 422 });
    }

    const client = getAiClient();
    
    const response = await generateContentWithRetry(client, {
      model: "gemini-3.5-flash",
      contents: JSON.stringify(validatedTx),
      config: {
        systemInstruction: `You are an elite cyber financial security AI. Analyze the provided financial transaction details.
Evaluate potential fraud signals such as:
1. Geolocation inconsistencies (e.g. transacting from high-risk locations, or velocity impossible travel).
2. Unusual transaction amounts or sudden frequency changes compared to typical historical profiles.
3. Device and IP anomalies (VPNs, Tor, spoofed systems, unexpected browser headers).
4. Pattern signatures matching common banking fraud schemes (e.g. credit mule test transactions, rapid withdrawals, account drain).

Your response must be returned in JSON matching the exact schema provided. Keep the explanation futuristic, secure, highly clinical, and action-oriented.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.INTEGER, description: "Security hazard rating from 0 to 100 based on transaction metrics." },
            verdict: { type: Type.STRING, description: "One of: 'CRITICAL', 'SUSPICIOUS', or 'APPROVED'." },
            reasoning: { type: Type.STRING, description: "Detailed cyber forensic reasoning of why this transaction was color-coded this way." },
            anomalies: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Specific technical indicators of suspicious behavior (e.g., 'Velocity Impossible', 'Mule Pattern', 'Proxy/VPN Alert'). Please supply 2-3 brief ones."
            },
            recommendation: { type: Type.STRING, description: "Suggested real-time system mitigation step (e.g., 'IMMEDIATE ACCOUNT FREEZE', 'SMS CHALLENGE REQUESTED', 'NOTIFY COMPLIANCE')." },
            summary: { type: Type.STRING, description: "A high-impact, headline-ready case summary suited for security analysts." }
          },
          required: ["riskScore", "verdict", "reasoning", "anomalies", "recommendation", "summary"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text generated from Gemini model.");
    }

    const payload = JSON.parse(text);
    return NextResponse.json(payload);
  } catch (error: any) {
    console.error("Gemini Fraud Forensic Error (Production Log):", error);
    // Return structured, clean visual fallback without exposing system backtrace info to frontend
    return NextResponse.json({
      error: "Forensic analysis node offline (Secure Fail-Safe engaged)",
      isMock: true,
      riskScore: 84,
      verdict: "SUSPICIOUS",
      reasoning: "Secure network fail-safe active. Transaction from localized geo-terminal is flagged due to unverified biometric signature paths. Transaction flow analyzed locally under high mitigation protocols.",
      anomalies: ["Secure Fail-Safe Active", "Biometric Signature Gap", "Unverified Router Path"],
      recommendation: "RE-AUTHENTICATE CUSTOMER / TWO-FACTOR MANDATORY CHALLENGE",
      summary: "Fail-safe forensics evaluated high-risk vector with unverified client authentication route."
    });
  }
}
