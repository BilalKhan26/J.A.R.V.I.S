import OpenAI from 'openai';

export class OpenAIService {
  private client: OpenAI | null = null;
  private isConfigured: boolean = false;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (apiKey && apiKey !== 'your_openai_api_key_here') {
      this.client = new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.deepseek.com',
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
      this.isConfigured = true;
    }
  }

  isAvailable(): boolean {
    return this.isConfigured;
  }

  async processWithAI(command: string): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI client not configured');
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system", 
            content: "You are JARVIS, a virtual assistant skilled in general tasks like Alexa and Google Assistant. Give short, helpful responses. Be friendly but concise. Keep responses under 50 words when possible."
          },
          {
            role: "user", 
            content: command
          }
        ],
        max_tokens: 100,
        temperature: 0.7
      });

      return completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Sorry, I encountered an error processing your request with DeepSeek AI.');
    }
  }
}