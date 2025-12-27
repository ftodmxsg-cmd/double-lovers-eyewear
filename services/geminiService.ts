
import { GoogleGenAI, Type } from "@google/genai";
import { StylistRecommendation } from "../types";

export const getStylistAdvice = async (imageBase64: string): Promise<StylistRecommendation | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: "image/jpeg"
            }
          },
          {
            text: "You are a professional eyewear stylist. Analyze this user's face shape and style. Provide a fashion-forward recommendation for eyewear. Return ONLY a JSON object."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reasoning: {
              type: Type.STRING,
              description: "A short, stylish explanation of why these frames work for the user."
            },
            suggestedShapes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of frame shapes (e.g., Cat-eye, Rectangular, Aviator)."
            },
            suggestedColors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Suggested frame or lens colors."
            }
          },
          required: ["reasoning", "suggestedShapes", "suggestedColors"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as StylistRecommendation;
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return null;
  }
};
