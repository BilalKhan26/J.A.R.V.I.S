export interface Command {
  id: string;
  text: string;
  timestamp: Date;
  response?: string;
  type: 'user' | 'assistant';
}

export interface MusicLibrary {
  [key: string]: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface VoiceAssistantState {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  isActive: boolean;
  currentCommand: string;
  commandHistory: Command[];
}