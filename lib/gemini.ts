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

export async function generateContentWithRetry(
  client: GoogleGenAI,
  options: {
    model: string;
    contents: any;
    config?: any;
  }
) {
  const modelsToTry = [options.model, "gemini-3.1-flash-lite"];
  const maxRetries = 2; // 2 retries per model

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
        console.warn(`Attempt ${attempt + 1} for model ${model} failed:`, error.message || error);
        
        // Treat as transient if we get standard error codes or network drops
        const errorStr = String(error.message || error).toUpperCase();
        const isTransient = errorStr.includes("503") || 
                            errorStr.includes("429") || 
                            errorStr.includes("UNAVAILABLE") ||
                            error.status === 503 || 
                            error.status === 429;
                            
        if (!isTransient && attempt === 0) {
          // If it's a structural or schema validation/config error, do not retry this model
          break; 
        }
      }
    }
  }

  throw lastError || new Error("Failed to generate content after retries.");
}
