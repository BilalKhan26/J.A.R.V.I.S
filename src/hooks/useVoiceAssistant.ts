import { useState, useCallback, useEffect } from 'react';
import { VoiceAssistantState, Command } from '../types';
import { SpeechService } from '../services/speechService';
import { CommandService } from '../services/commandService';

export const useVoiceAssistant = () => {
  const [state, setState] = useState<VoiceAssistantState>({
    isListening: false,
    isProcessing: false,
    isSpeaking: false,
    isActive: true,
    currentCommand: '',
    commandHistory: []
  });

  const [speechService] = useState(() => new SpeechService());
  const [commandService] = useState(() => new CommandService());

  const addCommand = useCallback((text: string, type: 'user' | 'assistant', response?: string) => {
    const command: Command = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      type,
      response
    };

    setState(prev => ({
      ...prev,
      commandHistory: [...prev.commandHistory, command]
    }));
  }, []);

  const startListening = useCallback(async () => {
    if (!speechService.isRecognitionSupported()) {
      addCommand('Speech recognition not supported in this browser', 'assistant');
      return;
    }

    setState(prev => ({ ...prev, isListening: true, currentCommand: '' }));

    try {
      const result = await speechService.startListening();
      setState(prev => ({ ...prev, isListening: false, currentCommand: result }));
      
      addCommand(result, 'user');
      
      // Check for wake word or process command
      if (result.toLowerCase().includes('jarvis') || state.isActive) {
        await processCommand(result);
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
      setState(prev => ({ ...prev, isListening: false }));
      addCommand('Sorry, I could not understand you. Please try again.', 'assistant');
    }
  }, [speechService, state.isActive, addCommand]);

  const stopListening = useCallback(() => {
    speechService.stopListening();
    setState(prev => ({ ...prev, isListening: false }));
  }, [speechService]);

  const processCommand = useCallback(async (command: string) => {
    setState(prev => ({ ...prev, isProcessing: true }));

    try {
      const response = await commandService.processCommand(command);
      addCommand(response, 'assistant');
      
      // Speak the response
      setState(prev => ({ ...prev, isSpeaking: true, isProcessing: false }));
      await speechService.speak(response);
      setState(prev => ({ ...prev, isSpeaking: false }));
      
    } catch (error) {
      console.error('Command processing error:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      addCommand('Sorry, I encountered an error processing your request.', 'assistant');
    }
  }, [commandService, speechService, addCommand]);

  const toggleListening = useCallback(() => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [state.isListening, startListening, stopListening]);

  // Initialize with welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      addCommand('Hello! I am Jarvis, your voice assistant. Say "Jarvis" to wake me up or click the microphone to start.', 'assistant');
    }, 1000);

    return () => clearTimeout(timer);
  }, [addCommand]);

  return {
    state,
    startListening,
    stopListening,
    toggleListening,
    processCommand,
    speechService,
    commandService
  };
};