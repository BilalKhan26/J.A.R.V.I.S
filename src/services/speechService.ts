export class SpeechService {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private isSupported: boolean;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    
    if (this.isSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
  }

  isRecognitionSupported(): boolean {
    return this.isSupported;
  }

  startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        resolve(result);
      };

      this.recognition.onerror = (event) => {
        reject(new Error(event.error));
      };

      this.recognition.onend = () => {
        // Recognition ended naturally
      };

      try {
        this.recognition.start();
      } catch (error) {
        reject(error);
      }
    });
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (!text.trim()) {
        resolve();
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synthesis.speak(utterance);
    });
  }

  stopSpeaking() {
    this.synthesis.cancel();
  }
}