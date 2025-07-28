import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceVisualizerProps {
  isListening: boolean;
  isProcessing: boolean;
  onToggleListening: () => void;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  isListening,
  isProcessing,
  onToggleListening
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={onToggleListening}
        disabled={isProcessing}
        className={`
          relative w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-300 transform hover:scale-105 focus:outline-none
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50' 
            : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          shadow-lg hover:shadow-xl
        `}
      >
        {isListening && (
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
        )}
        <div className="relative z-10">
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </div>
      </button>

      <div className="text-center">
        <p className="text-lg font-semibold text-white mb-1">
          {isProcessing 
            ? 'Processing...' 
            : isListening 
              ? 'Listening...' 
              : 'Click to speak'
          }
        </p>
        <p className="text-sm text-gray-300">
          {isListening 
            ? 'Say something or click to stop'
            : 'Wake word: "Jarvis" or click the microphone'
          }
        </p>
      </div>

      {(isListening || isProcessing) && (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-8 bg-blue-400 rounded-full animate-pulse`}
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};