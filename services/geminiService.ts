
import { GoogleGenAI, GenerateContentResponse, Chat, Type } from "@google/genai";

export class GeminiService {
  private static ai: GoogleGenAI | null = null;

  private static getClient(): GoogleGenAI {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    }
    return this.ai;
  }

  static async chat(message: string, systemInstruction?: string) {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: systemInstruction || "You are Lumina, a helpful AI assistant built by a world-class engineer.",
        temperature: 0.7,
      },
    });
    return response.text;
  }

  static async *chatStream(message: string, history: any[] = []) {
    const ai = this.getClient();
    const chat: Chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are Lumina, a helpful AI assistant. Keep responses professional, clear, and informative.",
      }
    });

    const streamResponse = await chat.sendMessageStream({ message });
    for await (const chunk of streamResponse) {
      yield (chunk as GenerateContentResponse).text;
    }
  }

  static async generateImage(prompt: string, quality: 'standard' | 'high' = 'standard') {
    const ai = this.getClient();
    const model = quality === 'high' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: quality === 'high' ? "1K" : undefined
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error('No image returned from model');
  }

  static async generateVideo(prompt: string, ratio: '16:9' | '9:16' = '16:9') {
    const ai = this.getClient();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: ratio
      }
    });

    return operation;
  }

  static async checkVideoOperation(operationId: any) {
    const ai = this.getClient();
    return await ai.operations.getVideosOperation({ operation: operationId });
  }

  static async fetchVideoBlob(uri: string) {
    const response = await fetch(`${uri}&key=${process.env.API_KEY}`);
    return await response.blob();
  }
}
