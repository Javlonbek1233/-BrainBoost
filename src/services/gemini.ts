import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const geminiService = {
  generateQuiz: async (topic: string, subject: string, difficulty: 'easy' | 'medium' | 'hard') => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a quiz about "${topic}" in the subject "${subject}" with "${difficulty}" difficulty. Return 5 questions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctOptionIndex: { type: Type.NUMBER },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctOptionIndex", "explanation"]
              }
            }
          },
          required: ["title", "questions"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error("Failed to parse quiz JSON", e);
      return null;
    }
  },

  generateStudyPlan: async (topics: string[], goals: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a personalized study plan for the following topics: ${topics.join(', ')}. Goals: ${goals}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ["high", "medium", "low"] },
                  estimatedMinutes: { type: Type.NUMBER }
                },
                required: ["title", "description", "priority", "estimatedMinutes"]
              }
            }
          },
          required: ["tasks"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error("Failed to parse study plan JSON", e);
      return null;
    }
  },

  chat: async (message: string, context: string) => {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are BrainBoost AI, a smart study assistant. Help the student with their learning goals. Context: ${context}`,
      },
    });
    const response = await chat.sendMessage({ message });
    return response.text;
  }
};
