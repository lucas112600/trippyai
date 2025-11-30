import { GoogleGenAI } from "@google/genai";
import { UserPreferences, ItineraryResult, InputMode, Language } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateItinerary = async (prefs: UserPreferences): Promise<ItineraryResult> => {
  const { 
    inputMode, 
    destination, 
    days, 
    pace, 
    budget, 
    interests, 
    freeTextPrompt, 
    language, 
    isQuickMode 
  } = prefs;

  let prompt = "";
  
  // Base instructions for the AI role
  const baseInstruction = `
    You are an expert travel planner named "TrippyAI".
    Please generate a travel itinerary based on the user's request using Google Maps for accuracy.
    
    Language Requirement: **Always Output in ${language}**.
    Formatting: Use Markdown. Use H2 (##) for Day titles. Bold (**text**) for place names.
  `;

  // Specific Logic for Modes
  if (inputMode === InputMode.WIZARD) {
    const interestString = interests && interests.length > 0 ? interests.join(", ") : "Local Highlights";
    prompt = `
      ${baseInstruction}
      
      User Preferences:
      - Destination: ${destination}
      - Duration: ${days} Days
      - Pace: ${pace}
      - Budget: ${budget}
      - Interests: ${interestString}
    `;
  } else {
    prompt = `
      ${baseInstruction}
      
      User's Custom Request:
      "${freeTextPrompt}"
      
      Please analyze the user's request to determine destination and duration if not explicitly stated, but default to a 3-day trip if unclear.
    `;
  }

  // Quick Mode vs Detailed Mode instructions
  if (isQuickMode) {
    prompt += `
      \n[Quick Mode Active]
      - Provide a concise summary itinerary.
      - Use bullet points.
      - Include estimated Rating (e.g. ⭐ 4.5) for top spots.
    `;
  } else {
    prompt += `
      \n[Detailed Mode Active]
      - Provide a detailed daily itinerary (Day 1, Day 2...).
      - **CRITICAL**: For EVERY location, provide:
        1. **Rating**: Estimate a Google Maps rating (e.g., "⭐ 4.7").
        2. **Price**: Estimate cost (e.g., "💰 $$" or "💰 1000 JPY").
      - **Transport**: Between major locations, clearly state the transport method and time (e.g., "🚗 15 min" or "🚇 Subway: 20 min").
      - Provide a brief but engaging description for each spot.
      - Ensure the itinerary is logically ordered by location.
    `;
  }

  prompt += `
    \nIMPORTANT:
    - You MUST use the Google Maps tool to ground every location mentioned.
    - Mention specific addresses or area names where possible.
    - Style the output professionally.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // Enable Google Maps Grounding
        tools: [{ googleMaps: {} }],
        // Adjust thinking budget slightly for complex tasks if needed, but standard is fine.
        temperature: 0.7,
      },
    });

    const markdown = response.text || "無法生成行程，請稍後再試 (Unable to generate itinerary).";
    
    // Extract grounding chunks (map links)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      markdown,
      groundingChunks: groundingChunks as any[],
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("規劃行程時發生錯誤，請檢查您的網路或 API Key 設定。");
  }
};