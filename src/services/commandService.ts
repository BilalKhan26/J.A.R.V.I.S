import { MusicLibrary, NewsArticle } from '../types';

export class CommandService {
  private musicLibrary: MusicLibrary = {
    stealth: "https://www.youtube.com/watch?v=U47Tr9BB_wE",
    march: "https://www.youtube.com/watch?v=Xqeq4b5u_Xw",
    skyfall: "https://www.youtube.com/watch?v=DeumyOzKqgI",
    wolf: "https://www.youtube.com/watch?v=ThCH0U6aJpU",
    "bad guy": "https://www.youtube.com/watch?v=DyDfgMOUjCI",
    "bohemian rhapsody": "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    "imagine": "https://www.youtube.com/watch?v=YkgkThdzX-8",
    "shape of you": "https://www.youtube.com/watch?v=JGwWNGJdvx8"
  };

  async processCommand(command: string): Promise<string> {
    const cmd = command.toLowerCase().trim();

    try {
      if (cmd.includes('open google')) {
        window.open('https://google.com', '_blank');
        return 'Opening Google for you.';
      }
      
      if (cmd.includes('open facebook')) {
        window.open('https://facebook.com', '_blank');
        return 'Opening Facebook for you.';
      }
      
      if (cmd.includes('open youtube')) {
        window.open('https://youtube.com', '_blank');
        return 'Opening YouTube for you.';
      }
      
      if (cmd.includes('open linkedin')) {
        window.open('https://linkedin.com', '_blank');
        return 'Opening LinkedIn for you.';
      }
      
      if (cmd.includes('open spotify')) {
        window.open('https://open.spotify.com/', '_blank');
        return 'Opening Spotify for you.';
      }

      if (cmd.startsWith('play ')) {
        const songName = cmd.substring(5).trim();
        return this.playMusic(songName);
      }

      if (cmd.includes('news')) {
        return await this.getNews();
      }

      if (cmd.includes('time')) {
        const now = new Date();
        return `The current time is ${now.toLocaleTimeString()}.`;
      }

      if (cmd.includes('date')) {
        const now = new Date();
        return `Today is ${now.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}.`;
      }

      if (cmd.includes('weather')) {
        return 'I would need your location and a weather API to provide weather information. For now, you can check your local weather app.';
      }

      if (cmd.includes('hello') || cmd.includes('hi')) {
        return 'Hello! How can I assist you today?';
      }

      if (cmd.includes('help')) {
        return 'I can help you open websites, play music, get news, tell time, and much more. Just speak naturally!';
      }

      // Default response for unrecognized commands
      return `I heard "${command}" but I'm not sure how to help with that. Try asking me to open a website, play music, or get news.`;

    } catch (error) {
      console.error('Error processing command:', error);
      return 'Sorry, I encountered an error processing your request.';
    }
  }

  private playMusic(songName: string): string {
    const song = Object.keys(this.musicLibrary).find(key => 
      key.toLowerCase().includes(songName.toLowerCase()) ||
      songName.toLowerCase().includes(key.toLowerCase())
    );

    if (song) {
      window.open(this.musicLibrary[song], '_blank');
      return `Playing ${song} for you.`;
    } else {
      return `Sorry, I couldn't find "${songName}" in my music library. Try songs like stealth, march, skyfall, or wolf.`;
    }
  }

  private async getNews(): Promise<string> {
    try {
      // Using a mock news response since we can't expose API keys in frontend
      const mockNews = [
        "Breaking: Scientists discover new quantum computing breakthrough",
        "Tech industry sees major growth in AI development",
        "Climate change initiatives gain global support",
        "Space exploration reaches new milestones"
      ];

      const randomNews = mockNews[Math.floor(Math.random() * mockNews.length)];
      return `Here's the latest news: ${randomNews}`;
    } catch (error) {
      return 'Sorry, I cannot fetch news at the moment. Please try again later.';
    }
  }

  getMusicLibrary(): MusicLibrary {
    return { ...this.musicLibrary };
  }
}