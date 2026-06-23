import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export function isApiErrorTransient(error: any): boolean {
  if (!error) return false;
  
  const code = error.status || error.code || error.error?.code || error.status_code;
  const statusStr = String(error.status || error.error?.status || "").toUpperCase();
  
  if (code === 503 || code === 429 || code === 408 || code === "503" || code === "429") {
    return true;
  }
  
  if (statusStr.includes("UNAVAILABLE") || statusStr.includes("RESOURCE_EXHAUSTED") || statusStr.includes("TOO_MANY_REQUESTS") || statusStr.includes("TIMEOUT")) {
    return true;
  }
  
  const messageParts = [
    typeof error.message === 'string' ? error.message : '',
    typeof error.toString === 'function' ? error.toString() : '',
    JSON.stringify(error)
  ];
  
  const combinedStr = messageParts.join(" ").toUpperCase();
  
  return combinedStr.includes("503") ||
         combinedStr.includes("429") ||
         combinedStr.includes("UNAVAILABLE") ||
         combinedStr.includes("RESOURCE_EXHAUSTED") ||
         combinedStr.includes("HIGH DEMAND") ||
         combinedStr.includes("TEMPORARY") ||
         combinedStr.includes("SPIKES IN DEMAND") ||
         combinedStr.includes("OVERLOAD") ||
         combinedStr.includes("TIMEOUT") ||
         combinedStr.includes("DEADLINE_EXCEEDED");
}

export function isOverloadedOrUnavailable(error: any): boolean {
  if (!error) return false;
  
  const code = error.status || error.code || error.error?.code || error.status_code;
  const statusStr = String(error.status || error.error?.status || "").toUpperCase();
  
  if (code === 503 || code === "503" || code === 429 || code === "429") {
    return true;
  }
  
  if (statusStr.includes("UNAVAILABLE") || statusStr.includes("OVERLOAD") || statusStr.includes("RESOURCE_EXHAUSTED") || statusStr.includes("TOO_MANY_REQUESTS")) {
    return true;
  }
  
  const messageParts = [
    typeof error.message === 'string' ? error.message : '',
    typeof error.toString === 'function' ? error.toString() : '',
    JSON.stringify(error)
  ];
  
  const combinedStr = messageParts.join(" ").toUpperCase();
  
  return combinedStr.includes("503") ||
         combinedStr.includes("429") ||
         combinedStr.includes("UNAVAILABLE") ||
         combinedStr.includes("RESOURCE_EXHAUSTED") ||
         combinedStr.includes("HIGH DEMAND") ||
         combinedStr.includes("SPIKES IN DEMAND") ||
         combinedStr.includes("QUOTA EXCEEDED") ||
         combinedStr.includes("RATE_LIMIT") ||
         combinedStr.includes("TOO MANY REQUESTS") ||
         combinedStr.includes("OVERLOAD");
}

export async function generateContentWithRetry(
  client: GoogleGenAI,
  options: {
    model: string;
    contents: any;
    config?: any;
  }
) {
  const modelsToTry = Array.from(new Set([
    options.model, 
    "gemini-3.1-flash-lite", 
    "gemini-flash-latest"
  ]));
  const maxRetries = 2; // Maximum retries for temporary transient errors like 408/429

  let lastError: any = null;

  for (const model of modelsToTry) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          // Exponential backoff: 500ms * 2^attempt
          const delay = 500 * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        
        console.log(`Calling model ${model}, attempt ${attempt + 1}...`);
        const response = await client.models.generateContent({
          ...options,
          model,
        });
        return response;
      } catch (error: any) {
        lastError = error;
        
        const isOverloaded = isOverloadedOrUnavailable(error);
        if (isOverloaded) {
          console.warn(`Model ${model} is currently overloaded or unavailable. Instantly falling back to next available model...`);
          break; // Break the retry loop for this model; instantly try the next model!
        }

        console.warn(`Attempt ${attempt + 1} for model ${model} failed:`, error.message || error);
        
        const isTransient = isApiErrorTransient(error);
        if (!isTransient && attempt === 0) {
          // If it's a structural/config error, do not retry this model
          break; 
        }
      }
    }
  }

  throw lastError || new Error("Failed to generate content after retries.");
}
